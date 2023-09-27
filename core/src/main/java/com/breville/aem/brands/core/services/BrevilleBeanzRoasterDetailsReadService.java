/**
 * 
 */
package com.breville.aem.brands.core.services;

import org.apache.sling.api.resource.ResourceResolver;

import com.google.gson.JsonObject;

/**
 * @author PradeepMC
 *
 */
public interface BrevilleBeanzRoasterDetailsReadService {
	
	/**
	 * Get the Our Roaster Vendor Details
	 * 
	 * @param resourceResolver
	 * @return JsonObject in the string format
	 */
	public String getOurRoastersDetails(ResourceResolver resourceResolver);
	
	/**
	 * Delete roaster details cache and re-create it
	 * 
	 * @param resourceResolver
	 * @return JsonObject in the string format
	 */
	public JsonObject refreshRoastersDetailsCache(ResourceResolver resourceResolver);
	
	/**
	 * Get the Our Roaster Vendor Details 
	 * 
	 * @param resourceResolver
	 * @return JsonArray
	 */
	public JsonObject getOurRoastersDetailsJson(ResourceResolver resourceResolver);
	
}
