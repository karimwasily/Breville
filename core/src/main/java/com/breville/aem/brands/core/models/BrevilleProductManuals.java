package com.breville.aem.brands.core.models;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BrevilleProductManuals {

	@Inject
	@Via("resource")
	@Named("productManuals")
	private List<ProductManuals> productManuals;

	@Getter
	@Model(adaptables = {SlingHttpServletRequest.class, Resource.class,
	}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	public static class ProductManuals {

		@Inject
		private String type;
		@Inject
		private String title;
		@Inject
		private String imgPath;
		@Inject
		private String imgAlt;
		@Inject
		private String link;
		@Inject
		private String target;		
	}
}
