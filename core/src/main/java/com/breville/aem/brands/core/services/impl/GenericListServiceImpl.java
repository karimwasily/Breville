package com.breville.aem.brands.core.services.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.oak.commons.PropertiesUtil;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.acs.commons.genericlists.GenericList;
import com.adobe.acs.commons.genericlists.GenericList.Item;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.pojo.Country;
import com.breville.aem.brands.core.pojo.State;
import com.breville.aem.brands.core.services.GenericListConfigurationsObject;
import com.breville.aem.brands.core.services.GenericListService;
import com.breville.aem.brands.core.services.SessionAccessor;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * 
 * @author Yogiraj.Mahajan
 *
 */

@Getter
@Setter
@Slf4j
@Component(service = GenericListServiceImpl.class, immediate = true, enabled = true)
@Designate(ocd = GenericListConfigurationsObject.class, factory = false)
public class GenericListServiceImpl implements GenericListService, EventHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(GenericListServiceImpl.class);

	public static final String LIST_BASE_PATH = "breville.list.base.path";

	public static final String COUNTRY_STATE_PATH = "country.state.path";

	public static final String COUNTRY_ISD_PATH = "country.isd.path";

	public static final String PRODUCT_ATTRIBUTE_PATH = "productAttr.filter.path";

	public static final String RECIPE_FILTER_PATH = "recipe.filter.path";

	public static final String COUNTRY_ZIP_CODE_PATH = "country.zipcode.path";

	private String countriesIsdPath;

	@SlingObject
	private Resource resource;

	@Reference
	private ResourceResolverFactory resolverFactory;

	private Map<String, List<Country>> countriesListMap;

	private Map<String, List<Country>> shippingCountriesListMap;

	private List<Country> countriesStateList;

	private List<Country> shippingCountriesStateList;

	@Reference
	private SessionAccessor sessionAccessor;

	private ComponentContext componentContext;

	private String countriesZipCodePath;

	@Activate
	protected final void activate(final ComponentContext context) {
		componentContext = context;
		LOGGER.debug("Generic List Configuration Service activate() method start.");
		countriesListMap = new HashMap<>();
		shippingCountriesListMap = new HashMap<>();
		countriesStateList = new ArrayList<>();
		shippingCountriesStateList = new ArrayList<>();
		writeProps(context);

		LOGGER.debug("Generic List Configuration Service activate() method end.");
	}

	private void writeProps(ComponentContext context) {
		LOGGER.debug("writeProps() method start.");
		countriesStateList = new ArrayList<>();
		shippingCountriesStateList = new ArrayList<>();
		/** get properties */
		final Dictionary<?, ?> properties = context.getProperties();
		/** get countriesIsdPath */
		countriesIsdPath = PropertiesUtil.toString(properties.get(COUNTRY_ISD_PATH), COUNTRY_ISD_PATH);
		countriesZipCodePath = PropertiesUtil.toString(properties.get(COUNTRY_ZIP_CODE_PATH), COUNTRY_ZIP_CODE_PATH);
		final String basePath = PropertiesUtil.toString(properties.get(LIST_BASE_PATH), LIST_BASE_PATH);
		final String countryStatePath = PropertiesUtil.toString(properties.get(COUNTRY_STATE_PATH), COUNTRY_STATE_PATH);
		final String sitesPath = basePath.concat(ApplicationConstants.SITES_AND_COUNTRIES);
		final String shippingSitesPath = basePath.concat(ApplicationConstants.SHIPPING_COUNTRIES_LIST);

		ResourceResolver resourceResolver = null;
		try {
			resourceResolver = sessionAccessor
					.getServiceResourceResolver(ApplicationConstants.SubService.BREVILLESERVICE);
			if (null != resourceResolver) {
				final Resource sitesRes = resourceResolver.getResource(sitesPath);
				final Resource sitesShippingRes = resourceResolver.getResource(shippingSitesPath);
				final PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
				if (Objects.nonNull(sitesRes) && Objects.nonNull(pageManager)) {
					final Iterator<Resource> resIterator = sitesRes.getChildren().iterator();
					while (resIterator.hasNext()) {
						final Resource itResource = resIterator.next();
						populateCountries(countryStatePath, pageManager, itResource, false);
					}
				} else {
					LOGGER.error("Either sitesRes or PageManager is null.");
				}

				/** null check for resource and pageManager */
				if (Objects.nonNull(sitesShippingRes) && Objects.nonNull(pageManager)) {
					final Iterator<Resource> resIterator = sitesShippingRes.getChildren().iterator();
					while (resIterator.hasNext()) {
						final Resource itResource = resIterator.next();
						populateCountries(countryStatePath, pageManager, itResource, true);
					}
				} else {
					LOGGER.error("Either sitesShippingRes or PageManager is null.");
				}
			}
		} catch (final LoginException e) {

			LOGGER.error("Inside writeProps():resolver not found", e);
		} finally {

			if (resourceResolver != null && resourceResolver.isLive()) {
				resourceResolver.close();
				LOGGER.debug("writeProps() method End.");
			}
		}

	}

	private void populateCountries(String countryStatePath, PageManager pageManager, Resource itResource,
			boolean isShippingCountries) {
		/** check whether the resource is cq:Page type */
		if (itResource.getResourceType().equals(ApplicationConstants.CQ_COLO_PAGE)) {
			final String countryCode = itResource.getName();
			final List<Country> countriesList = new ArrayList<>();
			final Page sitePage = pageManager.getPage(itResource.getPath());
			final GenericList genericCountryList = sitePage.adaptTo(GenericList.class);
			populateCountryList(countryStatePath, pageManager, countriesList, genericCountryList, countryCode,
					isShippingCountries);
			LOGGER.info("Country code and country list size. CountryCode = {}, CountryListSize= {}", countryCode,
					countriesList.size());
			if (isShippingCountries) {
				/** populate shippingCountriesListMap */
				shippingCountriesListMap.put(countryCode, countriesList);
			} else {
				/** populate countriesListMap */
				countriesListMap.put(countryCode, countriesList);
			}
		}
	}

	private void populateCountryList(String path, PageManager pageMgr, List<Country> countriesList,
			GenericList countryList, String shippingCountryCode, boolean isShippingCountries) {
		/** null check for countryList */
		if (Objects.nonNull(countryList)) {
			for (final Item itemCountry : countryList.getItems()) {
				final Country country = new Country();
				country.setDisplayName(itemCountry.getTitle());
				country.setCode(itemCountry.getValue());
				country.setShippingCountryCode(shippingCountryCode);
				final Locale locale = new Locale(StringUtils.EMPTY, itemCountry.getValue().toUpperCase(Locale.ENGLISH));
				String isoCountryCode = locale.getISO3Country();

				if ("GBR".equals(isoCountryCode)) {
					isoCountryCode = "UK";
				}

				country.setCountryCode(isoCountryCode);
				setCountryZipCode(itemCountry.getValue(), country, pageMgr);
				setCountryStdCode(itemCountry.getValue(), country, pageMgr);
				final Page statePage = pageMgr.getPage(path + itemCountry.getValue());
				/** null check for statePage */
				if (Objects.nonNull(statePage)) {
					final GenericList genericStateList = statePage.adaptTo(GenericList.class);
					populateStateList(country, genericStateList);
				} else {
					LOGGER.error("State list not found for country = {}", itemCountry.getValue());
				}

				countriesList.add(country);
				if (isShippingCountries) {

					/** add to shippingCountriesStateList */
					shippingCountriesStateList.add(country);
				} else {
					/** add to countriesStateList */
					countriesStateList.add(country);
				}
			}
		} else {
			LOGGER.info("countryList is null for country state path. countryStatePath = {} ", path);
		}
	}

	private void setCountryZipCode(String zipCodeCountryPage, Country country, PageManager pageMgr) {
		final Page statePage = pageMgr.getPage(countriesZipCodePath + zipCodeCountryPage);
		if (Objects.nonNull(statePage)) {
			final GenericList genericZipCode = statePage.adaptTo(GenericList.class);
			if (Objects.nonNull(genericZipCode)) {
				country.setZipCodeRegexPattern(genericZipCode.getItems().get(0).getValue());
			} else {
				LOGGER.error("Zip code page not found for country code = {}", zipCodeCountryPage);
			}
		} else {
			LOGGER.error("Zip code page not found for country code = {}", zipCodeCountryPage);
		}
	}

	private void setCountryStdCode(String stdCountryPage, Country country, PageManager pageManager) {
		final Page statePage = pageManager.getPage(countriesIsdPath + stdCountryPage);
		if (Objects.nonNull(statePage)) {
			final GenericList genericIsd = statePage.adaptTo(GenericList.class);
			if (Objects.nonNull(genericIsd)) {
				country.setIsdCode(genericIsd.getItems().get(0).getValue());
			} else {
				LOGGER.error("ISD list page not found for country code = {}", stdCountryPage);
			}
		} else {
			LOGGER.error("ISD list page not found for country code = {}", stdCountryPage);
		}

	}

	private void populateStateList(final Country countryDTO, final GenericList stateList) {
		final List<State> statesList = new ArrayList<>();
		if (Objects.nonNull(stateList)) {
			for (final Item stateItem : stateList.getItems()) {
				final State state = new State();
				state.setDisplayName(stateItem.getTitle());
				state.setCode(stateItem.getValue());
				statesList.add(state);
			}
		}
		statesList.sort(Comparator.comparing(State::getDisplayName));
		countryDTO.setStates(statesList);
	}

	@Override
	public List<Country> getCountriesAndStateList(String countryCode) {
		LOGGER.info("getCountriesAndStateList() method started");
		List<Country> countryList = new ArrayList<>();
		if (Objects.nonNull(countriesListMap)) {
			countryList = countriesListMap.get(countryCode);
		} else {
			LOGGER.error("Country does not found in country state list for countryCode = {}", countryCode);
		}
		LOGGER.debug("getCountriesAndStateList() method end.");
		return countryList;
	}

	@Override
	public List<Country> getShippingCountriesAndStateList(String countryCode) {
		LOGGER.debug("getShippingCountriesAndStateList() method started");
		List<Country> shippingCountryList = new ArrayList<>();
		if (Objects.nonNull(shippingCountriesListMap)) {
			shippingCountryList = shippingCountriesListMap.get(countryCode);
		} else {
			LOGGER.error("Country does not found in country state list for countryCode = {}", countryCode);
		}
		LOGGER.debug("getShippingCountriesAndStateList() method end.");
		return shippingCountryList;
	}

	@Override
	public List<Country> getCountriesAndStateList() {
		LOGGER.info("getCountriesAndStateList() method started");
		List<Country> countryList = new ArrayList<>();

		if (Objects.nonNull(countriesStateList)) {
			countryList = countriesStateList;
		} else {
			LOGGER.error("countriesListMap found Null ");
		}
		LOGGER.info("getCountriesAndStateList() method end.");
		return countryList;
	}

	@Override
	public List<Country> getShippingCountriesStateList() {
		LOGGER.debug("getShippingCountriesStateList() method started");
		List<Country> shippingCountryList = new ArrayList<>();

		if (Objects.nonNull(shippingCountriesStateList)) {
			shippingCountryList = shippingCountriesStateList;
		} else {
			LOGGER.error("shippingCountriesListMap found Null ");
		}
		LOGGER.debug("getShippingCountriesStateList() method end.");

		return shippingCountryList;
	}

	@Override
	public void handleEvent(Event event) {
		LOGGER.debug("GenericListServiceImpl listened the event start : {} -", event.getTopic());
		writeProps(componentContext);
		LOGGER.debug("GenericListServiceImpl listened the event end : {} -", event.getTopic());
	}

}
