package com.breville.aem.brands.core.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import com.breville.aem.brands.core.services.MultiRegionConfigurationsFactory;
import lombok.Getter;

/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
@Component(service = MultiRegionConfigurationsFactoryImpl.class, immediate = true)
@Designate(ocd = MultiRegionConfigurationsFactory.class, factory = false)
public class MultiRegionConfigurationsFactoryImpl {

	/**
	 * 
	 */

	@Getter
	private String awsApiURL;

	@Getter
	private String brand;

	@Getter
	private String loginURL;

	@Getter
	private String checkoutPagePath;

	@Getter
	private String gmapKey;

	@Getter
	private String signupURL;

	@Getter
	private String newsLetterSalesforceURL;

	@Getter
	private String notifyMeSalesforceURL;

	@Getter
	private String adyenEnvironmentType;

	@Getter
	private String externalizerKey;

	@Getter
	private String cartProductLimit;

	@Getter
	private String creditCardEncodedValue;

	@Getter
	private String paypalEncodedValue;

	@Getter
	private String googlePredictiveAddress;

	@Getter
	private String googlePredictiveAddressFlag;

	@Getter
	private String pdpProductCount;

	@Getter
	private String livechatOrgId;

	@Getter
	private String livechatDeploymentId;

	@Getter
	private String livechatDeploymentJS;

	@Getter
	private String livechatJS;

	@Getter
	private String livechatButtonID;

	@Getter
	private String livechatOfflineFormURL;

	@Getter
	private String sitemapFlag;

	@Getter
	private String currencySymbol;

	@Getter
	private String ctp_project_key;

	@Getter
	private String ctp_client_secret;

	@Getter
	private String ctp_client_id;

	@Getter
	private String ctp_auth_url;

	@Getter
	private String ctp_api_url;

	@Getter
	private String ctp_scopes;

	@Getter
	private String cart_url;

	@Getter
	private String ctp_shipping_method_id;
	
	@Getter
	private String ctp_grind_id;
	
	@Getter
	private String ctp_supply_channel_id;
	
	@Getter
	private String algolia_index_name;
	
	@Getter
	private String algolia_app_id;
	
	@Getter
	private String algolia_search_api_key;
	
	@Getter
	private String locale;

	@Activate
	@Modified
	protected void activate(final MultiRegionConfigurationsFactory config) {

		awsApiURL = config.aws_api_url();
		brand = config.brand();
		loginURL = config.login_url();
		checkoutPagePath = config.checkout_url();
		gmapKey = config.gmapkey();
		signupURL = config.signup_url();
		newsLetterSalesforceURL = config.newsletter_sf_url();
		notifyMeSalesforceURL = config.notifyme_sf_url();
		adyenEnvironmentType = config.adyen_environment_type();
		externalizerKey = config.externalizer_key();
		cartProductLimit = config.cart_product_limit();
		creditCardEncodedValue = config.credit_card_encoded_value();
		paypalEncodedValue = config.paypal_encoded_value();
		googlePredictiveAddress = config.google_predictive_address();
		googlePredictiveAddressFlag = config.predictive_address_flag();
		pdpProductCount = config.pdp_product_count();
		livechatOrgId = config.livechat_org_id();
		livechatDeploymentId = config.livechat_deployment_id();
		livechatDeploymentJS = config.livechat_deployment_js_url();
		livechatJS = config.livechat_js_url();
		livechatButtonID = config.livechat_button_id();
		livechatOfflineFormURL = config.livechat_offline_url();
		sitemapFlag = config.sitemap_flag();
		currencySymbol = config.currency_symbol();
		ctp_project_key = config.ctp_project_key();
		ctp_client_secret = config.ctp_client_secret();
		ctp_client_id = config.ctp_client_id();
		ctp_auth_url = config.ctp_api_url();
		ctp_api_url = config.ctp_api_url();
		ctp_scopes = config.ctp_scopes();
		cart_url = config.cart_url();
		ctp_shipping_method_id = config.ctp_shipping_method_id();
		ctp_grind_id = config.grind_id();
		ctp_supply_channel_id = config.ctp_supply_channel_id();
		algolia_index_name = config.algolia_index_name();
		algolia_app_id = config.algolia_app_id();
		algolia_search_api_key = config.algolia_search_api_key();
		locale = config.locale();
	}

	public String getCommercetoolsStorekey() {
		return brand;
	}

	public String getLoginURL() {
		return loginURL;
	}

	public String getCheckoutPagePath() {
		return checkoutPagePath;
	}

	public String getGmapKey() {
		return gmapKey;
	}

	public String getSignupURL() {
		return signupURL;
	}

	public String getNewsLetterSalesforceURL() {
		return newsLetterSalesforceURL;
	}

	public String getNotifyMeSalesforceURL() {
		return notifyMeSalesforceURL;
	}

	public String getAdyenEnvironmentType() {
		return adyenEnvironmentType;
	}

	public String getExternalizerKey() {
		return externalizerKey;
	}

	public String getCartProductLimit() {
		return cartProductLimit;
	}

	public String getCreditCardEncodedValue() {
		return creditCardEncodedValue;
	}

	public String getPaypalEncodedValue() {
		return paypalEncodedValue;
	}

	public String getGooglePredictiveAddress() {
		return googlePredictiveAddress;
	}

	public String getGooglePredictiveAddressFlag() {
		return googlePredictiveAddressFlag;
	}

	public String getPdpProductCount() {
		return pdpProductCount;
	}

	public String getLivechatOrgId() {
		return livechatOrgId;
	}

	public String getLivechatDeploymentId() {
		return livechatDeploymentId;
	}

	public String getLivechatDeploymentJS() {
		return livechatDeploymentJS;
	}

	public String getLivechatJS() {
		return livechatJS;
	}

	public String getLivechatButtonID() {
		return livechatButtonID;
	}

	public String getLivechatOfflineFormURL() {
		return livechatOfflineFormURL;
	}

	public String getSitemapFlag() {
		return sitemapFlag;
	}

	public String getCurrencySymbol() {
		return currencySymbol;
	}

	public String getAwsApiURL() {
		return awsApiURL;
	}

	public String getCtp_project_key() {
		return ctp_project_key;
	}

	public String getCtp_client_secret() {
		return ctp_client_secret;
	}

	public String getCtp_client_id() {
		return ctp_client_id;
	}

	public String getCtp_auth_url() {
		return ctp_auth_url;
	}

	public String getCtp_api_url() {
		return ctp_api_url;
	}

	public String getCtp_scopes() {
		return ctp_scopes;
	}

	public String getCart_url() {
		return cart_url;
	}

	public String getBrand() {
		return brand;
	}

	public String getCtp_shipping_method_id() {
		return ctp_shipping_method_id;
	}

	public String getCtp_grind_id() {
		return ctp_grind_id;
	}

	public String getCtp_supply_channel_id() {
		return ctp_supply_channel_id;
	}
	
	public String getAlgolia_index_name() {
		return algolia_index_name;
	}
	
	public String getAlgolia_app_id() {
		return algolia_app_id;
	}
	
	public String getAlgolia_search_api_key() {
		return algolia_search_api_key;
	}
	
	public String getLocale() {
		return locale;
	}

}