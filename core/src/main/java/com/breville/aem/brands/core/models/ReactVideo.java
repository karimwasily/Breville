package com.breville.aem.brands.core.models;

import java.util.List;

import javax.inject.Inject;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ReactVideo {

	@Inject
	@Getter
    private String id;
	
    @Inject
	@Getter
    private String title;
  
    @Inject
	@Getter
    private String subtitle;
    
    @Inject
	@Getter
    private String description;
    
    @Inject
	@Getter
    private String bgImage;
      
    @Inject
	@Getter
    private String videoSrc;

    @Inject
	@Getter
    private String playButtonText;

    public String asJson() throws JsonProcessingException {
        return JsonUtil.getMapper().writer().writeValueAsString(this);
    }
}
