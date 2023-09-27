/**
 * 
 */
package com.breville.aem.brands.core.models;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class}, resourceType = "breville-brands/components/beanz/beanzRelatedProducts", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BeanzRelatedProducts {

	private static final Logger LOGGER = LoggerFactory.getLogger(BeanzRelatedProducts.class);
	@SlingObject
	private SlingHttpServletRequest request;

	@Inject
	@Via("request")
	protected Resource resource;
	
	@Inject
	@Self
	private AlgoliaConfig algoliaConfig;
	
	@Inject
	@Via("resource")
	private String relatedProductsHeading;
	
	@Inject
	@Via("resource")
	private String buyNowBtn;
	
	@Inject
	@Via("resource")
	@Named("subscriptionMsg")
	private String subscriptionMsg;
	
	@Inject
	@Via("resource")
	@Named("vendorName")
	private String vendorName;
	
	@Inject
	private Map<String,String> facets = new HashMap<>(); 
	
	@Inject
    private String algoliaIndexName;
    
    @Inject
    private String algoliaAppId;
    
    @Inject
    private String algoliaSearchApiKey;
	
	
	@Inject
	@Self
	private BeanzProduct beanzProductData;
	
	@Inject
	private String beanzSkuId;

	@Inject
	@Via("resource")
	@Named("productPagePath")
    private String productPagePath;

	@PostConstruct
	public void initModel() {
		try {

			if (!StringUtils.isEmpty(vendorName)) {
				facets.put("Our_Roasters", vendorName);
			} else {

				if (beanzProductData != null) {
					beanzSkuId = beanzProductData.getBeanzSkuId();
					String espresso = beanzProductData.getBrewMethodVal();
					String roastLevel = beanzProductData.getRoastLevel();
					String flavourNotes = beanzProductData.getFlavourCategory();
					String decaf = beanzProductData.getDecafVal();
					String vendor = beanzProductData.getVendorName();
					String webType = beanzProductData.getWebType();
					if (!StringUtils.isEmpty(espresso) && !espresso.contains(",")) {
						facets.put("Brew_method", espresso);
					}
					if (!StringUtils.isEmpty(flavourNotes)) {
						facets.put("Coffee_Flavors", flavourNotes);
					}
					if (!StringUtils.isEmpty(roastLevel)) {
						facets.put("The_Roast", roastLevel);
					}
					if (!StringUtils.isEmpty(decaf)) {
						facets.put("Looking_for_Decaf", decaf);
					}
					if (!StringUtils.isEmpty(vendor)) {
						facets.put("Our_Roasters", "-"+vendor);
					}
					if (!StringUtils.isEmpty(webType)) {
						facets.put("Blend_or_Single_Origin", webType);
					}
					facets.put("objectID", "-"+beanzSkuId);
				}
			}
			setAlgoliaConfigs();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
	}
	
	private void setAlgoliaConfigs() {
		if(algoliaConfig != null) {
    		algoliaIndexName = algoliaConfig.getAlgolia_index_name();
    		algoliaAppId = algoliaConfig.getAlgolia_app_id();
    		algoliaSearchApiKey = algoliaConfig.getAlgolia_search_api_key();
    	}
	}

	public String getRelatedProductsHeading() {
		return relatedProductsHeading;
	}
	public String getBuyNowBtn() {
		return buyNowBtn;
	}
	public String getSubscriptionMsg() {
		return subscriptionMsg;
	}
	public Map<String, String> getFacets() {
		return facets;
	}
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
	
	public String getAlgoliaIndexName() {
    	return algoliaIndexName;
    }
    
    public String getAlgoliaAppId() {
    	return algoliaAppId;
    }
    
    public String getAlgoliaSearchApiKey() {
    	return algoliaSearchApiKey;
    }
    
    public String getBeanzSkuId() {
    	return beanzSkuId;
    }

	public String getVendorName() {
		return vendorName;
	}
    
    public String getProductPagePath() {
    	return productPagePath;
    }
}