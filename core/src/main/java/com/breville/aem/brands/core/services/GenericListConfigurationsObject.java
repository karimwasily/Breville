package com.breville.aem.brands.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
@ObjectClassDefinition(name = "Breville Brands Generic List configurations", description = "\r\n" + 
		"Breville Brands Generic List Configuration Service for site specific paths.")
public @interface GenericListConfigurationsObject {

	@AttributeDefinition(name = "generic.list.service.name", description = "Breville's Generic List Service	")
	String generic_list_service_name() default "GenericList";
	
	@AttributeDefinition(name = "breville.list.base.path", description = "This will provide base path for List ")
	String breville_list_base_path() default "/etc/acs-commons/lists/breville-brands/";	
	
	@AttributeDefinition(name = "country.isd.path", description = "This will provide country ISD code ")
	String country_isd_path() default "/etc/acs-commons/lists/breville-brands/countryIsdCode/";	
	
	@AttributeDefinition(name = "country.state.path", description = "This will provide country state")
	String country_state_path() default "/etc/acs-commons/lists/breville-brands/countriesAndStates/";	
	
	@AttributeDefinition(name = "country.zipcode.path", description = "This will provide country ZIP Code Regex Pattern")
	String country_zipcode_path() default "/etc/acs-commons/lists/breville-brands/zipcodeAndCountries/";	

}
