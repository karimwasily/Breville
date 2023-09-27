package com.breville.aem.brands.core.models;

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
import org.apache.sling.models.annotations.Model;

import com.breville.aem.brands.core.constant.AnalyticsConstants;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.models.BaseModel;
import com.breville.aem.brands.core.services.BrevilleMultiRegionConfigurationsFactory;
import com.breville.aem.brands.core.utils.JsonConvertor;

import lombok.extern.slf4j.Slf4j;

/**
 * This AnalyticsModel will get all data required for analytics.
 * 
 * @author PradeepMC
 *
 */
@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CoffeeHubAnalyticsModel extends BaseModel {

	@Inject
	private BrevilleMultiRegionConfigurationsFactory multiconfigObject;

	/**
	 * Gets the generic data JSON.
	 *
	 * @return the generic data JSON
	 */
	public String getGenericDataJson() {
		return genericDataJson;
	}

	/**
	 * (non-Javadoc).
	 *
	 * @see au.com.breville.core.models.content.BaseModel#init()
	 */
	@PostConstruct
	public void init() {
		log.debug("init() method started");

		if (Objects.nonNull(multiconfigObject)) {
			this.locale = multiconfigObject.getSiteSpecificProperty(resource, ApplicationConstants.LOCALE_ATTR);
			this.countryCode = getCountryCodeFromLocaleStr(this.locale);
			this.languageCode = getLanguageCodeFromLocaleStr(this.locale);
			this.brand = getLanguageCodeFromLocaleStr(
					multiconfigObject.getSiteSpecificProperty(resource, ApplicationConstants.BRAND_ATTR));
			this.externalizerKey = multiconfigObject.getSiteSpecificProperty(resource,
					ApplicationConstants.EXTERNALIZER_KEY);
		}

		final Map<String, Object> genericJSON = new HashMap<>();

		/** generic Page map */
		final Map<String, Object> genericPagedataJSON = new HashMap<>();
		final Map<String, Object> genericPageData = getGenericPageData();
		genericPagedataJSON.put(AnalyticsConstants.PAGE_INFO, genericPageData);
		genericJSON.put(AnalyticsConstants.PAGE, genericPagedataJSON);

		/** generic user map */
		final Map<String, Object> genericUserdataJSON = new HashMap<>();
		final Map<String, Object> genericUserData = getGenericUserData();
		genericUserdataJSON.put(AnalyticsConstants.USER_INFO, genericUserData);
		genericJSON.put(AnalyticsConstants.USER, genericUserdataJSON);

		/** generic environment map */
		final Map<String, Object> genericEnvironmentData = getGenericEnvironmentData();
		genericJSON.put(AnalyticsConstants.ENVIRONMENT, genericEnvironmentData);

		/** check the status code for 404 and 500 */
		Object statusCodeOjb = currentPage.getProperties().get(AnalyticsConstants.STATUS_CODE);
		if (null != statusCodeOjb && (statusCodeOjb.toString().equals(AnalyticsConstants.ERROR_404)
				|| statusCodeOjb.toString().equals(AnalyticsConstants.ERROR_500))) {
			/** generic error map */
			final Map<String, Object> genericErrorData = getGenericErrorData(statusCodeOjb.toString());
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

		log.debug("init() method end");
	}

	/**
	 * Gets the generic data.
	 *
	 * @return the generic data
	 */
	public Map<String, Object> getGenericPageData() {
		log.debug("getGenericPageData() method started");

		Map<String, Object> genericPageData = new HashMap<String, Object>();

		// multiRegionConfigurationFactory null check
		if (Objects.nonNull(brand)) {
			genericPageData.put(AnalyticsConstants.BRAND_NAME_ANALYTICS, brand);
		} else {
			genericPageData.put(AnalyticsConstants.BRAND_NAME_ANALYTICS, ApplicationConstants.COFFEEHUB_BRAND);
		}

		String contentPath = buildLinkPath(currentPage.getPath(), resourceResolver);
		log.info("contentPath :: {}", contentPath);

		/** get the url */
		final String url = buildExternalizeUrl(request.getResource().getResourceResolver(), contentPath,
				request.getResource());
		log.info("url :: {}", url);

		if (contentPath.contains(ApplicationConstants.BREVILLE_ROOT_PATH)) {
			contentPath = contentPath.replace(ApplicationConstants.BREVILLE_ROOT_PATH + ApplicationConstants.SLASH, StringUtils.EMPTY);
		} else {
			contentPath = contentPath.replaceFirst(ApplicationConstants.SLASH, StringUtils.EMPTY);
		}

		contentPath = contentPath.replace(AnalyticsConstants.FORWARD_SLASH, AnalyticsConstants.PIPE_SEPARATOR);

		final String siteContentPath = contentPath.contains(ApplicationConstants.LANGUAGE_MASTERS_NODE)
				? contentPath.replace(ApplicationConstants.LANGUAGE_MASTERS_NODE + AnalyticsConstants.PIPE_SEPARATOR,
						StringUtils.EMPTY).replace(this.languageCode.toLowerCase() + AnalyticsConstants.PIPE_SEPARATOR, StringUtils.EMPTY)
				: contentPath.replace(this.countryCode.toLowerCase() + AnalyticsConstants.PIPE_SEPARATOR, StringUtils.EMPTY)
						.replace(this.languageCode.toLowerCase() + AnalyticsConstants.PIPE_SEPARATOR, StringUtils.EMPTY);

		/** add country value */
		genericPageData.put(AnalyticsConstants.COUNTRY_ANALYTICS, this.countryCode.toLowerCase());

		/** add page name value */
		genericPageData.put(AnalyticsConstants.PAGE_NAME_ANALYTICS,
				getPageName(siteContentPath, this.countryCode.toLowerCase()));

		/** add language value */
		genericPageData.put(AnalyticsConstants.LANGUAGE_ANALYTICS, this.languageCode);

		/** add page id value */
		genericPageData.put(AnalyticsConstants.PAGE_ID_ANALYTICS, StringUtils.EMPTY);

		/** add page type value */
		genericPageData.put(AnalyticsConstants.PAGE_TYPE_ANALYTICS,
				getPageType(currentPage.getPath(), request.getRequestPathInfo().getSelectors()));

		/** get site section data */
		getSiteSectionData(genericPageData, siteContentPath.replace(ApplicationConstants.HTML_EXTENSION, StringUtils.EMPTY),
				contentPath.replace(ApplicationConstants.HTML_EXTENSION, StringUtils.EMPTY));

		/** add url value */
		genericPageData.put(AnalyticsConstants.URL_ANALYTICS, url);

		log.debug("getGenericData() method end");
		return genericPageData;
	}

	/**
	 * Gets the generic user data.
	 *
	 * @return the generic user data
	 */
	public Map<String, Object> getGenericUserData() {
		log.debug("getGenericUserData() method started");
		final Map<String, Object> genericUserData = new HashMap<>();

		/** add log in status */
		genericUserData.put(AnalyticsConstants.LOGIN_STATUS_ANALYTICS, StringUtils.EMPTY);

		/** add customer id */
		genericUserData.put(AnalyticsConstants.CUSTOMER_ID_ANALYTICS, StringUtils.EMPTY);

		/** add login type */
		genericUserData.put(AnalyticsConstants.LOGIN_TYPE_ANALYTICS, StringUtils.EMPTY);

		/** add customer type */
		genericUserData.put(AnalyticsConstants.CUSTOMER_TYPE_ANALYTICS, StringUtils.EMPTY);

		/** add user type */
		genericUserData.put(AnalyticsConstants.USER_TYPE_ANALYTICS, StringUtils.EMPTY);

		log.debug("getGenericUserData() method end");
		return genericUserData;
	}

	/**
	 * Gets the generic environment data.
	 *
	 * @return the generic environment data
	 */
	public Map<String, Object> getGenericEnvironmentData() {
		log.debug("getGenericEnvironmentData() method started");
		final Map<String, Object> genericEnvironmentData = new HashMap<>();

		/** add user agent */
		genericEnvironmentData.put(AnalyticsConstants.USER_AGENT_ANALYTICS, StringUtils.EMPTY);

		/** add device type */
		genericEnvironmentData.put(AnalyticsConstants.DEVICE_TYPE_ANALYTICS, StringUtils.EMPTY);

		/** add host name */
		genericEnvironmentData.put(AnalyticsConstants.HOST_NAME_ANALYTICS, StringUtils.EMPTY);

		/** add server name */
		genericEnvironmentData.put(AnalyticsConstants.SERVER_NAME_ANALYTICS, StringUtils.EMPTY);

		/** add environment */
		genericEnvironmentData.put(AnalyticsConstants.ENVIRONMENT, StringUtils.EMPTY);

		log.debug("getGenericEnvironmentData() method end");
		return genericEnvironmentData;
	}

	/**
	 * Get the errorData
	 *
	 * @param statusCode the statusCode
	 * @return errorData
	 */
	public Map<String, Object> getGenericErrorData(String statusCode) {
		log.debug("getErrorData() method start");
		final Map<String, Object> genericErrorData = new HashMap<>();

		/** add status code */
		genericErrorData.put(AnalyticsConstants.ERROR_CODE, statusCode);

		/** add method name */
		genericErrorData.put(AnalyticsConstants.ERROR_SUB_TYPE, StringUtils.EMPTY);

		/** add error type */
		genericErrorData.put(AnalyticsConstants.ERROR_TYPE, AnalyticsConstants.LOAD_ERROR);

		/** add error message */
		genericErrorData.put(AnalyticsConstants.ERROR_MESSAGE, currentPage.getProperties()
				.get(AnalyticsConstants.ERROR_MESSAGE_TITLE, AnalyticsConstants.PAGE_NOT_FOUND));

		log.debug("getErrorData() method end");
		return genericErrorData;
	}

	/**
	 * gets the genericQueryParameterData
	 * 
	 * @return genericQueryParameterData
	 */
	public Map<String, Object> getGenericQueryParameterData() {
		log.debug("getGenericQueryParameterData() method start");
		final Map<String, Object> genericQueryParameterData = new HashMap<>();
		final String queryString = request.getQueryString();
		final String[] parameters = queryString.split(AnalyticsConstants.AND);

		for (final String parameter : parameters) {
			final String[] keyValuePair = parameter.split(AnalyticsConstants.EQUAL);
			if (keyValuePair.length >= ApplicationConstants.TWO) {
				genericQueryParameterData.put(keyValuePair[0], keyValuePair[1]);
			}
		}

		log.debug("getGenericQueryParameterData() method end");
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
		log.debug("getPageName() method start");
		String pageName = siteContentPath;
		pageName = pageName.replace(AnalyticsConstants.PIPE_SEPARATOR, AnalyticsConstants.COLON)
				.replace(ApplicationConstants.HTML_EXTENSION, StringUtils.EMPTY);
		pageName = pageName.contains("?") ? pageName.split("?")[0] : pageName;

		pageName = this.brand.concat(AnalyticsConstants.HYPEN)
				.concat(country.toUpperCase(Locale.ENGLISH)).concat(AnalyticsConstants.COLON).concat(pageName);
		log.debug("getPageName() method end");
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
	protected void getSiteSectionData(final Map<String, Object> genericPageData, final String siteContentPath,
			final String contentPath) {

		final String[] siteContent = siteContentPath.split(AnalyticsConstants.PIPE_OPERATOR);
		final String[] content = contentPath.split(AnalyticsConstants.PIPE_OPERATOR);

		log.info("SiteContent  siteContentPath :: {}, contentPath = {} ", siteContentPath, contentPath);
		log.info("SiteContent  siteContent :: {}, contentPath = {} ", siteContent.length, content.length);

		/** check if the page is home page */
		if (content.length == ApplicationConstants.TWO) {
			getSiteSection(genericPageData, StringUtils.EMPTY, StringUtils.EMPTY, StringUtils.EMPTY, StringUtils.EMPTY);
		}
		if (content.length > ApplicationConstants.TWO
				&& (siteContent.length == ApplicationConstants.ONE || siteContent.length == ApplicationConstants.TWO)) {
			getSiteSection(genericPageData,
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO], StringUtils.EMPTY, StringUtils.EMPTY,
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO]);
		} else if (siteContent.length == ApplicationConstants.THREE) {
			getSiteSection(genericPageData,
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.TWO],
					contentPath.split(AnalyticsConstants.PIPE_OPERATOR)[ApplicationConstants.THREE], StringUtils.EMPTY,
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
		String pageType = StringUtils.EMPTY;
		if (currentPage.contains(ApplicationConstants.BREVILLE_PRODUCT_PAGE)) {
			pageType = ApplicationConstants.PDP;
		} else if (currentPage.contains(ApplicationConstants.PLP)) {
			pageType = "product:" + ApplicationConstants.PLP;
		}
		return pageType;
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
		log.debug("Inside buildExternalizerUrl(). resolver = {} and path = {} and resource= {}", resolver, path,
				resource);

		String externalLink = null;
		if (Objects.nonNull(multiconfigObject)) {
			log.debug("BaseModel externalizer key = {} " + this.externalizerKey);
			externalLink = externalizer.externalLink(resolver, this.externalizerKey, path);
		} else {
			log.debug("MultiRegionConfigurationFactory is NULL for resource= {} and path = {} ", resource, path);
		}

		return externalLink;
	}
}
