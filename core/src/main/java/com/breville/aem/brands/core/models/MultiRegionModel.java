package com.breville.aem.brands.core.models;

import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.services.SessionAccessor;
import com.breville.aem.brands.core.services.impl.MultiRegionConfigurationsFactoryImpl;

import lombok.Getter;

@Model(adaptables = Resource.class , resourceType = "breville-brands/components/page", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MultiRegionModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(MultiRegionModel.class);
	
	/**
	 * The resource.
	 */
	@Self
	private Resource resource;

	/**
	 * The multiRegionConfig factory object instance.
	 */
	@Inject
	private MultiRegionConfigurationsFactoryImpl multiRegionConfig;

	@SlingObject
	private SlingHttpServletRequest request;
	
	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	/** The session accessor. */
	@Reference
	private SessionAccessor sessionAccessor;

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
	private String ctp_shippment_method_id;
	
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
	
	@PostConstruct
	protected void init() {
		if (Objects.nonNull(multiRegionConfig)) {
			
			awsApiURL = multiRegionConfig.getAwsApiURL();
			brand = multiRegionConfig.getCommercetoolsStorekey();
			loginURL = multiRegionConfig.getLoginURL();
			checkoutPagePath = multiRegionConfig.getCheckoutPagePath();
			gmapKey = multiRegionConfig.getGmapKey();
			signupURL = multiRegionConfig.getSignupURL();
			newsLetterSalesforceURL = multiRegionConfig.getNewsLetterSalesforceURL();
			notifyMeSalesforceURL = multiRegionConfig.getNotifyMeSalesforceURL();
			adyenEnvironmentType = multiRegionConfig.getAdyenEnvironmentType();
			externalizerKey = multiRegionConfig.getExternalizerKey();
			cartProductLimit = multiRegionConfig.getCartProductLimit();
			creditCardEncodedValue = multiRegionConfig.getCreditCardEncodedValue();
			paypalEncodedValue = multiRegionConfig.getPaypalEncodedValue();
			googlePredictiveAddress = multiRegionConfig.getGooglePredictiveAddress();
			googlePredictiveAddressFlag = multiRegionConfig.getGooglePredictiveAddressFlag();
			pdpProductCount = multiRegionConfig.getPdpProductCount();
			livechatOrgId = multiRegionConfig.getLivechatOrgId();
			livechatDeploymentId = multiRegionConfig.getLivechatDeploymentId();
			livechatDeploymentJS = multiRegionConfig.getLivechatDeploymentJS();
			livechatJS = multiRegionConfig.getLivechatJS();
			livechatButtonID = multiRegionConfig.getLivechatButtonID();
			livechatOfflineFormURL = multiRegionConfig.getLivechatOfflineFormURL();
			sitemapFlag = multiRegionConfig.getSitemapFlag();
			currencySymbol = multiRegionConfig.getCurrencySymbol();
			ctp_project_key = multiRegionConfig.getCtp_project_key();
			ctp_client_secret = multiRegionConfig.getCtp_client_secret();
			ctp_client_id = multiRegionConfig.getCtp_client_id();
			ctp_auth_url = multiRegionConfig.getCtp_auth_url();
			ctp_api_url = multiRegionConfig.getCtp_api_url();
			ctp_scopes = multiRegionConfig.getCtp_scopes();
			cart_url = multiRegionConfig.getCart_url();
			ctp_shippment_method_id = multiRegionConfig.getCtp_shipping_method_id();
			ctp_grind_id = multiRegionConfig.getCtp_grind_id();
			ctp_supply_channel_id = multiRegionConfig.getCtp_supply_channel_id();
			algolia_index_name = multiRegionConfig.getAlgolia_index_name();
			algolia_app_id = multiRegionConfig.getAlgolia_app_id();
			algolia_search_api_key = multiRegionConfig.getAlgolia_search_api_key();
			
		}else {
			LOGGER.error("MultiRegionConfigurationFactory is null");
		}
		
	}

	
}
