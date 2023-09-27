/**
 * 
 */
package com.breville.aem.brands.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * @author Aravind S
 *
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class}, resourceType = "breville-brands/components/beanz/cart", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BeanzCart {

	@Inject
	@Via("resource")
	private String frequencyText;
	
	@Inject
	@Via("resource")
	private String quantityText;
	
	@Inject
	@Via("resource")
	private String grindText;
	
	public String getFrequencyText() {
		return frequencyText;
	}
	public String getQuantityText() {
		return quantityText;
	}
	public String getGrindText() {
		return grindText;
	}
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
}