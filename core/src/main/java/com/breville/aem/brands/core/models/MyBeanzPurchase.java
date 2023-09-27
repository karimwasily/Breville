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
public class MyBeanzPurchase {
	
	@Inject
    private String purchasesHeading;
	
    @Inject
    private String ordersHeading;
    
    @Inject
    private String subscriptionsHeading;

    @Inject
    private String editBtnLabel;
	
    @Inject
    private String viewMoreLabel;
    
    @Inject
    private String recurringMsg;

    @Inject
    private String amendmentsMsg;
	
    @Inject
    private String perDeliveryLbl;
    
    @Inject
    private String nextOrderLbl;

    @Inject
    private String processingLbl;
	
    @Inject
    private String orderNo;
    
    @Inject
    private String cancelledLbl;

    @Inject
    private String pausedLbl;
	
    @Inject
    private String shipsToLbl;
    
    @Inject
    private String billedToLbl;

    @Inject
    private String paymentLbl;

    @Inject
    private String paymentDateLbl;
	
    @Inject
    private String pauseLbl;
    
    @Inject
    private String editPauseLbl;

    @Inject
    private String historyLbl;
	
    @Inject
    private String cancelSubscription;
    
    @Inject
    private String saveLbl;

    @Inject
    private String cancelLbl;
	
    @Inject
    private String orderLbl;
    
    @Inject
    private String everyLbl;
    
    @Inject
    private String sendMeLbl;

    @Inject
    private String grindLbl;
	
    @Inject
    private String costLbl;
    
    @Inject
    private String discountLbl;

    @Inject
    private String shippingLbl;
	
    @Inject
    private String taxesLbl;
    
    @Inject
    private String subTotalLbl;

    @Inject
    private String orderTotalLbl;
	
    @Inject
    private String addressLine1;
    
    @Inject
    private String addressLine2;

    @Inject
    private String cityTown;
	
    @Inject
    private String zipCode;
    
    @Inject
    private String pauseSubscriptionHeading;

    @Inject
    private String pauseSubscriptionMsg1;
	
    @Inject
    private String pauseSubscriptionMsg2;
    
    @Inject
    private String pauseYesLbl;

    @Inject
    private String pauseNoLbl;
	
    @Inject
    private String editPauseSubscriptionHeading;
    
    @Inject
    private String editPauseSubscriptionMsg1;

    @Inject
    private String editPauseSubscriptionMsg2;

    @Inject
    private String cancelSubscriptionHeading;
	
    @Inject
    private String cancelSubscriptionMsg;
    
    @Inject
    private String cancelYesLbl;

    @Inject
    private String cancelNoLbl;

    @Inject
    private String coffeeSelectionHeading;

    @Inject
    private String coffeeSelectionDescription;
	
    @Inject
    private String quizHeading;
    
    @Inject
    private String quizDescription;

    @Inject
    private String quizPageLink;
	
    @Inject
    private String beanzHeading;
    
    @Inject
    private String beanzDescription;

    @Inject
    private String beanzPageLink;
	
    @Inject
    private String discoveryBeanzHeading;
    
    @Inject
    private String discoveryBeanzDescription;

    @Inject
    private String discoverybeanzPageLink;
	
    @Inject
    private String popupBtnLbl;

    @Inject
    private String beanzImagePath;
	
    @Inject
    private String discoveryBeanzImagePath;

    @Inject
	private String bundleSubscriptionHeading;
    
    @Inject
    private String bundleSubscriptionTitle;

    @Inject
    private String bundleSubscriptionInfo;
	
    @Inject
    private String bundleSubscriptionOk;
    
    public String asJson() throws JsonProcessingException {
        return JsonUtil.getMapper().writer().writeValueAsString(this);
    }
}