package com.breville.aem.brands.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * @author PradeepMC
 *
 */
@ObjectClassDefinition(name = "Breville MultiRegion Configuration Factory Service", description = "\r\n" + 
				"Breville Multi Region Configuration Factory Service for site specific paths.")
public @interface BrevilleMultiRegionConfigurationsObject {

	@AttributeDefinition(name = "aws.api.url", description = "AWS API URL")
	String aws_api_url() default "";
	
	@AttributeDefinition(name = "brand", description = "Site Brand")
	String brand() default "breville";	
	
	@AttributeDefinition(name = "site.root.path", description = "Site Root Path")
	String site_root_path() default "DEFAULT";	
	
	@AttributeDefinition(name = "locale", description = "Site Locale")
	String locale() default "en-US";	
	
	@AttributeDefinition(name = "Web Channel Name", description = "CT web channel - ex: US - breville-web-us")
	String web_channel() default "breville-web-us";	
	
	@AttributeDefinition(name = "externalizer.key", description = "Breville Externalizer Key")
	String externalizer_key() default "";
	
	@AttributeDefinition(name = "country.currency.symbol", description = "Breville Currency Symbol")
	String currency_symbol() default "$";	
	
	@AttributeDefinition(name = "Currency Code", description = "Country/Region Currency Code")
	String currency_code() default "USD";
	
	@AttributeDefinition(name = "cart.url", description = "AEM Cart Page Path")
	String cart_url() default "";
	
	@AttributeDefinition(name = "Machine Selector Url", description = "Bundle Journey Page")
	String machine_selector_url() default "";
	
	@AttributeDefinition(name = "algolia.index.name", description = "Algolia Index Name")
	String algolia_index_name() default "";
	
	@AttributeDefinition(name = "algolia.app.id", description = "Algolia App Id")
	String algolia_app_id() default "";
	
	@AttributeDefinition(name = "algolia.search.api.key", description = "Algolia Search API key")
	String algolia_search_api_key() default "";
	
	@AttributeDefinition(name = "algolia.beanz.index.name", description = "Algolia Beanz Index Name")
	String algolia_beanz_index_name() default "";
	
	@AttributeDefinition(name = "BV ClientName", description = "BV Client Name, ex: brevilleus for US")
	String bv_clientname() default "";

	@AttributeDefinition(name = "BV SiteID", description = "BV site id,ex: main_site")
	String bv_siteid() default "main_site";

	@AttributeDefinition(name = "BV Environment", description = "BV Environemnt stagging/production")
	String bv_environment() default "dev";

	@AttributeDefinition(name = "Recaptcha secret key", description = "Recaptcha Secret Key")
	String recaptcha_secret_key() default "6Le66UMUAAAAACXg1GRx2cCaxMQGOUVbhPMtOTJS";

	@AttributeDefinition(name = "Recaptcha site verify url", description = "Recaptcha Site Verify Url")
	String recaptcha_site_verify_url() default "https://www.google.com/recaptcha/api/siteverify";

	@AttributeDefinition(name = "Captcha site key", description = "The site key is used to invoke reCAPTCHA service on your site.")
	String captcha_site_key() default "6Le66UMUAAAAAIioFFNz914RvaoUExvyYSHMQaF6";

	@AttributeDefinition(name = "LiveChat Org Id", description = "LiveChat organisation id which is used to initiate livechat component")
	String livechat_org_id() default "00D29000000D6Q4";

	@AttributeDefinition(name = "LiveChat Deployment Id", description = "LiveChat deployment id which is used to initiate livechat component")
	String livechat_deployment_id() default "572290000008OR7";

	@AttributeDefinition(name = "LiveChat Deployment Js", description = "LiveChat deployment js which is used to initiate livechat component")
	String livechat_deployment_js() default "https://d.la4-c1cs-phx.salesforceliveagent.com/chat";

	@AttributeDefinition(name = "LiveChat Js", description = "LiveChat js is used to initiate livechat component")
	String livechat_js() default "https://c.la4-c1cs-phx.salesforceliveagent.com/content/g/js/42.0/deployment.js";

	@AttributeDefinition(name = "LiveChat Button Id", description = "LiveChat button id which is used to initiate livechat component")
	String livechat_button_id() default "573290000008OOh";

	@AttributeDefinition(name = "LiveChat Offline Form URL", description = "LiveChat offline form url which is used to initiate livechat component")
	String livechat_offline_form_url() default "https://psldevint-brevilleusa.cs19.force.com/reg/LiveChatPreChatOffline?language=en_US&param=US";

	@AttributeDefinition(name = "NotifyMe Salesforce URL", description = "SIGNUP URL NOTIFYME")
	String notifyme_salesforce_url() default "https://psldevint-brevilleusa.cs19.force.com/eComm/services/apexrest/NotifyMe";
	
	@AttributeDefinition(name = "NotifyMe Enable", description = "NotifyMe enable/disable - true/false")
	String notifyme_enable() default "true";

	@AttributeDefinition(name = "Mulberry Public Token", description = "Public token for mulberry")
	String mulberry_public_token() default "es_7fl3Tk2C20l3pPuOZaT40mds";

	@AttributeDefinition(name = "Mulberry Coverage Key", description = "Mulberry Coverage Key")
	String mulberry_coverage_key() default "3ad613a5";

	@AttributeDefinition(name = "Mulberry Js Url", description = "URL for Mulberry javascript")
	String mulberry_js_url() default "https://staging.getmulberry.com/plugin/static/js/mulberry.js";

	@AttributeDefinition(name = "Mulberry Environment", description = "Mulberry Environment")
	String mulberry_environment() default "test";

	@AttributeDefinition(name = "Adyen Client Key", description = "Adyen Clientkey")
	String adyen_client_key() default "test_HYU6BYDF4BCZ3PUGTSO77MTXQUY67KG6";
	
	@AttributeDefinition(name = "Affirm Public key Key", description = "Affirm Public Key")
	String affirm_public_key() default "6XJBXTM9UN59SUAC";
	
	@AttributeDefinition(name = "Affirm Script Url", description = "Affirm Script Url")
	String affirm_script_url() default "https://cdn1-sandbox.affirm.com/js/v2/affirm.js";
	
	@AttributeDefinition(name = "Affirm Script Url", description = "Affirm Script Url")
	String affirm_enable() default "true";

	@AttributeDefinition(name = "Auth0 Config", description = "Auth0 Config")
	String auth0_domain() default "iden-dev.us.auth0.com";

	@AttributeDefinition(name = "Auth0 Config", description = "Auth0 Config")
	String auth0_client_id() default "uHPMqwBWWYIdRlNwM5uqBCsQqKEsNj3H";

	@AttributeDefinition(name = "Auth0 Config", description = "Auth0 Config")
	String auth0_audience() default "https://iden-dev.us.auth0.com/api/v2/";

	@AttributeDefinition(name = "Auth0 Config", description = "Auth0 Config")
	String auth0_api_domain() default "https://iden-dev.us.auth0.com";
}
