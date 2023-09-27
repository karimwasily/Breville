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
public class MyBeanzAccountDetails {
	
	@Inject
    private String myBeanzAccountHeading;
	
    @Inject
    private String myBeanzPersonalDetails;
    
    @Inject
    private String editBtnLabel;
    
    @Inject
    private String saveBtnLabel;
    
    @Inject
    private String loginText;
    
    @Inject
    private String changePasswordText;
    
    @Inject
    private String newPassword;
    
    @Inject
    private String confirmPassword;
    
    @Inject
    private String requiredPasswordText;
    
    @Inject
    private String showBtnText;
    
    @Inject
    private String hideBtnText;
    
    @Inject
    private String saveBtnText;
    
    @Inject
    private String cancelBtnText;
    
    @Inject
    private String nameHeading;
    
    @Inject
    private String firstNameLabel;
    
    @Inject
    private String lastNameLabel;
    
    @Inject
    private String shippingAddressHeading;
    
    @Inject
    private String addressLine1;
    
    @Inject
    private String addressLine2;
    
    @Inject
    private String cityTown;
    
    @Inject
    private String zipCode;
    
    @Inject
    private String stateLbl;
    
    @Inject
    private String countryLbl;
    
    @Inject
    private String defaultText;
    
    @Inject
    private String alternateShippingAddressLbl;
    
    @Inject
    private String setAsDefault;
    
    @Inject
    private String deleteAddress;
    
    @Inject
    private String phoneHeading;
    
    public String asJson() throws JsonProcessingException {
        return JsonUtil.getMapper().writer().writeValueAsString(this);
    }
}