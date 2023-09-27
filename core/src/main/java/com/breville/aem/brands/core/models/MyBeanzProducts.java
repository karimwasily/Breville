package com.breville.aem.brands.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

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
public class MyBeanzProducts {
	
	@Inject
    private String myBeanzHeading;
	
    @Inject
    private String purchaseHeading;
    
    @Inject
    private String subscriptionText;

    @Inject
    private String subscriptionLink;
    
    @Inject
    private String orderText;

    @Inject
    private String orderLink;
    
    @Inject
    private String accountSectionHeading;
    
    @Inject
    private String personalDetailsText;

    @Inject
    private String personalDetailsLink;
    
    @Inject
    private String helpSupportHeading;
    
    @Inject
    private String callUsText;
    
    @Inject
    private String contactNumber;
    
    @Inject
    private String createSupportText;
    
    @Inject
    private String createSupportLink;
    
    @Inject
    private String updateSupportText;
    
    @Inject
    private String updateSupportLink;
    
    public String asJson() throws JsonProcessingException {
        return JsonUtil.getMapper().writer().writeValueAsString(this);
    }
}