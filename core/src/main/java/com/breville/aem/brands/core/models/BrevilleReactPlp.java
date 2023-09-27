/**
 * 
 */
package com.breville.aem.brands.core.models;

import java.util.List;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.io.FilenameUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.breville.aem.brands.core.pojo.CategoryRoundTiles;
import com.breville.aem.brands.core.utils.JsonUtil;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

/**
 * @author PradeepMC
 *
 */
@Slf4j
@Model(adaptables = {SlingHttpServletRequest.class,Resource.class}, resourceType = "breville-brands/components/reactPlp", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BrevilleReactPlp {
	
	@Self
	private SlingHttpServletRequest request;

	@Inject
	protected Resource resource;

	@Getter
	private String category;
	
	@Getter
	private String urlCategory;
	
	/**
	 * Round tiles' category
	 */
	@Getter
	@Inject
	@Via("resource")
	@Named("roundTilesCategory")
	@JsonIgnore
	private String roundTilesCategory;
	
	/**
	 * Mapping attirbute in algolia index
	 */
	@Getter
	@Inject
	@Via("resource")
	@Named("algoliaAttrMap")
	@JsonIgnore
	private String algoliaAttrMap;
	
    /**
     * Stores tiles information
     */
    @Inject
    @Getter
    @Via("resource")
    @Named("tiles")
    @JsonIgnore
    private List<Tiles> tiles;
    
    /**
     * Stores the Category Round tiles information
     */
    @Getter
    private CategoryRoundTiles roundTiles;
	
	/**
	 * Product page authoring for Beanz
	 */
	@Inject
	@Via("resource")
	@Named("productPagePath")
	@Getter
	private String productPagePath;
	
	@Inject
	@JsonIgnore
	private Page currentPage;
	
	@Getter
	private String categoryTitle;
	
	/**
	 * Algolia facet with value for pre load for change coffee
	 */
	@Inject
	@Via("resource")
	@Named("algoliaTerm")
	@Getter
	private String algoliaTerm;
	
	@Inject
	@Via("resource")
	@Self
	private AlgoliaConfig algoliaConfig;
	
	@Inject
	@Via("resource")
    private String algoliaIndexName;
    
    @Inject
    @Via("resource")
    private String algoliaAppId;
    
    @Inject
    @Via("resource")
    private String algoliaSearchApiKey;
    
	@PostConstruct
	public void initModel() {
		
		urlCategory = FilenameUtils.getBaseName(request.getRequestURL().toString());
		log.debug("category page: baseName : {}",urlCategory);

		if (Objects.nonNull(urlCategory)) {
			category = urlCategory.replace("-", "");
		}		
		
		categoryTitle = currentPage.getNavigationTitle();
		
		log.debug("algoliaAttrMap = {}, roundTilesCategory = {},  categoryRoundTiles = {}",algoliaAttrMap,roundTilesCategory,tiles);
		//populate object only if content authored for category tiles
		if (Objects.nonNull(algoliaAttrMap) && Objects.nonNull(roundTilesCategory) && Objects.nonNull(tiles) ) {
			roundTiles = new CategoryRoundTiles();
			roundTiles.setAlgoliaAttrMap(algoliaAttrMap);
			roundTiles.setRoundTilesCategory(roundTilesCategory);
			roundTiles.setTiles(tiles);
		}	
		setAlgoliaConfigs();
	}
	
	private void setAlgoliaConfigs() {
		if(algoliaConfig != null) {
    		algoliaIndexName = algoliaConfig.getAlgolia_index_name();
    		algoliaAppId = algoliaConfig.getAlgolia_app_id();
    		algoliaSearchApiKey = algoliaConfig.getAlgolia_search_api_key();
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
	
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
}
