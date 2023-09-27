package com.breville.aem.brands.core.models;

import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.services.SessionAccessor;
import com.breville.aem.brands.core.services.impl.MultiRegionConfigurationsFactoryImpl;

import lombok.Getter;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, resourceType = "breville-brands/components/page", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AlgoliaConfig {

	private static final Logger LOGGER = LoggerFactory.getLogger(AlgoliaConfig.class);
	
	/**
	 * The resource.
	 */
	@Self
	private Resource resource;

	/**
	 * The multiRegionConfig factory object instance.
	 */
	@Inject
	private MultiRegionConfigurationsFactoryImpl multiRegionConfig;

	@SlingObject
	private SlingHttpServletRequest request;
	
	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	/** The session accessor. */
	@Reference
	private SessionAccessor sessionAccessor;
	
	@Getter
	private String algolia_index_name;
	
	@Getter
	private String algolia_app_id;
	
	@Getter
	private String algolia_search_api_key;
	
	@PostConstruct
	protected void init() {
		if (Objects.nonNull(multiRegionConfig)) {
			algolia_index_name = multiRegionConfig.getAlgolia_index_name();
			algolia_app_id = multiRegionConfig.getAlgolia_app_id();
			algolia_search_api_key = multiRegionConfig.getAlgolia_search_api_key();
			
		}else {
			LOGGER.error("MultiRegionConfigurationFactory is null");
		}
		
	}

	
}
