package com.breville.aem.brands.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
@ObjectClassDefinition(name = "\r\n" + 
		"MultiRegion Configuration Factory Service", description = "\r\n" + 
				"Multi Region Configuration Factory Service for site specific paths.")
public @interface MultiRegionConfigurationsFactory {

	@AttributeDefinition(name = "aws.api.url", description = "AWS API URL")
	String aws_api_url() default "";
	
	@AttributeDefinition(name = "brand", description = "Site Brand")
	String brand() default "";
	
	@AttributeDefinition(name = "login.url", description = "My Beanz Login URL")
	String login_url() default "";
	
	@AttributeDefinition(name = "checkout.page.path", description = "Beanz Checkout URL")
	String checkout_url() default "";

	@AttributeDefinition(name = "gmapKey", description = "Beanz Gmapkey")
	String gmapkey() default "";
	
	@AttributeDefinition(name = "signup.url.newsletter", description = "Beanz SignUpURL")
	String signup_url() default "";

	@AttributeDefinition(name = "newsLetter.salesforce.url", description = "Newsletter Salesforce URL")
	String newsletter_sf_url() default "";
	
	@AttributeDefinition(name = "notifyMe.salesforce.url", description = "NotifyMe Salesforce URL")
	String notifyme_sf_url() default "";
	
	@AttributeDefinition(name = "adyen.environment.type", description = "Adyen Environment Type")
	String adyen_environment_type() default "";
	
	@AttributeDefinition(name = "externalizer.key", description = "Benaz Externalizer Key")
	String externalizer_key() default "";
	
	@AttributeDefinition(name = "cart.product.limit", description = "Beanz Cart Product limit")
	String cart_product_limit() default "";
	
	@AttributeDefinition(name = "credit.card.encoded.value", description = "Beanz Credit Card encoded value")
	String credit_card_encoded_value() default "";
	
	@AttributeDefinition(name = "paypal.encoded.value", description = "Beanz Paypal encoded value")
	String paypal_encoded_value() default "";
	
	@AttributeDefinition(name = "google.predictive.address", description = "Beanz Google Predictive Address")
	String google_predictive_address() default "";
	
	@AttributeDefinition(name = "google.predictive.address.flag", description = "Beanz Google Predictive Address Flag")
	String predictive_address_flag() default "";
	
	@AttributeDefinition(name = "pdp.product.count", description = "Beanz PDP product count")
	String pdp_product_count() default "";
	
	@AttributeDefinition(name = "livechat.org.id", description = "Saleforce Live chat Org ID")
	String livechat_org_id() default "";

	@AttributeDefinition(name = "livechat.deployment.id", description = "Salesforce Live chat Deployment ID")
	String livechat_deployment_id() default "";
	
	@AttributeDefinition(name = "livechat.deployment.js", description = "Salesforce Live chat Deployment JS URL ")
	String livechat_deployment_js_url() default "";
	
	@AttributeDefinition(name = "livechat.js", description = "Salesforce Live chat JS URL")
	String livechat_js_url() default "";
	
	@AttributeDefinition(name = "livechat.button.id", description = "Salesforce Live chat button ID")
	String livechat_button_id() default "";
	
	@AttributeDefinition(name = "livechat.offline.form.url", description = "Salesforce Offline form URL")
	String livechat_offline_url() default "";
	
	@AttributeDefinition(name = "sitemap.lastmodEnabled", description = "Beanz Sitemap Flag")
	String sitemap_flag() default "";
	
	@AttributeDefinition(name = "country.currency.symbol", description = "Beanz Currency Symbol")
	String currency_symbol() default "";	

	@AttributeDefinition(name = "ctp.project.key", description = "Commercetools Project Key")
	String ctp_project_key() default "";
	
	@AttributeDefinition(name = "ctp.client.secret", description = "Commercetools Client Secret")
	String ctp_client_secret() default "";
	
	@AttributeDefinition(name = "ctp.client.id", description = "Commercetools Client ID")
	String ctp_client_id() default "";
	
	@AttributeDefinition(name = "ctp.auth.url", description = "Commercetools Auth URL")
	String ctp_auth_url() default "";
	
	@AttributeDefinition(name = "ctp.api.url", description = "Commercetools API URL")
	String ctp_api_url() default "";
	
	@AttributeDefinition(name = "ctp.scopes", description = "Commercetools Scope")
	String ctp_scopes() default "";
	
	@AttributeDefinition(name = "ctp.shipping.method.id", description = "Commercetools Shipping Method ID")
	String ctp_shipping_method_id() default "";
	
	@AttributeDefinition(name = "ctp.supply.channel.id", description = "Commercetools Supply Channel ID")
	String ctp_supply_channel_id() default "";
	
	@AttributeDefinition(name = "cart.url", description = "AEM Cart Page Path")
	String cart_url() default "";
	
	@AttributeDefinition(name = "grind.id", description = "AEM Grind Field ID")
	String grind_id() default "";
	
	@AttributeDefinition(name = "algolia_index_name", description = "Algolia Index Name")
	String algolia_index_name() default "";
	
	@AttributeDefinition(name = "algolia_app_id", description = "Algolia App Id")
	String algolia_app_id() default "";
	
	@AttributeDefinition(name = "algolia_search_api_key", description = "Algolia Search API key")
	String algolia_search_api_key() default "";
	
	@AttributeDefinition(name = "locale", description = "Locale")
	String locale() default "";
}
