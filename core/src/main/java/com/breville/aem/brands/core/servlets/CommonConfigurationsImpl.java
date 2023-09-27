package com.breville.aem.brands.core.servlets;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service=CommonConfigurationsImpl.class,immediate=true)
@Designate(ocd = CommonConfigurations.class)
public class CommonConfigurationsImpl {

	private String newsLetterSalesForceURL;

	private String[] newsLetterSalesForceCountryMapping;

	@Activate @Modified
	protected void activate(final CommonConfigurations commonConfigurations) {
		newsLetterSalesForceURL = commonConfigurations.newsLetterSalesForceURL();
		newsLetterSalesForceCountryMapping = commonConfigurations.newsLetterSalesForceCountryMapping();
	}

	/**
	 * @return the userName
	 */
	public String getNewsLetterSalesForceURL() {
		return newsLetterSalesForceURL;
	}

	/**
	 * @return the environments
	 */
	public String[] getNewsLetterSalesForceCountryMapping() {
		return newsLetterSalesForceCountryMapping;
	}
}