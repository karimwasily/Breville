package com.breville.aem.brands.core.servlets;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Breville Brands Common Configurations", description = "Configure Breville Brands Common Configurations")
public @interface CommonConfigurations {

	@AttributeDefinition(name = "newsletter.salesforce.url", description = "Configure Newsletter SalesForce URL")
	String newsLetterSalesForceURL() default "";

	@AttributeDefinition(name = "newsletter.salesforce.country.mapping", description = "Configure Newsletter SalesForce Country Mapping")
	String[] newsLetterSalesForceCountryMapping() default {};	

}
