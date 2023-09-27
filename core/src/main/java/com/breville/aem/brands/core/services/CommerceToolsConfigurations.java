package com.breville.aem.brands.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
@ObjectClassDefinition(name = "Commercetools Configurations", description = "Configure all common configurations for commercetools")
public @interface CommerceToolsConfigurations {

	@AttributeDefinition(name = "commercetools.host.URL", description = "Commercetools host URL")
	String hostURL() default "";
	
	@AttributeDefinition(name = "commercetools.api.URL", description = "Commercetools API URL")
	String apiURL() default "";
	
	@AttributeDefinition(name = "commercetools.clientSecret", description = "Commercetools clientSecret")
	String clientSecret() default "";
	
	@AttributeDefinition(name = "commercetools.clientId", description = "Commercetools clientId")
	String clientId() default "";

	@AttributeDefinition(name = "commercetools.projectKey", description = "Commercetools projectKey")
	String projectKey() default "";
	
	@AttributeDefinition(name = "commercetools.scope", description = "Commercetools scope")
	String scope() default "";
	

}
