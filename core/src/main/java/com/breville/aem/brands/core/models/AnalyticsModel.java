package com.breville.aem.brands.core.models;

import java.util.Dictionary;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.constant.AnalyticsConstants;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.services.impl.MultiRegionConfigurationsFactoryImpl;
import com.breville.aem.brands.core.utils.JsonConvertor;
import com.breville.aem.brands.core.utils.PathUtil;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;

/**
 * The Class beanz AnalyticsModel.This is a model class for Analytics that will
 * include its propertie
 *
 *
 */
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class AnalyticsModel {
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(AnalyticsModel.class);

	/** The request. */
	@SlingObject
	private SlingHttpServletRequest request;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The generic data Json. */
	@Inject
	private String genericDataJson;

	/** The externalizer. */
	@Inject
	private Externalizer externalizer;
	
	private String countryCode;

	private String languageCode;

	private String brand;

	private String externalizerKey;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/**
	 * The multiRegionConfig factory object instance.
	 */
	@Inject
	private MultiRegionConfigurationsFactoryImpl multiRegionConfigurationFactory;

	/** The props. */
	private Dictionary<?, ?> props;

	/**
	 * Gets the generic data JSON.
	 *
	 * @return the generic data JSON
	 */
	public String getGenericDataJson() {
		return genericDataJson;
	}

	
	/**
	 * 
	 */
	@PostConstruct
	public void init() {
		try {
			LOGGER.debug("init() method started");
			if (Objects.nonNull(multiRegionConfigurationFactory)) {
				String localeStr = multiRegionConfigurationFactory.getLocale().toLowerCase();
				this.countryCode = getCountryCodeFromLocaleStr(localeStr);
				this.languageCode = getLanguageCodeFromLocaleStr(localeStr);
				this.brand = getLanguageCodeFromLocaleStr(multiRegionConfigurationFactory.getBrand());
				this.externalizerKey = getLanguageCodeFromLocaleStr(
						multiRegionConfigurationFactory.getExternalizerKey());
			}

			final Map<String, Object> genericJSON = new HashMap<>();
			final Map<String, Object> genericPagedataJSON = new HashMap<>();
			/** generic page map */
			final Map<String, Object> genericPageData = getGenericPageData();
			genericPagedataJSON.put(AnalyticsConstants.PAGE_INFO, genericPageData);
			genericJSON.put(AnalyticsConstants.PAGE, genericPagedataJSON);
			final Map<String, Object> genericUserdataJSON = new HashMap<>();
			/** generic user map */
			final Map<String, Object> genericUserData = getGenericUserData();
			genericUserdataJSON.put(AnalyticsConstants.USER_INFO, genericUserData);
			genericJSON.put(AnalyticsConstants.USER, genericUserdataJSON);
			/** generic environment map */
			final Map<String, Object> genericEnvironmentData = getGenericEnvironmentData();
			genericJSON.put(AnalyticsConstants.ENVIRONMENT, genericEnvironmentData);
			/** check the status code for 404 and 500 */
			if (currentPage.getProperties().get(AnalyticsConstants.STATUS_CODE) != null && (currentPage.getProperties()
					.get(AnalyticsConstants.STATUS_CODE).toString().equals(AnalyticsConstants.ERROR_404)
					|| currentPage.getProperties().get(AnalyticsConstants.STATUS_CODE).toString()
							.equals(AnalyticsConstants.ERROR_500))) {
				final String statusCode = currentPage.getProperties().get(AnalyticsConstants.STATUS_CODE).toString();
				/** generic error map */
				final Map<String, Object> genericErrorData = getGenericErrorData(statusCode);
				genericJSON.put(AnalyticsConstants.ERROR, genericErrorData);

				genericDataJson = JsonConvertor.convertToJson(genericJSON);
			} else {
				genericDataJson = JsonConvertor.convertToJson(genericJSON);
			}
			/** check query parameter in the url */
			if (Objects.nonNull(request.getQueryString())) {
				/** generic query parameter map */
				final Map<String, Object> genericQueryParameterData = getGenericQueryParameterData();
				genericJSON.put(AnalyticsConstants.QUERY_PARAMETER, genericQueryParameterData);

				genericDataJson = JsonConvertor.convertToJson(genericJSON);
			} else {
				genericDataJson = JsonConvertor.convertToJson(genericJSON);
			}
			LOGGER.debug("init() method end");
		} catch (Exception e) {
			LOGGER.error("error occured in init() {}", e.getMessage());
		}
	}

	/**
	 * Gets the generic data.
	 *
	 * @return the generic data
	 */
	public Map<String, Object> getGenericPageData() {
		LOGGER.debug("getGenericPageData() method started");
		final Map<String, Object> genericPageData = new HashMap<>();
		/** get the content path */
		String contentPath = buildLinkPath(currentPage.getPath(), resourceResolver);
		/** get the url */
		final String url = buildExternalizeUrl(request.getResource().getResourceResolver(), contentPath,
				request.getResource());
		if (contentPath.contains(ApplicationConstants.SLASH_CONTENT)) {
			contentPath = contentPath.replace(ApplicationConstants.SLASH_CONTENT, "");
		} else {
			contentPath = contentPath.replaceFirst(ApplicationConstants.SLASH, "");
		}
		contentPath = contentPath.replace(AnalyticsConstants.FORWARD_SLASH, AnalyticsConstants.PIPE_SEPARATOR);
		final String siteContentPath = contentPath;
		/** get the page name */
		final String pageName = getPageName(siteContentPath, this.countryCode);
		/** get the page type */
		final String pageType = getPageType(currentPage.getPath(), request.getRequestPathInfo().getSelectors());
		/** add brand name value */
		genericPageData.put(AnalyticsConstants.BRAND_NAME_ANALYTICS, this.brand);
		/** add country value */
		genericPageData.put(AnalyticsConstants.COUNTRY_ANALYTICS, this.countryCode);
		/** add page name value */
		genericPageData.put(AnalyticsConstants.PAGE_NAME_ANALYTICS, pageName);
		/** add language value */
		genericPageData.put(AnalyticsConstants.LANGUAGE_ANALYTICS, this.languageCode);
		/** add page id value */
		genericPageData.put(AnalyticsConstants.PAGE_ID_ANALYTICS, "");
		/** add page type value */
		genericPageData.put(AnalyticsConstants.PAGE_TYPE_ANALYTICS, pageType);
		/** get site section data */
		getSiteSectionData(genericPageData, siteContentPath.replace(ApplicationConstants.HTML_WITH_EXTENSION, ""),
				contentPath.replace(ApplicationConstants.HTML_WITH_EXTENSION, ""));
		/** add url value */
		genericPageData.put(AnalyticsConstants.URL_ANALYTICS, url);

		LOGGER.debug("getGenericData() method end");
		return genericPageData;
	}

	/**
	 * Gets the generic user data.
	 *
	 * @return the generic user data
	 */
	public Map<String, Object> getGenericUserData() {
		LOGGER.debug("getGenericUserData() method started");
		final Map<String, Object> genericUserData = new HashMap<>();
		/** add log in status */
		genericUserData.put(AnalyticsConstants.LOGIN_STATUS_ANALYTICS, "");
		/** add customer id */
		genericUserData.put(AnalyticsConstants.CUSTOMER_ID_ANALYTICS, "");
		/** add login type */
		genericUserData.put(AnalyticsConstants.LOGIN_TYPE_ANALYTICS, "");
		/** add customer type */
		genericUserData.put(AnalyticsConstants.CUSTOMER_TYPE_ANALYTICS, "");
		/** add user type */
		genericUserData.put(AnalyticsConstants.USER_TYPE_ANALYTICS, "");
		LOGGER.debug("getGenericUserData() method end");
		return genericUserData;
	}

	/**
	 * Gets the generic environment data.
	 *
	 * @return the generic environment data
	 */
	public Map<String, Object> getGenericEnvironmentData() {
		LOGGER.debug("getGenericEnvironmentData() method started");
		final Map<String, Object> genericEnvironmentData = new HashMap<>();
		/** add user agent */
		genericEnvironmentData.put(AnalyticsConstants.USER_AGENT_ANALYTICS, "");
		/** add device type */
		genericEnvironmentData.put(AnalyticsConstants.DEVICE_TYPE_ANALYTICS, "");
		/** add host name */
		genericEnvironmentData.put(AnalyticsConstants.HOST_NAME_ANALYTICS, "");
		/** add server name */
		genericEnvironmentData.put(AnalyticsConstants.SERVER_NAME_ANALYTICS, "");
		/** add environment */
		genericEnvironmentData.put(AnalyticsConstants.ENVIRONMENT, "");
		LOGGER.debug("getGenericEnvironmentData() method end");
		return genericEnvironmentData;
	}

	/**
	 * Get the errorData
	 *
	 * @param statusCode the statusCode
	 * @return errorData
	 */
	public Map<String, Object> getGenericErrorData(String statusCode) {
		LOGGER.debug("getErrorData() method start");
		final Map<String, Object> genericErrorData = new HashMap<>();
		/** add status code */
		genericErrorData.put(AnalyticsConstants.ERROR_CODE, statusCode);
		/** add method name */
		genericErrorData.put(AnalyticsConstants.ERROR_SUB_TYPE, "");
		/** add error type */
		genericErrorData.put(AnalyticsConstants.ERROR_TYPE, AnalyticsConstants.LOAD_ERROR);
		/** add error message */
		genericErrorData.put(AnalyticsConstants.ERROR_MESSAGE, currentPage.getProperties()
				.get(AnalyticsConstants.ERROR_MESSAGE_TITLE, AnalyticsConstants.PAGE_NOT_FOUND));

		LOGGER.debug("getErrorData() method end");
		return genericErrorData;
	}

	/**
	 * gets the genericQueryParameterData
	 * 
	 * @return genericQueryParameterData
	 */
	public Map<String, Object> getGenericQueryParameterData() {
		LOGGER.debug("getGenericQueryParameterData() method start");
		final Map<String, Object> genericQueryParameterData = new HashMap<>();
		final String queryString = request.getQueryString();
		final String[] parameters = queryString.split(AnalyticsConstants.AND);
		for (final String parameter : parameters) {
			final String[] keyValuePair = parameter.split(AnalyticsConstants.EQUAL);
			if (keyValuePair.length >= ApplicationConstants.TWO) {
				genericQueryParameterData.put(keyValuePair[0], keyValuePair[1]);
			}
		}

		LOGGER.debug("getGenericQueryParameterData() method end");
		return genericQueryParameterData;
	}

	/**
	 * Gets the page name.
	 *
	 * @param siteContentPath the site content path
	 * @param country         the country
	 * @return pageName
	 */
	public String getPageName(String siteContentPath, String country) {
		LOGGER.debug("getPageName() method start");
		String pageName = siteContentPath;
		pageName = pageName.replace(AnalyticsConstants.PIPE_SEPARATOR, AnalyticsConstants.COLON)
				.replace(ApplicationConstants.HTML_WITH_EXTENSION, "");
		pageName = this.brand.concat(AnalyticsConstants.HYPEN).concat(country.toUpperCase(Locale.ENGLISH))
				.concat(AnalyticsConstants.COLON).concat(pageName);
		LOGGER.debug("getPageName() method end");
		return pageName;
	}

	/**
	 *
	 * @param genericPageData the genericPageData
	 * @param siteSection     the siteSection
	 * @param siteSubSection1 the siteSubSection1
	 * @param siteSubSection2 the siteSubSection2
	 * @param hierarchy       the hierarchy
	 */
	private void getSiteSection(final Map<String, Object> genericPageData, String siteSection, String siteSubSection1,
			String siteSubSection2, String hierarchy) {
		/** add site analytics value */
		genericPageData.put(AnalyticsConstants.SITE_SECTION_ANALYTICS, siteSection);
		/** add site sub section value */
		genericPageData.put(AnalyticsConstants.SITE_SUB_SECTION_1_ANALYTICS, siteSubSection1);
		/** add site sub section value */
		genericPageData.put(AnalyticsConstants.SITE_SUB_SECTION_2_ANALYTICS, siteSubSection2);
		/** add hierarchy value */
		genericPageData.put(AnalyticsConstants.HIERARCHY_ANALYTICS, hierarchy);
	}

	/**
	 * 
	 * @param genericPageData the genericPageData
	 * @param siteContentPath the siteContentPath
	 * @param contentPath     the contentPath
	 */
	private void getSiteSectionData(final Map<String, Object> genericPageData, final String siteContentPath,
			final String contentPath) {
		final String[] siteContent = siteContentPath != null
				&& siteContentPath.startsWith(AnalyticsConstants.PIPE_SEPARATOR)
						? siteContentPath.substring(1, siteContentPath.length()).split(AnalyticsConstants.PIPE_OPERATOR)
						: siteContentPath.split(AnalyticsConstants.PIPE_OPERATOR);
		final String[] content = contentPath != null && contentPath.startsWith(AnalyticsConstants.PIPE_SEPARATOR)
				? contentPath.substring(1, contentPath.length()).split(AnalyticsConstants.PIPE_OPERATOR)
				: contentPath.split(AnalyticsConstants.PIPE_OPERATOR);

		/** check if the page is home page */
		if (content.length == ApplicationConstants.TWO) {
			getSiteSection(genericPageData, "", "", "", "");
		}
		if (content.length > ApplicationConstants.TWO
				&& (siteContent.length == ApplicationConstants.ONE || siteContent.length == ApplicationConstants.TWO)) {
			getSiteSection(genericPageData,
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO], "", "",
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO]);
		} else if (siteContent.length == ApplicationConstants.THREE) {
			getSiteSection(genericPageData,
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO],
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.THREE], "",
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO]
							+ AnalyticsConstants.PIPE_SEPARATOR
							+ contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.THREE]);
		} else if (siteContent.length >= ApplicationConstants.FOUR) {
			getSiteSection(genericPageData,
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO],
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.THREE],
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.FOUR],
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO]
							+ AnalyticsConstants.PIPE_SEPARATOR
							+ contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.THREE]
							+ AnalyticsConstants.PIPE_SEPARATOR
							+ contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.FOUR]);
		}
	}

	/**
	 * 
	 * @param currentPage the currentPage
	 * @param selectors   the selectors
	 * @return pageType
	 */
	public String getPageType(String currentPage, String[] selectors) {

		String pageType = "";
		if (this.brand.equalsIgnoreCase(ApplicationConstants.BEANZ)) {
			if (currentPage.contains(ApplicationConstants.OUR_ROASTERS)) {
				String pagePath = currentPage.substring(currentPage.indexOf(ApplicationConstants.OUR_ROASTERS)
						+ ApplicationConstants.OUR_ROASTERS.length() - 1, currentPage.length());
				int countOfSlash = StringUtils.countMatches(pagePath, '/');
				if (countOfSlash == 1) {
					pageType = ApplicationConstants.ROASTER;
				} else if (countOfSlash == 2) {
					pageType = ApplicationConstants.PDP;
				}
			}
		}
		return pageType;
	}

	/**
	 * Build a link based on different input criteria
	 *
	 * @param link             the given link string
	 * @param resourceResolver the ResourceResolver
	 * @return string the build link
	 */
	protected String buildLinkPath(final String link, ResourceResolver resourceResolver) {
		return PathUtil.buildLInk(link, resourceResolver);
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

	/**
	 * Returns the property value based on the key passed as parameter.
	 *
	 * @param key String
	 * @return String property value
	 */
	public String getPropertyByKey(final String key) {
		LOGGER.debug("Reading Common Config for Key - {}", key);
		final String value = (String) props.get(key);
		LOGGER.debug("Common Config Value - {}", value);
		return value;
	}

	/**
	 * Gets the Country code from the Locale String value
	 * 
	 * @param locale
	 * @return Country Code
	 */
	public String getCountryCodeFromLocaleStr(final String locale) {
		if (StringUtils.isNotEmpty(locale)) {
			String[] localArr = locale.split("-");
			return localArr.length > 1 ? localArr[1] : StringUtils.EMPTY;
		}
		return StringUtils.EMPTY;
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
}
