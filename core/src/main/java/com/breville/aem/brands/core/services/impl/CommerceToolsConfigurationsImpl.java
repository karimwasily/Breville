package com.breville.aem.brands.core.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import lombok.Getter;
import com.breville.aem.brands.core.services.CommerceToolsConfigurations;
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
@Component(service=CommerceToolsConfigurationsImpl.class,immediate=true)
@Designate(ocd = CommerceToolsConfigurations.class)
public class CommerceToolsConfigurationsImpl {
	
	@Getter
	private String hostURL;

	@Getter
	private String apiURL;
	
	@Getter
	private String clientSecret;

	@Getter
	private String clientId;
	
	@Getter
	private String projectKey;
	
	@Getter
	private String scope;
	
	
	@Activate @Modified
	protected void activate(final CommerceToolsConfigurations config) {
		
		hostURL = config.hostURL();
		apiURL = config.apiURL();
		clientSecret = config.clientSecret();
		clientId = config.clientId();
		projectKey = config.projectKey();
		scope = config.scope();
	}





	
	
}