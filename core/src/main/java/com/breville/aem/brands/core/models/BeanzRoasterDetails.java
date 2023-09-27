/**
 * 
 */
package com.breville.aem.brands.core.models;

import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.breville.aem.brands.core.services.BrevilleBeanzRoasterDetailsReadService;
import com.google.gson.JsonObject;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * This model will fetch the cached roaster vendor details
 * 
 * @author PradeepMC
 *
 */
@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, resourceType = "breville-brands/components/breville/beanzroaster", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BeanzRoasterDetails {

	@Self
	private SlingHttpServletRequest request;

	@Inject
	protected Resource resource;

	@Inject
	@Via("resource")
	private String roasterPagePath;

	@Inject
	private BrevilleBeanzRoasterDetailsReadService beanzRoasterReadService;

	@Setter
	@Getter
	private String beanzRoastersVendorsInfo;

	@PostConstruct
	public void initModel() {
		log.debug("Roaster Content Fragment Page Path :: {} ", roasterPagePath);
		JsonObject jsonObj = beanzRoasterReadService.refreshRoastersDetailsCache(request.getResourceResolver());
		if (Objects.nonNull(jsonObj)) {
			beanzRoastersVendorsInfo = jsonObj.toString();
		}
	}
}
