package com.breville.aem.brands.core.models;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.acs.commons.genericlists.GenericList;
import com.adobe.acs.commons.genericlists.GenericList.Item;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.pojo.CategoryTile;
import com.breville.aem.brands.core.pojo.CountryDropDown;
import com.breville.aem.brands.core.pojo.Language;
import com.breville.aem.brands.core.services.BrevilleMultiRegionConfigurationsFactory;
import com.breville.aem.brands.core.services.SessionAccessor;
import com.breville.aem.brands.core.utils.JsonUtil;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

/**
 * This BrevilleHeader component
 *
 * @author PradeepMC
 *
 */
@Getter
@ToString
@Slf4j
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = {
		BrevilleHeader.class }, defaultInjectionStrategy = OPTIONAL, resourceType = ProductsList.RESOURCE_TYPE)
public class BrevilleHeader extends BaseModel {
	private static final String LENGTH = "length";

	private static final String DISTINCT = "distinct";

	private static final String TYPE_HERE = "Type here";

	private static final String ALGOLIA_CONFIG = "algoliaConfig";

	private static final String SEARCH_PLACEHOLDER = "searchPlaceholder";

	private static final String CHAR_START = "charStart";

	protected static final String RESOURCE_TYPE = "breville-brands/components/header";
	
	@Inject
	private Resource resource;
	/**
	 * Products Category Tiles Experience fragment path
	 */
	@Inject
	private String productsNavExpLink;

	@Inject
	private String partsAndAccessoriesNavExpLink;

	@Inject
	private BrevilleMultiRegionConfigurationsFactory multiconfigObject;

	@Getter
	private String isRegion;

	private String locale = "en-US";

	@Getter
	private String currentCountryCode = "us";

	@Getter
	private String currentLanguageCode = "en";
	
	@ValueMapValue
	private String charStart;
	
	@ValueMapValue
	private String searchPlaceholder;
	
	@ValueMapValue
	private String distinct;
	
	@ValueMapValue
	private String length;
	
	String searchSuggetionJson;

	/** The countries language list. */
	@Getter
	private final List<CountryDropDown> countriesLanguageList = new ArrayList<>();

	/** The region language list. */
	@Getter
	private final List<CountryDropDown> regionLanguageList = new ArrayList<>();

	/** The region language json. */
	@Getter
	private String regionLanguageJson;
	
	/** The page manager. */
	private PageManager pageManager;

	/** The session accessor. */
	@Inject
	private SessionAccessor sessionAccessor;
	
	
	/**
	 * Holds category tiles information retrieved from XF
	 */
	List<CategoryTile> categoryTiles = new ArrayList<CategoryTile>();
	List<CategoryTile> partsAndAccessoriesTiles = new ArrayList<CategoryTile>();

	@PostConstruct
	protected void setup() {
		try {
			log.debug("Header Experience fragment path :: {}", productsNavExpLink);
			resourceResolver = sessionAccessor
					.getServiceResourceResolver(ApplicationConstants.SubService.BREVILLESERVICE);
			if (null != resourceResolver) {
				Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
				if (Objects.nonNull(productsNavExpLink)) {
					categoryTiles = getCategoryTilesList(productsNavExpLink, externalizer);
				}
				if (Objects.nonNull(partsAndAccessoriesNavExpLink)) {
					partsAndAccessoriesTiles = getCategoryTilesList(partsAndAccessoriesNavExpLink, externalizer);
				}

				pageManager = resourceResolver.adaptTo(PageManager.class);
				if (Objects.nonNull(multiconfigObject) && Objects.nonNull(currentPage.getContentResource())) {
					this.locale = multiconfigObject.getSiteSpecificProperty(currentPage.getContentResource(),
							ApplicationConstants.LOCALE_ATTR);
					this.currentCountryCode = getCountryCodeFromLocaleStr(this.locale).toLowerCase();
					this.currentLanguageCode = getLanguageCodeFromLocaleStr(this.locale);
				}
				getRegionAndLanguageList();
			}
			log.debug("categoryTiles :: {}", categoryTiles.size());
		} catch (Exception e) {
			log.error(" Error while setup.{} ", e);
		}
	}
	
	/**
	 * @param experienceFragmentPath
	 * @param externalizer
	 * @return
	 */
	private List<CategoryTile> getCategoryTilesList(String experienceFragmentPath, Externalizer externalizer) {

		Resource experienceFragment = resourceResolver
				.getResource(experienceFragmentPath + ApplicationConstants.JCR_CONTENT_ROOT);

		List<CategoryTile> categoryList = new ArrayList<CategoryTile>();
		Iterable<Resource> reourceList = experienceFragment.getChildren();
		for (Resource resource : reourceList) {
			ValueMap valueMap = resource.getValueMap();
			CategoryTile categoryTile = new CategoryTile();
			categoryTile.setCategoryTileImage(valueMap.get(ApplicationConstants.FILE_REFERENCE, "Tile Image Path"));
			categoryTile.setCategoryName(valueMap.get(ApplicationConstants.JCR_TITLE, "Category Title"));
			// add .html extension if not already there
			String link = valueMap.get(ApplicationConstants.LINK_URL, ApplicationConstants.HASH);
			if (!link.endsWith(ApplicationConstants.HTML_EXTENSION) && link.startsWith("/content")) {
				link = link + ApplicationConstants.HTML_EXTENSION;
			}
			// externalize url if not #
			categoryTile.setCategoryLink(link);
			categoryList.add(categoryTile);
		}
		return categoryList;
	}

	/**
	 * get region and language lists
	 */
	private void getRegionAndLanguageList() {
		try {
			final Resource countryRes = resourceResolver.getResource(
					ApplicationConstants.GENERICLIST_ROOTPATH + ApplicationConstants.COUNTRY_LANGUAGE_CODE);
			if (Objects.nonNull(countryRes)) {
				final Iterator<Resource> resIterator = countryRes.getChildren().iterator();
				populateRegionLanguageList(resIterator, false);
				populateJsonRegionLanguage();
			}
			if (isRegion != null && isRegion.equalsIgnoreCase(ApplicationConstants.TRUE)) {
				final Resource regionRes = resourceResolver.getResource(
						ApplicationConstants.GENERICLIST_ROOTPATH + ApplicationConstants.REGION_LANGUAGE_CODE);
				if (Objects.nonNull(regionRes)) {
					final Iterator<Resource> resIterator = regionRes.getChildren().iterator();
					populateRegionLanguageList(resIterator, true);
				}
			}
		} catch (Exception e) {
			log.error("getRegionAndLanguageList :: {}", e.getMessage());
		}
	}

	/**
	 * @param resIterator
	 * @param isRegion
	 */
	private void populateRegionLanguageList(final Iterator<Resource> resIterator, boolean isRegion) {
		while (Objects.nonNull(resIterator) && resIterator.hasNext()) {
			final CountryDropDown country = new CountryDropDown();
			final Resource itResource = resIterator.next();
			if (itResource.getResourceType().equals(ApplicationConstants.CQ_COLO_PAGE)) {
				final Page sitePage = pageManager.getPage(itResource.getPath());
				final ValueMap map = sitePage.getContentResource().getValueMap();
				country.setLabel(map.get(ApplicationConstants.JCR_TITLE, StringUtils.EMPTY));
				country.setValue(itResource.getName());
				String isoCountryCode = StringUtils.EMPTY;
				isoCountryCode = getISOCountryCode(itResource, isoCountryCode);
				country.setCountryLabel(isoCountryCode);
				log.debug("Country label:", map.get(ApplicationConstants.JCR_TITLE, StringUtils.EMPTY));
				log.debug("Country value:", itResource.getName());
				log.debug("Country ISO Label:", isoCountryCode);
				populateLanguageList(sitePage, country);
				if (isRegion) {
					regionLanguageList.add(country);
				} else {
					countriesLanguageList.add(country);
				}

			} else {
				log.error("Resource of type cq:Page not found", itResource.getResourceType());
			}
		}
	}

	/**
	 * Populate language list.
	 *
	 * @param languagePage the language page
	 * @param country      the country page
	 */
	private void populateLanguageList(final Page languagePage, CountryDropDown country) {
		log.info("Inside populateLanguageList Method");
		final GenericList languageList = languagePage.adaptTo(GenericList.class);
		final List<Language> languages = new ArrayList<>();
		if (Objects.nonNull(languageList)) {
			for (final Item languageListValues : languageList.getItems()) {
				final Language language = new Language();
				log.debug("Value:", languageListValues.getValue());
				log.debug("Title:", languageListValues.getTitle());
				String[] value = null;
				if (languageListValues.getValue().contains(ApplicationConstants.SEMI_COLON)) {
					value = languageListValues.getValue().split(ApplicationConstants.SEMI_COLON);
					language.setUrl(buildLinkPath(value[1], resourceResolver));
					setValues(country, languageListValues, language, value[0], value[1]);
				} else {
					setValues(country, languageListValues, language, languageListValues.getValue(), StringUtils.EMPTY);
				}
				languages.add(language);
			}
		} else {
			log.error("languageList is empty:", languageList);
		}
		country.setLanguage(languages);
	}

	/**
	 * Sets the values.
	 *
	 * @param country            the country
	 * @param languageListValues the language list values
	 * @param language           the language
	 * @param value              the value
	 */
	private void setValues(CountryDropDown country, final Item languageListValues, final Language language,
			String value, String url) {
		if (value.contains(ApplicationConstants.DEFAULT)) {
			final String[] parts = value.split(ApplicationConstants.COLON);
			language.setLabel(languageListValues.getTitle());
			language.setValue(parts[1]);
			country.setDefaultLanguageUrl(url);
			country.setDefaultLanguage(languageListValues.getTitle());
		} else {
			language.setLabel(languageListValues.getTitle());
			language.setValue(value);
		}
	}

	/**
	 * populate json region language
	 */
	private void populateJsonRegionLanguage() {
		if (Objects.nonNull(countriesLanguageList) && !countriesLanguageList.isEmpty()) {
			final ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			try {
				// this will provide json countriesLanguageList in json format
				regionLanguageJson = ow.writeValueAsString(countriesLanguageList);
			} catch (final JsonProcessingException e) {
				log.error(" JsonProcessingException Error while parsing the countriesLanguageList.{} ", e);
				regionLanguageJson = StringUtils.EMPTY;
			}
		} else {
			log.error("countriesLanguageList is null or empty ");
			regionLanguageJson = StringUtils.EMPTY;
		}
	}
	
	/**
	 * @return the Search SuggetionJson
	 */
	public String getSearchSuggetionJson() {
		try {
			Map<String, Object> searchSuggetion = new HashMap<String, Object>();
			searchSuggetion.put(CHAR_START, Objects.isNull(this.charStart) ? 3 : Integer.parseInt(this.charStart));
			searchSuggetion.put(SEARCH_PLACEHOLDER, Objects.isNull(this.searchPlaceholder)?TYPE_HERE:this.searchPlaceholder);
			searchSuggetion.put(ALGOLIA_CONFIG, getAlgoliaConfigJson());
			return JsonUtil.getMapper().writer().writeValueAsString(searchSuggetion);
		} catch (JsonProcessingException e) {
			log.error("Error while gettiing json :: {}", e.getMessage());
		}
		return null;
	}
	
	/**
	 * @return the Algolia Confign
	 */
	private Map<String, Object> getAlgoliaConfigJson() {
		try {
			Map<String, Object> algoliaConfig = new HashMap<String, Object>();
			algoliaConfig.put(DISTINCT, Objects.isNull(this.distinct) ? 1 : Integer.parseInt(this.distinct));
			algoliaConfig.put(LENGTH, Objects.isNull(this.length) ? 10 : Integer.parseInt(this.length));
			return algoliaConfig;
		} catch (Exception e) {
			log.error("Error while gettiing getAlgoliaConfig  :: {}", e.getMessage());
		}
		return null;
	}

}