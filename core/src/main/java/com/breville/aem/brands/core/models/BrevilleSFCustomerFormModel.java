/**
 * 
 */
package com.breville.aem.brands.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

/**
 * @author PradeepMC
 *
 */
@Slf4j
@Getter
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BrevilleSFCustomerFormModel {	
	
	@ValueMapValue
	private String formType;
	
	@ValueMapValue
	private String formTitle;
	
	@ValueMapValue
	private String formSubtitle;	
	
	@ValueMapValue
	private String firstNameLabel;	
	
	@ValueMapValue
	private String lastNameLabel;
	
	@ValueMapValue
	private String emailLabel;
	
	@ValueMapValue
	private String emailPlaceholder;
	
	@ValueMapValue
	private String submitBtnLabel;
	
	@ValueMapValue
	private String notifymeconfirm;
	
	@ValueMapValue
	private String userConsent;
	
	@ValueMapValue
	private String firstNameRequiredErrorMsg;

	@ValueMapValue
	private String lastNameRequiredErrorMsg;
	
	@ValueMapValue
	private String emailFormatErrorMsg;
	
	@ValueMapValue
	private String dataSubmissionErrorMsgTitle;
	
	@ValueMapValue
	private String dataSubmissionErrorMsgDesc;	
	
	@PostConstruct
	public void initModel() {
		//initialization		
	}
	
	/**
	 * @return
	 * @throws JsonProcessingException
	 */
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
}
