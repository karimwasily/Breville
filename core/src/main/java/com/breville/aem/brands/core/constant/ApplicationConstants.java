package com.breville.aem.brands.core.constant;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * 
 * @author Yogiraj.Mahajan
 * 
 *  This class contains all global variables which are used across the application.
 */
public final class ApplicationConstants {

	public static final String FILE_REFERENCE = "fileReference";

	public static final String JCR_TITLE = "jcr:title";

	public static final String LINK_URL = "linkURL";

	public static final String HTML_EXTENSION = ".html";

	public static final String HASH = "#";

	public static final String SLASH = "/";

	public static final String JCR_CONTENT_ROOT = "/jcr:content/root";

	public static final String PRODUCT_SWATCH_IMG_PREFIX = "/content/dam/breville-brands/global/swatch";

	private static final int TIMEOUT_CONSTANT = 10000;

	public static final String BREVILLE_BRAND = "breville";
	
	public static final String COFFEEHUB_BRAND = "coffee-hub";

	public static final String BRAND_ATTR = "brand";

	public static final String DEFAULT_LOCALE = "en-US";

	public static final String LOCALE_ATTR = "locale";
	
	public static final String ROBOTS_META_TAG = "robotsMetaTag";
	
	public static final String WEB_CHANNEL = "web.channel";
	
	public static final String SITE_ROOT_PATH = "site.root.path";
	
	public static final String CURRENCY_SYMBOL ="currency.symbol";

	public static final String WEB_TS_COLOUR_ATTR = "WEB_TS_COLOUR";
	
	public static final String WEB_TS_ACCESSORIES_ATTR = "WEB_TS_ACCESSORIES";
	
	public static final String WEB_TS_CONSTRUCMAT_ATTR = "WEB_TS_CONSTRUCMAT";
	
	public static final String WEB_TS_SETTINGS_ATTR = "WEB_TS_SETTINGS";
	
	public static final String WEB_TS_CAPACITY_ATTR = "WEB_TS_CAPACITY";
	
	public static final String WEB_TS_DIMENSIONS_ATTR = "WEB_TS_DIMENSIONS";
	
	public static final String WEB_TS_POWER_ATTR = "WEB_TS_POWER";
	
	public static final String WEB_TS_VOLTAGE_ATTR = "WEB_TS_VOLTAGE";
	
	public static final String WEB_TS_WARRANTY_ATTR = "WEB_TS_WARRANTY";

	public static final String PRODUCT_CALLOUTS_ATTR = "productCallouts";

	public static final String BEAN_PATH = "/beans/our-roasters/";

	public static final String OUR_ROASTERS = "/our-roasters/";
	
	public static final String WEB_STATUS = "WEB_STATUS";
	
	public static final String COLOUR_TRANSLATION_ATTR = "COLOUR_TRANSLATION";

	/** The Constant AWS_API_URL. */
	public static final String AWS_API_URL = "aws.api.url";

	/** The Constant ONE. */
	public static final int ONE = 1;

	/** The Constant TWO. */
	public static final int TWO = 2;

	/** The Constant THREE. */
	public static final int THREE = 3;

	/** The Constant FOUR. */
	public static final int FOUR = 4;

	/** The html extension. */
	public static final String HTML_WITH_EXTENSION = ".html";

	/** The Constant SITE_PROTOCOL. */
	public static final String EXTERNALIZER_KEY = "externalizer.key";

	public static final String ROASTER = "roaster";

	public static final String BEANZ = "Beanz";

	/** The Constant PDP. */
	public static final String PDP = "pdp";
	
	/** The Constant PDP. */
	public static final String PLP = "plp";
	
	/** The Constant PDP. */
	public static final String BREVILLE_PRODUCT_PAGE = "product-page";

	/** The Constant PDP. */
	public static final String SLASH_CONTENT = "/content";
	
    /** The Constant IMAGE_PNG. */
    public static final String IMAGE_PNG = ".png";
	
    /** The Constant IMAGE_JPG. */
    public static final String IMAGE_JPG = "jpg";

    /** The Constant IMAGE_GIF. */
    public static final String IMAGE_GIF = "gif";

    /** The Constant IMAGE_BMP. */
    public static final String IMAGE_BMP = "bmp";

    /** The Constant IMAGE_TIF. */
    public static final String IMAGE_TIF = "tif";

    /** The Constant IMAGE_VCF. */
    public static final String IMAGE_VCF = "vcf";

    /** The Constant IMAGE_JPEG. */
    public static final String IMAGE_JPEG = "jpeg";
    
    /** The Constant HTTP. */
    public static final String HTTP = "http://";

    /** The Constant HTTPS. */
    public static final String HTTPS = "https://";
    
    public static final String CONTENT_PATH = "/content/";
    
    /** The Constant CONTENT_DAM_PATH. */
    public static final String CONTENT_DAM_PATH = "/content/dam";
    
    /** The Constant FORWARD_SLASH_CHAR. */
    public static final char FORWARD_SLASH_CHAR = '/';
    
    /** The http. */
    public static final String HTTP_TXT = "http";
    
    public static final String BREVILLE_ROOT_PATH = "/content/breville";
    
    public static final String LANGUAGE_MASTERS_NODE = "language-masters";
    
    public static final String JCR_CONTENT = "jcr:content";
    
    /* Beanz Roaster Vendor detail Page Properties */
    public static final String ROASTER_ID = "roasterId";
    
    public static final String ROASTER_NAME = "roasterName";
    
    public static final String ROASTER_RIGHTIMG = "rightImage";
    
    public static final String ROASTER_RIGHTIMG_ALT = "rightImageAltTxt";
    
    public static final String ROASTER_DESC = "roasterDescription";
    
    public static final String ROASTER_LOCATION = "roasterLocation";

	public static final String ROASTER_ADDRESS = "roasterAddressLine";
    
    public static final String ROASTER_STATE = "roasterState";
    
    public static final String ROASTER_CITY = "roasterCity";
    
    public static final String ROASTER_POSTCODE = "roasterPostCode";
    
    public static final String ROASTER_BRANDIMG = "brandImage";
    
    public static final String ROASTER_BRANDIMG_ALT = "brandImageAltTxt";
    
    public static final String ROASTER_THUMBNAILIMG = "thumbnailImage";
    
    public static final String ROASTER_THUMBNAILIMG_ALT = "thumbnailImageAltTxt";
    
    public static final String ID = "id";
    
    public static final String TITLE = "title";
    
    public static final String SECONDARY_IMG = "secondaryImg";
    
    public static final String SECONDARY_IMG_ALT = "secondaryImgAlt";
    
    public static final String PRIMARY_IMG = "primaryImg";
    
    public static final String PRIMARY_IMG_ALT = "primaryImgAlt";
    
    public static final String LOCATION = "location";
    
    public static final String BRAND_IMG = "brandImg";
    
    public static final String DESCRIPTION = "description";
    
    public static final String BRAND_IMG_ALT = "brandImgAlt";
    
    /* Beanz Roaster Vendor detail Page Properties end */
    /** The Constant COUNTRY_LANGUAGE_CODE. */
    public static final String COUNTRY_LANGUAGE_CODE = "/countryLanguageCode";
    
    /** The Constant REGION_LANGUAGE_CODE. */
    public static final String REGION_LANGUAGE_CODE = "/regionLanguageCode";

    /** The Constant DEFAULT. */
    public static final String DEFAULT = "Default:";

    /** The Constant COLON. */
    public static final String COLON = ":";
    
    /** The Constant CQ_COLO_PAGE. */
    public static final String CQ_COLO_PAGE = "cq:Page";
    
    /** The Constant TRUE. */
    public static final String TRUE = "true";
    
    /** The Constant SEMI_COLON. */
    public static final String SEMI_COLON = ";";
    
    /** The Constant ROOTPATH. */
    public static final String GENERICLIST_ROOTPATH = "/etc/acs-commons/lists/breville-brands/";

	public static final CharSequence DOT_SVG = ".svg";
	
	public static final CharSequence DOT = ".";

	public static final String BV_ENVIRONMENT = "bv.environment";

	public static final String BV_SITEID = "bv.siteid";

	public static final String BV_CLIENTNAME = "bv.clientname";

	public static final String RECAPTCHA_SECRET_KEY = "recaptcha.secret.key";

	public static final String RECAPTCHA_SITE_VERIFY_URL = "recaptcha.site.verify.url";

	public static final String CAPTCHA_SITE_KEY = "captcha.site.key";

	public static final String LIVECHAT_ORG_ID = "livechat.org.id";

	public static final String LIVECHAT_DEPLOYMENT_ID = "livechat.deployment.id";

	public static final String LIVECHAT_DEPLOYMENT_JS = "livechat.deployment.js";

	public static final String LIVECHAT_JS = "livechat.js";

	public static final String LIVECHAT_BUTTON_ID = "livechat.button.id";

	public static final String LIVECHAT_OFFLINE_FORM_URL = "livechat.offline.form.url";

	public static final String NOTIFYME_SALESFORCE_URL = "notifyme.salesforce.url";
	
	public static final String NOTIFYME_ENABLE = "notifyme.enable";

	public static final String CURRENCY_CODE = "currency.code";

	public static final String ALGOLIA_APP_ID = "algolia.app.id";

	public static final String ALGOLIA_API_KEY = "algolia.search.api.key";

	public static final String ALGOLIA_INDEX_NAME = "algolia.index.name"; 

	public static final String ALGOLIA_BEANZ_INDEX_NAME = "algolia.beanz.index.name";

	public static final String SITES_AND_COUNTRIES = "siteAndCountries";

	public static final String SHIPPING_COUNTRIES_LIST = "shippingCountriesList";

	public static final String MULBERRY_PUBLIC_TOKEN = "mulberry.public.token";

	public static final String MULBERRY_COVERAGE_KEY = "mulberry.coverage.key";

	public static final String MULBERRY_JS_URL = "mulberry.js.url";

	public static final String MULBERRY_ENVIRONMENT = "mulberry.environment";

	public static final String ADYEN_CLIENT_KEY = "adyen.client.key";
	
	public static final String AFFIRM_PUBLIC_KEY = "affirm.public.key";

	public static final String AFFIRM_SCRIPT_URL = "affirm.script.url";

	public static final String AFFIRM_ENABLED = "affirm.enable";

	public static final String AUTHO_DOMAIN = "auth0.domain";

	public static final String AUTHO_CLIENT_ID = "auth0.client.id";

	public static final String AUTHO_AUDIENCE = "auth0.audience";

	public static final String AUTHO_API_DOMAIN = "auth0.api.domain";
	
	public static final String CART_PAGE_PATH = "cart.url";	
	public static final String MACHINE_SELECT_PATH = "machine.selector.url";
	
	/**
	 * 
	 * @param requestData
	 * @param post
	 * @throws UnsupportedEncodingException
	 */
	public static final void createBodyForRequest(JsonNode requestData, final HttpPost post)
			throws UnsupportedEncodingException {
		final StringEntity body = new StringEntity(requestData.toString());
		post.addHeader("content-type", "application/json");
		post.setEntity(body);
	}

	/**
	 * 
	 * @param formRequest
	 * @return
	 * @throws IOException
	 */
	public static HttpResponse postHttpClientConnection(HttpPost formRequest) throws IOException {

		// set Connection timeout.
		final RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(TIMEOUT_CONSTANT).build();
		// create Http connection
		final HttpClient httpClient = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();
		return httpClient.execute(formRequest);
	}

	public enum SubService {
		/**
		 * Variable for brevilleservice.
		 */
		BREVILLESERVICE("brevilleservice");

		/**
		 * value of the bound type.
		 */
		private String value;

		/**
		 * Instantiates a new sub service.
		 *
		 * @param value the value
		 */
		SubService(final String value) {
			this.value = value;
		}

		/**
		 * Gets the value.
		 *
		 * @return the value
		 */
		public String getValue() {
			return value;
		}
	}

}
