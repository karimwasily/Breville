/**
 * 
 */
package com.breville.aem.brands.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BeanzSearch {

	private static final Logger LOGGER = LoggerFactory.getLogger(BeanzSearch.class);

	@Inject
	protected Resource resource;
	
	@Inject
	@Self
	private AlgoliaConfig algoliaConfig;
	
	@Inject
	private String popularSearches;
	
	@Inject
	private String popularCoffees;
	
	@Inject
	private String categoriesLbl;
	
	@Inject
	private String roastersLbl;
	
	@Inject
	private String coffeesLbl;

	@Inject
	private String allCoffeesLbl;

	@Inject
	private String productPagePath;

	@Inject
	private String plpPagePath;

	@Inject
	private String roasterPagePath;
	
	@Inject
    private String algoliaIndexName;
    
    @Inject
    private String algoliaAppId;
    
    @Inject
    private String algoliaSearchApiKey;
    
    @PostConstruct
	public void initModel() {
		try {
			if(algoliaConfig != null) {
	    		algoliaIndexName = algoliaConfig.getAlgolia_index_name();
	    		algoliaAppId = algoliaConfig.getAlgolia_app_id();
	    		algoliaSearchApiKey = algoliaConfig.getAlgolia_search_api_key();
	    	}
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
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
    
    public String getPopularSearches() {
    	return popularSearches;
    }
    
    public String getPopularCoffees() {
    	return popularCoffees;
    }
    
    public String getCategoriesLbl() {
    	return categoriesLbl;
    }
    
    public String getRoastersLbl() {
    	return roastersLbl;
    }
    
    public String getCoffeesLbl() {
    	return coffeesLbl;
    }

	public String getAllCoffeesLbl() {
    	return allCoffeesLbl;
    }
	
	public String getProductPagePath() {
    	return productPagePath;
    }

	public String getPlpPagePath() {
    	return plpPagePath;
    }
	
	public String getRoasterPagePath() {
    	return roasterPagePath;
    }
	
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
}