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
public class BeanzLoggedInModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(BeanzLoggedInModel.class);

	@Inject
	protected Resource resource;
	
	@Inject
	private String myBeanzLabel;

	public String getMyBeanzLabel() {
		return myBeanzLabel;
	}
	public String getPurchaseAndAppliancesLabel() {
		return purchaseAndAppliancesLabel;
	}
	public String getOrderlabel() {
		return orderlabel;
	}
	public String getOrderPagePath() {
		return orderPagePath;
	}
	public String getSubscriptionlabel() {
		return subscriptionlabel;
	}
	public String getSubscriptionPagePath() {
		return subscriptionPagePath;
	}
	public String getAccountDetaiLabel() {
		return accountDetaiLabel;
	}
	public String getPersonalDetaillabel() {
		return personalDetaillabel;
	}
	public String getPersonalDetailPagePath() {
		return personalDetailPagePath;
	}
	public String getHelpAndSupportLabel() {
		return helpAndSupportLabel;
	}
	public String getCallUslabel() {
		return callUslabel;
	}

	public String getCallNumber() {
		return callNumber;
	}
	public String getCallNowLink() {
		return callNowLink;
	}
	public String getCreateSupportTicketLabel() {
		return createSupportTicketLabel;
	}
	public String getCreateSupportTicketPath() {
		return createSupportTicketPath;
	}
	public String getUpdateASupportTicketLabel() {
		return updateASupportTicketLabel;
	}
	public String getUpdateASupportTicketPath() {
		return updateASupportTicketPath;
	}
	public String getAvailabilityText() {
		return availabilityText;
	}

	@Inject
	private String purchaseAndAppliancesLabel;

	@Inject
	private String orderlabel;

	@Inject
	private String orderPagePath;

	@Inject
	private String subscriptionlabel;

	@Inject
	private String subscriptionPagePath;

	@Inject
	private String accountDetaiLabel;

	@Inject
	private String personalDetaillabel;

	@Inject
	private String personalDetailPagePath;

	@Inject
	private String helpAndSupportLabel;

	@Inject
	private String callUslabel;

	@Inject
	private String callNumber;

	@Inject
	private String callNowLink;

	@Inject
	private String createSupportTicketLabel;

	@Inject
	private String createSupportTicketPath;

	@Inject
	private String updateASupportTicketLabel;

	@Inject
	private String updateASupportTicketPath;

	@Inject
	private String availabilityText;
	
	
    @PostConstruct
	public void initModel() {
		
	}
    

	
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
}