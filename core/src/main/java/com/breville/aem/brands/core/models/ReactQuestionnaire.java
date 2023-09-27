package com.breville.aem.brands.core.models;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.Getter;
import lombok.ToString;

/**
 * @author Aravind S
 *
 */
@Getter
@ToString
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ReactQuestionnaire {

	@Inject
	@Self
	private AlgoliaConfig algoliaConfig;
	
	@Inject
    private String id;
	
    @Inject
    private List<QuestionAnswerDetails> questionAnswers;
    
    @Inject
    private String startOver;
    
    @Inject
    private String resultPageText;
    
    @Inject
    private String algoliaIndexName;
    
    @Inject
    private String algoliaAppId;
    
    @Inject
    private String algoliaSearchApiKey;

    @Getter
    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.REQUIRED)
    public static class QuestionAnswerDetails {
    	@Inject private String serial;
        @Inject private String imagePath;
        @Inject private String imageAltText;
        @Inject private String customClass;
        @Inject private String question;
		@Inject List<AnswerDetails> answers;
		@Inject private String facet;
		@Inject private String helpText;
    }

    @Getter
    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.REQUIRED)
    public static class AnswerDetails {
    	@Inject private String ansText;
		@Inject private String ansId;
		@Inject private String ansHeading;
		@Inject private String ansDescription;
		@Inject private String facetAnswer;
    }
    
    @PostConstruct
    public void initModel() {
    	if(algoliaConfig != null) {
    		algoliaIndexName = algoliaConfig.getAlgolia_index_name();
    		algoliaAppId = algoliaConfig.getAlgolia_app_id();
    		algoliaSearchApiKey = algoliaConfig.getAlgolia_search_api_key();
    	}
    }
    
    /**
	 * Gets the id.
	 *
	 * @return the id.
	 */
	public String getId() {
		return id;
	}
	
	/**
	 * Gets the startOver.
	 *
	 * @return the startOver.
	 */
	public String getStartOver() {
		return startOver;
	}
	
	/**
	 * Gets the resultPageText.
	 *
	 * @return the resultPageText.
	 */
	public String getResultPageText() {
		return resultPageText;
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
}