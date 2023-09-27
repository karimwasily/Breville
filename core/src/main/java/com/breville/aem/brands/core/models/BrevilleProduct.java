/**
 * 
 */
package com.breville.aem.brands.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.WordUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.pojo.ProductInformation;
import com.breville.aem.brands.core.pojo.ProductVariantsInformation;
import com.breville.aem.brands.core.response.Category;
import com.breville.aem.brands.core.response.Current;
import com.breville.aem.brands.core.response.CustomGraphQLResponseImpl;
import com.breville.aem.brands.core.response.MasterVariant;
import com.breville.aem.brands.core.response.Prices;
import com.breville.aem.brands.core.response.ProductImages;
import com.breville.aem.brands.core.response.ProductVideos;
import com.breville.aem.brands.core.response.RawAttributes;
import com.breville.aem.brands.core.response.Results;
import com.breville.aem.brands.core.response.Variants;
import com.breville.aem.brands.core.response.WebStatus;
import com.breville.aem.brands.core.services.BrevilleMultiRegionConfigurationsFactory;
import com.breville.aem.brands.core.services.CommerceToolApiService;
import com.breville.aem.brands.core.utils.BrevilleUtil;
import com.breville.aem.brands.core.utils.JsonUtil;
import com.day.cq.i18n.I18n;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, resourceType = "breville-brands/components/commerce/brevilleproduct", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BrevilleProduct {

	/* Constant variables */
	private static String VARIANTSINFO_ATTR = "variantsInfo";
	private static String PRODUCTIMGS_ATTR = "productImages";
	private static String PRODUCTVIDIOS_ATTR = "productVideos";
	private static String PDP_ATTR = "pdp";
	private static String DEFAULT_ATTR = "default";
	private static String CHANNEL_KEY_ATTR = "channelKEY";
	private static String PROD_PARENT_SKU_ATTR = "productParentSKU";
	private static String SF_NOTIFY_ME = "sfNotifyMe";
	private static String CATEGORY = "category";
	private static String BGIMAGE = "bgImage";
	private static String PLAYBUTTON_TEXT = "playButtonText";
	private static String COLORSCHEME = "colorScheme";
	private static String TITLE = "title";
	private static String VIDEO_SRC = "videoSrc";
	private static String DISCLAIMER = "disclaimer";
	private static String USER_GUIDES = "userGuides";
	private static String SHARE_LIST = "shareList";
	private static String PRODUCT_BUNDLE = "productBundle";
	private static String SHOP_BUNDLE_LINK = "shopThisBundleLink";
	private static String GOTO_CART_LINK = "goToCartLink";
	private static String KEEPSHOPPING_LINK = "keepShoppingLink";
	private static String PRODUCT_NAME = "productName";
	private static String PRODUCT_TYPE = "productType";
	private static String FREE_COFFEE_TOOL_TIP="freeCoffeeTooltip";
	private static String NAV_TITLE_ATTR = "navTitle";

	@Self
	private SlingHttpServletRequest request;

	@Inject
	protected Resource resource;

	@SlingObject
	private SlingHttpServletResponse response;

	/**
	 * CommerceToolApiService Object
	 */
	@Inject
	private CommerceToolApiService commerceToolApiService;

	/**
	 * GraphQl Response
	 */
	@JsonIgnore
	private CustomGraphQLResponseImpl graphqlResponse;

	@Setter
	@Getter
	private String jsonResponse;

	/**
	 * CT Products Results Objects
	 */
	@Setter
	@Getter
	private List<Results> resultsList;

	/**
	 * CT Product Variants
	 */
	@Setter
	@Getter
	List<Variants> variants;

	/**
	 * CT Master Variant
	 */
	@Setter
	@Getter
	MasterVariant masterVariant;

	/**
	 * Products Color Variants
	 */
	@Getter
	List<ProductVariantsInformation> variantsInfo;

	/**
	 * Products Color Variants Json
	 */
	String variantsInfoJson;

	/**
	 * CT Product's RawAttributes
	 */
	@Setter
	@Getter
	private List<RawAttributes> rawAttr;

	/**
	 * CT Product Images List
	 */
	@Getter
	private List<ProductImages> productImages;

	/**
	 * CT Product Images List
	 */
	@Getter
	private List<ProductVideos> productVideos;

	/**
	 * Product Callout retrieve from MasterVariant
	 */
	@Setter
	@Getter
	private String productCallOut;

	private ProductInformation productInformation;

	@Inject
	private BrevilleMultiRegionConfigurationsFactory multiconfigObject;

	@Setter
	private String productSwatchImagePrefixPath;
	
	@Inject
	@Via("resource")
	BrevilleSFCustomerFormModel sfcustomerform;

	@Inject
	@Via("resource")
	@Named("shareIcons")
	private List<ShareIcons> shareIcons;

	String brandName = ApplicationConstants.BREVILLE_BRAND;

	@Getter
	String locale = ApplicationConstants.DEFAULT_LOCALE;
	
	@Getter
	String siteRootPath = "";

	String webChannelConfigVal;
	
	String parentSkuVariable;
	
	@Getter
	String productCategory;
	
	@Getter
	@Inject
	@Via("resource")
	private String bgImage;
	
	@Getter
	@Inject
	@Via("resource")
	private String colorScheme;
	
	@Getter
	@Inject
	@Via("resource")
	private String playButtonText;
	
	@Inject
	@Via("resource")
	@Named("btnLabel")
	private String btnLabel;
	
	@Inject
	@Via("resource")
	@Named("link")
	private String link;
	
	@Inject
	@Via("resource")
	@Named("keepShoppingLink")
	private String keepShoppingLink;
	
	@Inject
	@Via("resource")
	@Named("goToCartLink")
	private String goToCartLink;
	
	@Getter
	@Inject
	@Via("resource")
	@Named("makeItCompleteBundleData")
	private List<MakeItCompleteBundleData> makeItCompleteBundleData;
	
	@Getter
	private String productName;
	
	@Getter
	private String productType;

	@Inject
	@Via("resource")
	@Default(values = StringUtils.EMPTY)
	private String freeCoffeeTooltip;
	
	@Getter
	private String categoryPagePath;
	
	@Getter
	private String categoryName;
	
	private I18n i18n;
	
	@ScriptVariable
	private Page currentPage;

	ObjectMapper oMapper = new ObjectMapper();

	@PostConstruct
	public void initModel() {
		try {
			
			i18n = BrevilleUtil.getI18n(currentPage, request);
			log.debug("i18n {} ", i18n);
			
			//breadcrumb title
			categoryName = getParentPageNavTitle(request.getRequestURI());
			categoryPagePath = FilenameUtils.getFullPathNoEndSeparator(request.getRequestURL().toString())
					+ApplicationConstants.HTML_EXTENSION;
			if(categoryName.isEmpty()) {
				categoryName = WordUtils.capitalize(FilenameUtils.getBaseName(categoryPagePath).replace("-", " "));
				log.info("Category Name :: {} ",categoryName);
			}			

			if (Objects.nonNull(multiconfigObject)) {
				brandName = multiconfigObject.getSiteSpecificProperty(resource, ApplicationConstants.BRAND_ATTR);
				locale = multiconfigObject.getSiteSpecificProperty(resource, ApplicationConstants.LOCALE_ATTR);
				webChannelConfigVal = multiconfigObject.getSiteSpecificProperty(resource,
						ApplicationConstants.WEB_CHANNEL);
				siteRootPath = multiconfigObject.getSiteSpecificProperty(resource,
						ApplicationConstants.SITE_ROOT_PATH);
				log.info("brand from breville multficonfig brand = {} locale = {}", brandName, locale);
			}

			String[] skuVariableSector = request.getRequestPathInfo().getSelectors();
			if (skuVariableSector.length > 0) {
				parentSkuVariable = skuVariableSector[0];
				String resp = commerceToolApiService.getProductData(parentSkuVariable.toUpperCase(), locale, brandName);
				jsonResponse = resp;
				if (!resp.isEmpty()) {
					ObjectMapper mapper = new ObjectMapper();
					graphqlResponse = mapper.readValue(resp, CustomGraphQLResponseImpl.class);
					resultsList = graphqlResponse.getData().getProducts().getResults();

					if (Objects.nonNull(resultsList) && resultsList.size() > 0) {
						
						getVariantsProductsList(resultsList, locale);
						
						if(Objects.isNull(masterVariant))
							response.sendRedirect(siteRootPath+"/errors/404.html");
						
						//master variant priceList
						List<Prices> priceList = masterVariant
								.getPrices();
						productName = resultsList.get(0).getMasterData().getCurrent().getName();
						productType = resultsList.get(0).getProductType().getKey();
						//get the other variantlist
						
						//check if any of variant is from specific web channel
						boolean isAnyVariantFromWebChannel = false;
						if(Objects.nonNull(variants)) {
							for (Variants variants : variants) {
								List<Prices> variantPrice = variants.getPrices();
								if(isSkuFromWebChannel(webChannelConfigVal, variantPrice)) {
									isAnyVariantFromWebChannel = true;
									log.debug("Yes, this variant from {}",webChannelConfigVal);
									break;
								}
							}
						}

						if (isSkuFromWebChannel(webChannelConfigVal, priceList) || isAnyVariantFromWebChannel) {
							log.info("products :: {} ", resultsList.size());							
							getRawAttributes(resultsList);
							getColorVairantsList(locale);
							getProductImgsAndVideos(locale, rawAttr);
							List<Category> categories = resultsList.get(0).getMasterData().getCurrent().getCategories();
							if(Objects.nonNull(categories) && categories.size() > 0) {
								productCategory = categories.get(0).getName().toLowerCase();
							}

						} else {
							/* TODO: Get the error page dynamically */
							response.sendRedirect(siteRootPath+"/errors/404.html");
						}
						
						//if variantsInfo is null or size is zero then redirect not found
						if(Objects.isNull(variantsInfo) || (Objects.nonNull(variantsInfo) && variantsInfo.size() == 0))
							response.sendRedirect(siteRootPath+"/errors/404.html");
					}else {
						/* TODO: Get the error page dynamically */
						//no product available
						response.sendRedirect(siteRootPath+"/errors/404.html");
					}
				}
			} else {
				log.error("there is no selector for this page path");
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}

	private void getProductImgsAndVideos(String locale, List<RawAttributes> rawAttr2) {
		String prodImgs = getAttrValue(locale, PRODUCTIMGS_ATTR, rawAttr2);
		String prodVideos = getAttrValue(locale, PRODUCTVIDIOS_ATTR, rawAttr2);
		try {
			if(Objects.nonNull(prodImgs)) {
				productImages = JsonUtil.getMapper()
						.readValue(prodImgs, new TypeReference<ArrayList<ProductImages>>() {});
			}
			log.info("products images :: {}", productImages.size());
			if(Objects.nonNull(prodVideos)) {
				productVideos = JsonUtil.getMapper()
						.readValue(prodVideos, new TypeReference<ArrayList<ProductVideos>>() {});
			}

		} catch (JsonProcessingException e) {
			log.info("Error while getting json : {}", e.getMessage());
		}

	}

	/**
	 * Get the variants from both MasterVariant and Variants of response
	 * 
	 * @param locale
	 */
	public void getColorVairantsList(final String locale) {
		variantsInfo = new ArrayList<ProductVariantsInformation>();

		ProductVariantsInformation masterVarInfo = new ProductVariantsInformation();
		String masterVarColor = getAttrValue("en", ApplicationConstants.COLOUR_TRANSLATION_ATTR,
				masterVariant.getAttributesRaw());

		masterVarColor = Objects.nonNull(masterVarColor) ? masterVarColor : DEFAULT_ATTR;

		masterVarInfo.setVariantColor(masterVarColor);
		masterVarInfo.setVariantSku(masterVariant.getSku());
		masterVarInfo.setVariantSwatchImg(ApplicationConstants.PRODUCT_SWATCH_IMG_PREFIX + ApplicationConstants.SLASH
				+ masterVarColor.toLowerCase().replace(" ", "_") + ApplicationConstants.DOT + ApplicationConstants.IMAGE_JPG);

		String masterVariantColorTitle = getAttrValue(locale, ApplicationConstants.COLOUR_TRANSLATION_ATTR,
				masterVariant.getAttributesRaw());

		masterVarInfo.setVariantColorTitle(masterVariantColorTitle);

		String masterVariantPdpImg = masterVariant.getImages().stream().filter(img -> img.getLabel().equals(PDP_ATTR))
				.findFirst().get().getUrl();
		masterVarInfo.setVariantPdpImg(masterVariantPdpImg);

		variantsInfo.add(masterVarInfo);

		if(Objects.nonNull(variants)) {
			for (Variants variant : variants) {
				
				List<Prices> prices = variant.getPrices();
				//variant should be from same web channel, not duplicate item in the variantsInfo, and Not legacy product
				if(isSkuFromWebChannel(webChannelConfigVal, prices) && !checkDuplicate(variant,variantsInfo) && !isLegacy(variant.getAttributesRaw())) {
					ProductVariantsInformation variantInfo = new ProductVariantsInformation();
		
					String variantColor = getAttrValue("en", ApplicationConstants.COLOUR_TRANSLATION_ATTR,
							variant.getAttributesRaw());
		
					variantColor = Objects.nonNull(variantColor) ? variantColor : DEFAULT_ATTR;
					String variantColorTitle = getAttrValue(locale, ApplicationConstants.COLOUR_TRANSLATION_ATTR,
							variant.getAttributesRaw());
		
					variantInfo.setVariantColorTitle(variantColorTitle);
					variantInfo.setVariantColor(variantColor);
					variantInfo.setVariantSku(variant.getSku());
					variantInfo.setVariantSwatchImg(ApplicationConstants.PRODUCT_SWATCH_IMG_PREFIX + ApplicationConstants.SLASH
							+ variantColor.toLowerCase().replace(" ", "_") + ApplicationConstants.DOT + ApplicationConstants.IMAGE_JPG);
		
					String variantPdpImg = variant.getImages().stream().filter(img -> img.getLabel().equals(PDP_ATTR))
							.findFirst().get().getUrl();
					variantInfo.setVariantPdpImg(variantPdpImg);
		
					variantsInfo.add(variantInfo);
				}
			}
		}
	}

	/**
	 * Gets the Master Variant Product Information
	 * 
	 * @param resultsList
	 * @param locale
	 */
	private void getVariantsProductsList(List<Results> resultsList, final String locale) {
		if (null != resultsList && resultsList.size() > 0) {
			Current currentObject = resultsList.get(0).getMasterData().getCurrent();
			if (currentObject.getVariants().size() > 0) {
				variants = currentObject.getVariants();
			}
			
			List<Prices> mastertVarPriceList = currentObject.getMasterVariant().getPrices();			
			List<RawAttributes> masterVarRawAttributes = currentObject.getMasterVariant().getAttributesRaw();
			
			boolean isMasterVarPriceFrmChannel = isSkuFromWebChannel(webChannelConfigVal, mastertVarPriceList);
			boolean isLegacy = isLegacy(masterVarRawAttributes);
			
			//check if CT master variant sku's price channel and web status neither Legacy nor Not visible
			if(isMasterVarPriceFrmChannel && !isLegacy) {
				masterVariant = currentObject.getMasterVariant();
			}else {
				for (Variants variant : variants) {
					List<Prices> variantPriceList = variant.getPrices();
					if(isSkuFromWebChannel(webChannelConfigVal, variantPriceList) && !isLegacy(variant.getAttributesRaw())) {
						masterVariant = new MasterVariant();
						masterVariant.setAttributesRaw(variant.getAttributesRaw());
						masterVariant.setImages(variant.getImages());
						masterVariant.setKey(variant.getKey());
						masterVariant.setPrices(variant.getPrices());
						masterVariant.setSku(variant.getSku());
						break;
					}					
				}
			}
			
			
			if(Objects.nonNull(masterVariant))
				productCallOut = getAttrValue(locale, ApplicationConstants.PRODUCT_CALLOUTS_ATTR,
					masterVariant.getAttributesRaw());
		}
	}

	/**
	 * Gets the specific attribute from CT RawAttributes Object
	 * 
	 * @param key
	 * @param attribute
	 * @param attributesList
	 * @return
	 */
	private String getAttrValue(final String key, String attribute, List<RawAttributes> attributesList) {
		Map<String, Object> attributesMap = attributesList.stream()
				.collect(Collectors.toMap(RawAttributes::getName, RawAttributes::getValue));
		Object object = attributesMap.get(attribute);
		if (Objects.nonNull(object)) {
			Map<String, String> valueMap = oMapper.convertValue(object, new TypeReference<Map<String, String>>() {
			});
			return valueMap.get(key);
		}
		return null;
	}

	/**
	 * Gets the RawAttributes Object from MasterVariant
	 * 
	 * @param resultsList
	 */
	private void getRawAttributes(List<Results> resultsList) {
		if (null != resultsList && resultsList.size() > 0) {
			rawAttr = masterVariant.getAttributesRaw();
		}
	}

	/**
	 * @return
	 * @throws JsonProcessingException
	 */
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}

	/**
	 * Get the Product Variants Color Images Prefix Path
	 * 
	 * @return
	 */
	public String getProductSwatchImagePrefixPath() {
		return ApplicationConstants.PRODUCT_SWATCH_IMG_PREFIX;
	}

	/**
	 * Compare the Web Channel from Multiregion Configuration and Web Channel from
	 * CT response
	 * 
	 * 
	 * @param webChannelConfig
	 * @param priceList
	 * @return
	 */
	public boolean isSkuFromWebChannel(final String webChannelConfig, final List<Prices> priceList) {
		log.info("isSkuFromWebChannel >> webChannelVale from Multiregion config = {} ", webChannelConfig);

		boolean isSameWebChannel = false;
		for (Iterator<Prices> iterator = priceList.iterator(); iterator.hasNext();) {
			Prices prices = (Prices) iterator.next();
			String webChannel = Objects.nonNull(prices.getChannel()) ? prices.getChannel().getName() : null;
			log.info("webChannel from CT response = {} ", webChannel);
			if (Objects.nonNull(webChannelConfig) && Objects.nonNull(webChannel)
					&& webChannelConfig.equalsIgnoreCase(webChannel)) {
				isSameWebChannel = true;
				break;
			}
		}
		log.info("isSameWebChannel = {} ", isSameWebChannel);
		return isSameWebChannel;
	}

	/**
	 * @return the variantsInfoJson
	 */
	public String getVariantsInfoJson() {
		if (Objects.nonNull(variantsInfo)) {
			try {
				Map<String, Object> productInformation = new HashMap<String, Object>();
				productInformation.put(PROD_PARENT_SKU_ATTR, Objects.nonNull(this.parentSkuVariable) ? this.parentSkuVariable.toUpperCase(): null);
				productInformation.put(CHANNEL_KEY_ATTR, this.webChannelConfigVal);
				productInformation.put(CATEGORY, this.productCategory);
				productInformation.put(VARIANTSINFO_ATTR, this.variantsInfo);
				productInformation.put(PRODUCTIMGS_ATTR, this.productImages);
				productInformation.put(PRODUCTVIDIOS_ATTR, this.productVideos);
				productInformation.put(SF_NOTIFY_ME, sfcustomerform);
				productInformation.put(SHARE_LIST,this.shareIcons);
				productInformation.put(SHOP_BUNDLE_LINK,this.link);
				productInformation.put(GOTO_CART_LINK,this.goToCartLink);
				productInformation.put(KEEPSHOPPING_LINK,this.keepShoppingLink);
				productInformation.put(SHOP_BUNDLE_LINK,this.link);
				productInformation.put(PRODUCT_NAME,this.productName);
				productInformation.put(PRODUCT_TYPE,this.productType);
				productInformation.put(PRODUCT_BUNDLE, this.makeItCompleteBundleData);
				productInformation.put(FREE_COFFEE_TOOL_TIP,this.freeCoffeeTooltip);
			return JsonUtil.getMapper().writer().writeValueAsString(productInformation);
			} catch (JsonProcessingException e) {
				log.error("Error while gettiing json :: {}", e.getMessage());
			}
		}
		return null;
	}

	/**
	 * @return the productImages
	 */
	public String getProductImagesJson() {
		if (Objects.nonNull(productImages)) {
			try {
				return JsonUtil.getMapper().writer().writeValueAsString(productImages);
			} catch (JsonProcessingException e) {
				log.error("Error while converting Json : ", e.getMessage());
			}
		}
		return null;
	}

	/**
	 * Product Information - Accessories, Construction Mat, Settings etc
	 * 
	 * @return the productInformation
	 */
	public ProductInformation getProductInformation() {

		productInformation = new ProductInformation();
		productInformation.setAccessories(
				replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_ACCESSORIES_ATTR, rawAttr)));
		productInformation.setConstructionMaterial(
				replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_CONSTRUCMAT_ATTR, rawAttr)));

		productInformation.setSettings(
				replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_SETTINGS_ATTR, rawAttr)));
		productInformation.setCapacity(
				replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_CAPACITY_ATTR, rawAttr)));
		productInformation.setDimentions(
				replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_DIMENSIONS_ATTR, rawAttr)));
		productInformation
				.setPower(replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_POWER_ATTR, rawAttr)));
		productInformation.setVoltage(
				replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_VOLTAGE_ATTR, rawAttr)));
		productInformation.setWarranty(
				replaceDoubleQuotes(getAttrValue(locale, ApplicationConstants.WEB_TS_WARRANTY_ATTR, rawAttr)));
		return productInformation;
	}

	/**
	 * Replace '"' with empty 
	 * 
	 * @param value
	 * @return
	 */
	private String replaceDoubleQuotes(String value) {
		return Objects.nonNull(value) ? value.replace("\"", StringUtils.EMPTY) : value;
	}
	
	/**
	 * Get the youtube component data from CT response
	 * herobanner video will be used from list of videos
	 * 
	 * @return Json String
	 */
	public String getYoutubeJson() {
		try {
			if(Objects.nonNull(productVideos)) {
				Map<String, String> youtubeObj = new HashMap<String, String>();
				for(ProductVideos prodVideo : productVideos) {
					if(prodVideo.getVideoType().equalsIgnoreCase("herobanner")) {
						youtubeObj.put(BGIMAGE, bgImage);
						youtubeObj.put(PLAYBUTTON_TEXT, playButtonText);
						youtubeObj.put(COLORSCHEME, colorScheme);
						youtubeObj.put(TITLE, prodVideo.getVideoTitle());
						youtubeObj.put(VIDEO_SRC, prodVideo.getVideoURL());						
						youtubeObj.put(DISCLAIMER, i18n.get("disclaimerTxt", "Disclaimer"));
					}
				}			
				return JsonUtil.getMapper().writer().writeValueAsString(youtubeObj);
			}
		}catch(Exception e) {
			log.error("Error while getting youtube json data {} ",e.getMessage());
		}		
		return null;
	}
	
	/**
	 * Gets the UserGuide for a product
	 * 
	 * @return Json String 
	 */
	public String getProductUserGuide() {
		try {
			String productManual = getAttrValue(locale, USER_GUIDES, rawAttr);
			@SuppressWarnings("unchecked")
			Map<String, String> map = JsonUtil.getMapper().readValue(productManual, Map.class);
			log.debug("productManual {} ",map.get("userGuideURL"));
			return map.getOrDefault("userGuideURL", "");			
		}catch(Exception e) {
			log.error("Error while getting product user guide {}",e.getMessage());
		}	
		return null;
	}
	
	/**
	 * Check if the product is legacy
	 * 
	 * @return boolean
	 */
	private boolean isLegacy(List<RawAttributes> rawAttrs) {
		String webStatus = getAttrValue(locale, ApplicationConstants.WEB_STATUS, rawAttrs);
		log.info("Web Status {} ",webStatus);
		
		List<WebStatus> webStatusList = new ArrayList<WebStatus>();		
		boolean isLegacy = true;
		
		try {
			if(Objects.nonNull(webStatus)) {
				webStatusList = JsonUtil.getMapper()
						.readValue(webStatus, new TypeReference<ArrayList<WebStatus>>() {});
				log.info("webStatusList :: {}", webStatusList.size());
				
				//isLegacy false - if web status is not Legacy or Not Visible
				for (WebStatus skuWebStatus : webStatusList) {
					if(skuWebStatus.getChannel().equalsIgnoreCase(webChannelConfigVal) && 
							!StringUtils.containsAny(skuWebStatus.getValue(), "Legacy", "Not Visible")) {
						isLegacy = false;
						break;
					}
				}
			}
		} catch (JsonProcessingException e) {
			log.info("Error while getting json : {}", e.getMessage());
		}
		return isLegacy;
	}
	
	/**
	 * Checks for duplicate item in  productVriants Information before adding to the list
	 * 
	 * @param variant
	 * @param variantsInfo
	 * @return true/false 
	 */
	private boolean checkDuplicate(Variants variant,List<ProductVariantsInformation> variantsInfo) {
		boolean isVariantPresent = false;
		
		for (Iterator<ProductVariantsInformation> iterator = variantsInfo.iterator(); iterator.hasNext();) {
			ProductVariantsInformation productVariantsInformation = (ProductVariantsInformation) iterator.next();			
			if(productVariantsInformation.getVariantSku().equalsIgnoreCase(variant.getSku())){
				isVariantPresent = true;
				break;
			}			
		}	
		return isVariantPresent;		
	}
	
	/**
	 * Gets the PDP page's parent-page's Navigation Title
	 * 
	 * @param requestURI
	 * @return navigation title
	 */
	private String getParentPageNavTitle(String requestURI) {			
		String resourcePath = StringUtils.EMPTY;	
		try {			
			if(requestURI.endsWith(ApplicationConstants.HTML_EXTENSION) && 
					requestURI.startsWith(ApplicationConstants.CONTENT_PATH)) {
				resourcePath = FilenameUtils.getPathNoEndSeparator(requestURI);
			}else if(requestURI.endsWith(ApplicationConstants.HTML_EXTENSION)){
				resourcePath = new StringBuffer("/content/breville")
						.append(FilenameUtils.getPathNoEndSeparator(requestURI)).toString();
			}			
			if(!StringUtils.isEmpty(resourcePath)) {
				if(!resourcePath.startsWith(ApplicationConstants.SLASH)) {
					resourcePath = ApplicationConstants.SLASH + resourcePath;
				}
				log.debug("resourcePath :: {}",resourcePath);
				Page page = request.getResourceResolver().getResource(resourcePath).adaptTo(Page.class);
				return page.getProperties().getOrDefault(NAV_TITLE_ATTR, StringUtils.EMPTY).toString();				
			}
			
		}catch(Exception e) {
			log.error("Error while getting parent page nav title {}",e.getMessage());
		}		
		return "";
	}
}
