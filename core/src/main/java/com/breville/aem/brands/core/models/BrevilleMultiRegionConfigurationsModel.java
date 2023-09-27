package com.breville.aem.brands.core.models;

import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.services.BrevilleMultiRegionConfigurationsFactory;
import com.breville.aem.brands.core.services.SessionAccessor;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

/**
 * @author MAzhar
 *
 */
@Getter
@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BrevilleMultiRegionConfigurationsModel extends BaseModel {

	@Inject
	private BrevilleMultiRegionConfigurationsFactory multiconfigObject;

	
	private String locale;

	private String brand;

	private String webChannel;

	private String siteRootPath;

	private String currencySymbol;

	private String currentCountryCode;

	private String currentLanguageCode;
	
	/* BazaarVoice Configs*/
	
	/**
	 * BV environement value
	 */
	private String bvEnvironment;
	
	/**
	 * BV Site ID
	 */
	private String bvSiteid;
	
	/**
	 * BV Client Name
	 */
	private String bvClientname;
	
	/**
	 * BV Locale - locale value will be mofidied - ex: en-US to en_US
	 */
	private String bvLocale;

	/* BazaarVoice Configs ends*/


	/* Google recaptcha Configs starts*/
	private String recaptchaSecretKey;

	private String recaptchaSiteVerifyUrl;

	private String captchaSiteKey;
	/* Google recaptcha Configs ends*/

	/* salesforce live chat and notify Configs Starts*/
	private String liveChatOrgId;

	private String liveChatDeploymentId;

	private String liveChatDeploymentJs;

	private String liveChatJs;

	private String liveChatButtonId;

	private String liveChatOfflineFormURL;

	private String notifyMeSalesforceURL;
	
	private String notifyMeEnabled;
	/* salesforce live chat and notify Configs ends*/
	
	private String currencyCode;
	
	/* Algolia Configurations Starts */
	
	private String algoliaAppId;

	private String algoliaApiKey;

	private String algoliaBrevilleIndex;
	
	private String algoliaBeanzIndex;
	
	/* Algolia Configurations ends */


	/* Mulberry & Adyen properties starts*/

	private String mulberryPublicToken;

	private String mulberryCoverageKey;

	private String mulberryJsUrl;

	private String mulberryEnvironment;

	private String adyenClientKey;

	/* Mulberry & Adyen properties ends*/
	
	private String awsCtApiUrl;
	
	
	/* Affirm properties starts*/
	private String affirmPublicKey;
	
	private String affirmScriptUrl;
	
	private String isAffirmEnabled;
	/* Affirm properties ends*/

	/* Affirm properties starts*/
	private String auth0Domain;

	private String auth0ClientId;

	private String auth0Audience;

	private String auth0ApiDomain;
	/* Affirm properties ends*/
	
	private String purchagePagePath;
	
	private String machineSelPagepath;


	/** The session accessor. */
	@Inject
	private SessionAccessor sessionAccessor;


	@PostConstruct
	protected void setup() {
		try {
			log.info("BrevilleMultiRegionConfigurationsModel start :: {}");
			resourceResolver = sessionAccessor
					.getServiceResourceResolver(ApplicationConstants.SubService.BREVILLESERVICE);
			if (null != resourceResolver) {
				if (Objects.nonNull(multiconfigObject)) {
					final Resource currentPageResource = currentPage.getContentResource();
					if (Objects.nonNull(currentPageResource)) {
						this.locale = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.LOCALE_ATTR);
						this.currentCountryCode = getCountryCodeFromLocaleStr(this.locale).toLowerCase();
						this.currentLanguageCode = getLanguageCodeFromLocaleStr(this.locale);
						this.brand = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.BRAND_ATTR);
						this.webChannel = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.WEB_CHANNEL);
						this.siteRootPath = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.SITE_ROOT_PATH);
						this.currencySymbol = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.CURRENCY_SYMBOL);
						this.bvEnvironment = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.BV_ENVIRONMENT);
						this.bvSiteid = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.BV_SITEID);
						this.bvClientname = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.BV_CLIENTNAME);
						this.bvLocale = this.locale.replace("-", "_");
						this.recaptchaSecretKey = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.RECAPTCHA_SECRET_KEY);
						this.recaptchaSiteVerifyUrl = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.RECAPTCHA_SITE_VERIFY_URL);
						this.captchaSiteKey = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.CAPTCHA_SITE_KEY);
						this.liveChatOrgId = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.LIVECHAT_ORG_ID);
						this.liveChatDeploymentId = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.LIVECHAT_DEPLOYMENT_ID);
						this.liveChatDeploymentJs = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.LIVECHAT_DEPLOYMENT_JS);
						this.liveChatJs = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.LIVECHAT_JS);
						this.liveChatButtonId = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.LIVECHAT_BUTTON_ID);
						this.liveChatOfflineFormURL = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.LIVECHAT_OFFLINE_FORM_URL);
						this.notifyMeSalesforceURL = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.NOTIFYME_SALESFORCE_URL);
						this.currencyCode = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.CURRENCY_CODE);
						
						this.algoliaAppId = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.ALGOLIA_APP_ID);
						this.algoliaApiKey = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.ALGOLIA_API_KEY);
						this.algoliaBrevilleIndex = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.ALGOLIA_INDEX_NAME);
						this.algoliaBeanzIndex = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.ALGOLIA_BEANZ_INDEX_NAME);

						this.mulberryPublicToken = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.MULBERRY_PUBLIC_TOKEN);
						this.mulberryCoverageKey = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.MULBERRY_COVERAGE_KEY);
						this.mulberryJsUrl = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.MULBERRY_JS_URL);
						this.mulberryEnvironment = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.MULBERRY_ENVIRONMENT);
						this.adyenClientKey = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.ADYEN_CLIENT_KEY);
						
						this.awsCtApiUrl = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AWS_API_URL);
						
						this.affirmPublicKey = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AFFIRM_PUBLIC_KEY);
						this.affirmScriptUrl = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AFFIRM_SCRIPT_URL);
						this.isAffirmEnabled = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AFFIRM_ENABLED);
						this.auth0Domain = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AUTHO_DOMAIN);
						this.auth0ClientId = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AUTHO_CLIENT_ID);
						this.auth0Audience = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AUTHO_AUDIENCE);
						this.auth0ApiDomain = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.AUTHO_API_DOMAIN);
						
						this.notifyMeEnabled = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.NOTIFYME_ENABLE);
						
						this.purchagePagePath = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.CART_PAGE_PATH)+ApplicationConstants.HTML_EXTENSION;		
						
						this.machineSelPagepath = multiconfigObject.getSiteSpecificProperty(currentPageResource,
								ApplicationConstants.MACHINE_SELECT_PATH)+ApplicationConstants.HTML_EXTENSION;
					}

				}
			}
		} catch (Exception e) {
			log.error(" Error while BrevilleMultiRegionConfigurationsModel.{} ", e);
		}
	}
}