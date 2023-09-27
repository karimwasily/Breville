package com.breville.aem.brands.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.response.CustomGraphQLResponseImpl;
import com.breville.aem.brands.core.response.Images;
import com.breville.aem.brands.core.response.JsonConvertor;
import com.breville.aem.brands.core.response.MasterVariant;
import com.breville.aem.brands.core.response.Prices;
import com.breville.aem.brands.core.response.RawAttributes;
import com.breville.aem.brands.core.response.Results;
import com.breville.aem.brands.core.response.Value;
import com.breville.aem.brands.core.response.Variants;
import com.breville.aem.brands.core.response.WebStatus;
import com.breville.aem.brands.core.services.CommerceToolApiService;
import com.breville.aem.brands.core.services.impl.MultiRegionConfigurationsFactoryImpl;
import com.breville.aem.brands.core.utils.JsonUtil;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;

/**
 * @author Aravind S
 *
 */
@Model(adaptables = SlingHttpServletRequest.class, resourceType = "breville-brands/components/beanz/beanzProducts", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BeanzProduct {

	private static final Logger LOGGER = LoggerFactory.getLogger(BeanzProduct.class);
	@Self
	private SlingHttpServletRequest request;

	@Inject
	private Page currentPage;

	@Inject
	protected Resource resource;
	
	@Inject
	private CommerceToolApiService commerceToolApiService;

	private String jsonResponse;

	@JsonIgnore
	private CustomGraphQLResponseImpl graphqlResponse;

	private List<Results> resultsList;

	private List<RawAttributes> rawAttr;

	private List<Images> productImages;
	
	private String beanzSkuId;
	
	private String productName;

	private String bestWith;
	
	@Getter
	private String flavourCategory;
	
	@Getter
	private String tastingNotes;
	
	@Getter
	private String brewMethod;
	
	@Getter
	private String brewMethodVal;
	
	@Getter
	private String varietal;
	
	@Getter
	private String webStatus;
	
	@Getter
	private String processOption;
	
	@Getter
	private String country;
	
	@Getter
	private String region;
	
	@Getter
	private String elevationFrom;
	
	@Getter
	private String elevationTo;
	
	@Getter
	private String elevation;

	private String roastDays;

	private String roastLevel;

	private String flavourNotes;
	
	private String espresso;

	private String decaf;
	
	@Getter
	private String decafVal = "No";

	private String webType;

	private String roasterNotes;

	private String bagSize;

	private String pdpImagePath;

	private String tileImagePath;

	private String vendorName;
	
	private String subscriptionResponse;
	
	private String webEspresso = "Filter";
	
	private String isDiscoveryBean ="false";
	
	ObjectMapper oMapper = new ObjectMapper();
	
	private String locale;
	
	private String discoveryData;
	
	private String bagSizeConst = "WEB_BAGSIZE";
	
	private String machineType = "WEB_MACHINE_TYPE";
	
	private String grindTypesConst = "WEB_GRIND";
	
	private String pageHierarchy;
	
	private String siteSection;
	
	private String siteSection1;
	
	private String siteSection2;
	
	private String pageName;
	
	private String pageUrl;
	
	private String productSlug;
	
	private String externalizerKey;
	
	private String flavourCategoryStr = "WEB_FLAVOURCATEGORY";
	
	@Getter
	private String plpPagePath;
	
	/** The externalizer. */
	@Inject
	private Externalizer externalizer;
	
	/**
	 * The multiRegionConfig factory object instance.
	 */
	@Inject
	private MultiRegionConfigurationsFactoryImpl multiRegionConfigurationFactory;
	
	private MultiRegionConfigurationsFactoryImpl multiFieldValue;
	
	private String currencySymbol;
	
	private Map<String,Map<String, Object>> discoverySkuData = new HashMap<String, Map<String,Object>>();

	@PostConstruct
	public void initModel() {
		try {
			String[] skuVariableSector = request.getRequestPathInfo().getSelectors();
			locale = multiRegionConfigurationFactory.getLocale();
			if(skuVariableSector.length > 0) {
				String skuVariable = skuVariableSector[0];
				String resp = commerceToolApiService.getProductData(skuVariable, locale,"beanz");
				jsonResponse = resp;
				subscriptionResponse = commerceToolApiService.getProductData(skuVariable, locale,"beanzSubscription");
				if (!resp.isEmpty()) {
					ObjectMapper mapper = new ObjectMapper();
					graphqlResponse = mapper.readValue(resp, CustomGraphQLResponseImpl.class);
					resultsList = graphqlResponse.getData().getProducts().getResults();
					rawAttr = resultsList.get(0).getMasterData().getCurrent().getMasterVariant().getAttributesRaw();
					getProductAttributes();
					getProductImages();
					getVendorNameAttr();
					productName = resultsList.get(0).getMasterData().getCurrent().getName();
					productSlug = resultsList.get(0).getMasterData().getCurrent().getSlug();
					pageHierarchy = "beanz|our-roasters|"+vendorName;
					siteSection = "beans";
					siteSection1 = "our-roasters";
					siteSection2 = vendorName;
					pageName = "Beanz-US:beans:our-roasters:"+vendorName+":"+productName;
					elevation = elevationFrom +"-"+ elevationTo;
					externalizerKey = getLanguageCodeFromLocaleStr(
							multiRegionConfigurationFactory.getExternalizerKey());
					String pagePath = "/en/beans/product/"+productSlug+".html";
					pageUrl = buildExternalizeUrl(request.getResource().getResourceResolver(), pagePath,
							request.getResource());
				}
			}else {
				checkTheDiscoveryBeanzSku();
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
	}
	
	/**
	 * Get the Lanaguage code from Local String value
	 * 
	 * @param locale
	 * @return Language code
	 */
	public String getLanguageCodeFromLocaleStr(final String locale) {
		if (StringUtils.isNotEmpty(locale)) {
			String[] localArr = locale.split("-");
			return localArr.length > 0 ? localArr[0] : StringUtils.EMPTY;
		}
		return StringUtils.EMPTY;
	}
	
	/**
	 * This method build the Externalize URL to transform a resource path into an
	 * external and absolute URL by prefixing the path with a preConfigured DNS.
	 *
	 * @param request  the resolver
	 * @param path     the resource path
	 * @param resource the resource
	 * 
	 * @return string the externalize URL
	 */

	protected String buildExternalizeUrl(ResourceResolver resolver, String path, Resource resource) {
		LOGGER.debug("Inside buildExternalizerUrl(). resolver = {} and path = {} and resource= {}", resolver, path,
				resource);
		String externalLink = null;
		if (Objects.nonNull(this.externalizerKey)) {
			externalLink = externalizer.externalLink(resolver, this.externalizerKey, path);
		} else {
			LOGGER.debug("MultiRegionConfigurationFactory is NULL for resource= {} and path = {} ", resource, path);
		}
		LOGGER.debug("Domain fetched from Externalizer for resource= {} and path = {} is externalLink ={}", resource,
				path, externalLink);
		return externalLink;
	}

	private void checkTheDiscoveryBeanzSku() {
		try {
			String skuVariable = currentPage.getPath();
			skuVariable = skuVariable.substring(skuVariable.lastIndexOf("/")+1,skuVariable.length());
			skuVariable = skuVariable.replace(".html", "");
			LOGGER.info("Discovery Beanz sku process starting sku name - {}",skuVariable);
			isDiscoveryBean = "true";
			String resp = commerceToolApiService.getProductData(skuVariable, locale,"discoveryBeanz");
			subscriptionResponse = commerceToolApiService.getProductData(skuVariable, locale,"beanzSubscription");
			if (!resp.isEmpty()) {
				LOGGER.info("Json response to check {}",resp);
				ObjectMapper mapper = new ObjectMapper();
				graphqlResponse = mapper.readValue(resp, CustomGraphQLResponseImpl.class);
				resultsList = graphqlResponse.getData().getProducts().getResults();
				productSlug = resultsList.get(0).getMasterData().getCurrent().getSlug();
				pageHierarchy = productSlug;
				siteSection = productSlug;
				pageName = "Beanz-US:"+productSlug;
				externalizerKey = getLanguageCodeFromLocaleStr(
						multiRegionConfigurationFactory.getExternalizerKey());
				String pagePath = request.getPathInfo();
				pageUrl = buildExternalizeUrl(request.getResource().getResourceResolver(), pagePath,
						request.getResource());
				getDiscoveryMasterData(resultsList.get(0).getMasterData().getCurrent().getMasterVariant());
				getProductImages();
				List<Variants> variants = resultsList.get(0).getMasterData().getCurrent().getVariants();
				iterateVariantsList(variants);
				discoveryData = JsonConvertor.convertToJson(discoverySkuData);
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
	}

	private void getDiscoveryMasterData(MasterVariant masterVariant) {
		Map<String, Object> discoveryMap = new HashMap<>();
		String key = masterVariant.getKey();
		List<RawAttributes> varRawAttr = masterVariant.getAttributesRaw();
		List<String> listOfPlans = new ArrayList<>();
		for(RawAttributes variableRaw : varRawAttr) {
			String name = variableRaw.getName();
			Object val = variableRaw.getValue();
			if(name.equalsIgnoreCase(machineType)) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				discoveryMap.put(machineType, map.get(locale).toString().replace("\"", ""));
			}else if(name.equalsIgnoreCase(grindTypesConst)) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				discoveryMap.put(grindTypesConst, map.get(locale));
			}else if(name.equalsIgnoreCase(flavourCategoryStr)) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				discoveryMap.put(flavourCategoryStr, map.get(locale));
			}
		}
		getPriceData(discoveryMap , resultsList.get(0).getMasterData().getCurrent().getMasterVariant().getPrices());
		getPlanData(discoveryMap,resultsList.get(0).getMasterData().getCurrent().getMasterVariant().getKey(),resultsList.get(0).getMasterData().getCurrent().getVariants());
		discoverySkuData.put(key,discoveryMap);
	}

	private void getPlanData(Map<String, Object> discoveryMap, String key, List<Variants> list) {
		List<String> listOfPlans = new ArrayList<>();
		listOfPlans.add(key);
		for(Variants listVar : list) {
			List<RawAttributes> varAttr = listVar.getAttributesRaw();
			for(RawAttributes attrVal : varAttr) {
				String name = attrVal.getName();
				Object val = attrVal.getValue();
				if(name.equalsIgnoreCase("parentVariant") && val.toString().equalsIgnoreCase(key)) {
					listOfPlans.add(listVar.getKey());
				}
			}
		}
		discoveryMap.put("PLAN_ID", listOfPlans);
		
	}

	private void getPriceData(Map<String, Object> discoveryMap, List<Prices> productPrice) {
		for (Prices prodPrice : productPrice) {
			Value prodVal = prodPrice.getValue();
			String currencyCode = prodVal.getCurrencyCode();
			if(currencyCode.equalsIgnoreCase("USD")) {
				String centAmt = prodVal.getCentAmount();
				float centPrice = Float.parseFloat(centAmt)/100;
				String priceStr = String.format("%.02f", centPrice);
				discoveryMap.put("price", priceStr);
			}
		}
	}

	private void iterateVariantsList(List<Variants> variants) {
		if(!variants.isEmpty()) {
			List<String> listOfPlans = new ArrayList<>();
			for(Variants var : variants) {
				String key = var.getKey();
				List<RawAttributes> varRawAttr = var.getAttributesRaw();
				for(RawAttributes varRaw : varRawAttr) {
					String name = varRaw.getName();
					Object val = varRaw.getValue();
					if(name.equalsIgnoreCase("subscriptionVariant") && val.toString().equalsIgnoreCase("false")) {
						getDiscoveryData(var);
					}
				}
				LOGGER.info("Key for reference {}", key);
			}
			LOGGER.info("Final list of variants {}",discoverySkuData.toString());
		}else {
			LOGGER.error("There is no varaints for this product");
		}
	}

	private void getDiscoveryData(Variants var) {
		Map<String, Object> discoveryMap = new HashMap<>();
		List<RawAttributes> varRawAttr = var.getAttributesRaw();
		String key = var.getKey();
		for(RawAttributes variableRaw : varRawAttr) {
			String name = variableRaw.getName();
			Object val = variableRaw.getValue();
			if(name.equalsIgnoreCase(machineType)) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				discoveryMap.put(machineType, map.get(locale).toString().replace("\"", ""));
			}else if(name.equalsIgnoreCase(grindTypesConst)) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				discoveryMap.put(grindTypesConst, map.get(locale));
			}else if(name.equalsIgnoreCase(flavourCategoryStr)) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				discoveryMap.put(flavourCategoryStr, map.get(locale));
			}
		}
		getPriceData(discoveryMap, var.getPrices());
		getPlanData(discoveryMap,var.getKey(),resultsList.get(0).getMasterData().getCurrent().getVariants());
		discoverySkuData.put(key,discoveryMap);
	}

	private void getVendorNameAttr() {
		for (RawAttributes at : rawAttr) {
			String name = at.getName();
			Object val = at.getValue();
			if(name.equalsIgnoreCase("vendorName")) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				vendorName = (String) map.get(locale);
				vendorName = vendorName.replace("\"", "");
			}
		}
		
	}

	private void getProductImages() {
		productImages = resultsList.get(0).getMasterData().getCurrent().getMasterVariant().getImages();
		beanzSkuId = resultsList.get(0).getMasterData().getCurrent().getMasterVariant().getSku();
		for (Images path : productImages) {
			if (path.getLabel().toString().equalsIgnoreCase("pdp")) {
				pdpImagePath = path.getUrl().toString();
				if(pdpImagePath.contains("src")) {
					pdpImagePath = pdpImagePath.substring(pdpImagePath.indexOf("src=\"") + 5,
							pdpImagePath.indexOf("\" /><br>"));
				}
			} else if (path.getLabel().toString().equalsIgnoreCase("tile")) {
				tileImagePath = path.getUrl().toString();
				if(tileImagePath.contains("src")) {
					tileImagePath = tileImagePath.substring(tileImagePath.indexOf("src=\"") + 5,
							tileImagePath.indexOf("\" /><br>"));
				}
			}
		}
	}

	private void getProductAttributes() throws JsonMappingException, JsonProcessingException {
		for (RawAttributes at : rawAttr) {
			String name = at.getName();
			Object val = at.getValue();
			if (name.equalsIgnoreCase("WEB_TYPE")) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				webType = (String) map.get(locale);
				webType = webType.replace("\"", "");
			} else if (name.equalsIgnoreCase("WEB_DECAF") && val.toString().equalsIgnoreCase("true")) {
				decaf = "Decaf";
				decafVal = "Yes";
			} else if (name.equalsIgnoreCase("WEB_ROASTERNOTES")) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				roasterNotes = (String) map.get(locale);
				roasterNotes = roasterNotes.replace("\"", "");
			} else if (name.equalsIgnoreCase(bagSizeConst)) {
				Map<String, Object> map = oMapper.convertValue(val, Map.class);
				bagSize = (String) map.get(locale);
				bagSize = bagSize.replace("\"", "");
			} else {
				getDetailsParameter(name, val);
			}
		}

	}

	private void getDetailsParameter(String name, Object val) throws JsonMappingException, JsonProcessingException {
		if (name.equalsIgnoreCase("WEB_BEST")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			bestWith = (String) map.get(locale);
			bestWith = bestWith.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_ESPRESSO") && val.toString().equalsIgnoreCase("true")) {
			espresso = "Espresso";
			webEspresso = "Espresso";
		} else if (name.equalsIgnoreCase("WEB_ROASTLEVEL")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			roastLevel = (String) map.get(locale);
			roastLevel = roastLevel.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_STATUS")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			String webStatusVal = (String) map.get(locale);
			List<WebStatus> ws = oMapper.readValue(webStatusVal, new TypeReference<List<WebStatus>>(){});
			setWebStatus(ws);
		} else if (name.equalsIgnoreCase("WEB_FLAVOURNOTES")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			flavourNotes = (String) map.get(locale);
			flavourNotes = flavourNotes.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_ROASTDAY")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			roastDays = "Roast Days " + (String) map.get(locale);
			roastDays = roastDays.replace("\"", "");
		} else {
			getBeanzDetailsParameter(name,val);
		}
	}
	
	private void setWebStatus(List<WebStatus> ws) {
		for(WebStatus web : ws) {
			String channel = web.getChannel();
			String val = web.getValue();
//			As of now hardcoded need to get from config
			if(channel.equalsIgnoreCase("beanz-web-us")) {
				webStatus = val;
			}
		}
		
	}

	private void getBeanzDetailsParameter(String name, Object val) {
		if (name.equalsIgnoreCase(flavourCategoryStr)) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			flavourCategory = (String) map.get(locale);
			flavourCategory = flavourCategory.replace("\"", "");
			flavourCategory = flavourCategory.replace("[", "");
			flavourCategory = flavourCategory.replace("]", "");
		} else if (name.equalsIgnoreCase("WEB_TASTING_NOTES")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			tastingNotes = (String) map.get(locale);
			tastingNotes = tastingNotes.replace("\"", "");
			tastingNotes = tastingNotes.replace("[", "");
			tastingNotes = tastingNotes.replace("]", "");
			tastingNotes = tastingNotes.replace(",", ", ");
		} else if (name.equalsIgnoreCase("WEB_BREWMETHOD")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			brewMethod = (String) map.get(locale);
			brewMethod = brewMethod.replace("\"", "");
			brewMethod = brewMethod.replace("[", "");
			brewMethod = brewMethod.replace("]", "");
			brewMethodVal = brewMethod;
			if(brewMethod.contains(",")) {
				brewMethod = brewMethod.replace(",", " & ");
				brewMethod = "Works with "+brewMethod;
			}
		} else if (name.equalsIgnoreCase("WEB_VARIETAL")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			varietal = (String) map.get(locale);
			varietal = varietal.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_PROCESS_OPTION")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			processOption = (String) map.get(locale);
			processOption = processOption.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_COUNTRY")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			country = (String) map.get(locale);
			country = country.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_REGION")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			region = (String) map.get(locale);
			region = region.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_ELEVATION_FROM")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			elevationFrom = (String) map.get(locale);
			elevationFrom = elevationFrom.replace("\"", "");
		} else if (name.equalsIgnoreCase("WEB_ELEVATION_TO")) {
			Map<String, Object> map = oMapper.convertValue(val, Map.class);
			elevationTo = (String) map.get(locale);
			elevationTo = elevationTo.replace("\"", "");
		}
	}

	public String getProductDetailAnalyticsData() {
		LOGGER.debug("getProductDetailAnalyticsData() method started");
		final List<Map<String, Object>> genericProductDataList = new ArrayList<>();
		final Map<String, Object> genericProductData = new HashMap<>();
		genericProductData.put("productName", resultsList.get(0).getMasterData().getCurrent().getName());
		genericProductData.put("productID", resultsList.get(0).getMasterData().getCurrent().getMasterVariant().getSku());
		genericProductData.put("category", vendorName);
		float productPrice = Float.parseFloat(resultsList.get(0).getMasterData().getCurrent().getMasterVariant().getPrices().get(0).getValue().getCentAmount())/100;
		genericProductData.put("basePrice", Float.toString(productPrice));
		genericProductData.put("noOfUnits", 1);
		genericProductData.put("stockState", false);
		genericProductDataList.add(genericProductData);
		return JsonConvertor.convertToJson(genericProductDataList);
	}

	public String getJsonResponse() {
		return jsonResponse;
	}

	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}

	public List<Results> getResults() {
		return resultsList;
	}

	public void setResults(List<Results> results) {
		this.resultsList = results;
	}

	public List<RawAttributes> getRawAttr() {
		return rawAttr;
	}

	public void setRawAttr(List<RawAttributes> rawAttrs) {
		this.rawAttr = rawAttrs;
	}

	public String getBestWith() {
		return bestWith;
	}

	public String getRoastDays() {
		return roastDays;
	}

	public String getRoastLevel() {
		return roastLevel;
	}

	public String getFlavourNotes() {
		return flavourNotes;
	}

	public String getEspresso() {
		return espresso;
	}

	public String getDecaf() {
		return decaf;
	}

	public String getWebType() {
		return webType;
	}

	public String getRoasterNotes() {
		return roasterNotes;
	}

	public String getPdpImagePath() {
		return pdpImagePath;
	}

	public String getTileImagePath() {
		return tileImagePath;
	}

	public String getBagSize() {
		return bagSize;
	}
	
	public String getVendorName() {
		return vendorName;
	}
	
	public String getSubscriptionResponse() {
		return subscriptionResponse;
	}
	
	public String getWebEspresso() {
		return webEspresso;
	}
	
	public String getBrewMethod() {
		return brewMethod;
	}
	
	public String getBeanzSkuId() {
		return beanzSkuId;
	}
	
	public String getIsDiscoveryBean() {
		return isDiscoveryBean;
	}
	
	public String getDiscoveryData() {
		return discoveryData;
	}
	
	public String getProductName() {
		return productName;
	}
	
	public String getPageHierarchy() {
		return pageHierarchy;
	}
	
	public String getSiteSection() {
		return siteSection;
	}
	
	public String getSiteSection1() {
		return siteSection1;
	}
	
	public String getSiteSection2() {
		return siteSection2;
	}
	
	public String getPageName() {
		return pageName;
	}
	
	public String getPageUrl() {
		return pageUrl;
	}
	
	public String getProductSlug() {
		return productSlug;
	}
	
	public String getCurrencySymbol() {
		if(multiFieldValue != null) {
			return currencySymbol = multiFieldValue.getCurrencySymbol();
		}
		return "$";
	}
}
