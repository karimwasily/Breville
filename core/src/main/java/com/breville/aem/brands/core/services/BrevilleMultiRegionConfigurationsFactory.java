/**
 * 
 */
package com.breville.aem.brands.core.services;

import org.apache.sling.api.resource.Resource;


/**
 * Interface for BrevilleMultiRegionConfigurationFactoryImpl 
 * has method getSiteSpecificProperty which will be used to get the SiteSpecific property value
 * 
 * @author PradeepMC
 *
 */
public interface BrevilleMultiRegionConfigurationsFactory {
	
	 /**
	 * Gets the value for the key from specific multiregion osgi configuration
	 * 
	 * @param resource
	 * @param key
	 * @return
	 */
	public String getSiteSpecificProperty(Resource resource, String key);

}
