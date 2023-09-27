/**
 * 
 */
package com.breville.aem.brands.core.services.impl;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;

import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.services.BrevilleBeanzRoasterDetailsReadService;
import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.extern.slf4j.Slf4j;

/**
 * Read the beanz our roasters vendor information from JCR and cache it. And
 * serve the cached infromation to consumer.
 * 
 * @author PradeepMC
 *
 */
@Slf4j
@Component(service = BrevilleBeanzRoasterDetailsReadService.class, immediate = true, enabled = true)
public class BrevilleBeanzRoasterDetailsReadServiceImpl implements BrevilleBeanzRoasterDetailsReadService {

	/**
	 * TODO: in future, we should plan to read - beanzRoastersParentPath from
	 * multisite config - Beanz to Breville (when Beanz available in different
	 * country/region)
	 */

	/**
	 * Default beanz roasters page in Beanz content Structure
	 */
	private static String BEANZ_ROASTERPAGE_PATH = "/content/beanz/language-masters/en/our-roasters";

	/**
	 * Path to beanz roasters page in Beanz content Structure
	 */
	private String beanzRoastersParentPath = "/content/beanz/us/en/our-roasters";

	/** The svc PID map. */
	private static LinkedHashMap<String, LinkedHashMap<String, String>> cachedRoasterData = new LinkedHashMap<String, LinkedHashMap<String, String>>();

	@Activate
	@Modified
	protected void activate(final ComponentContext componentContext) {
		log.info("BrevilleBeanzRoasterDetailsReadServiceImpl Started");
	}

	private Resource getResource(ResourceResolver resourceResolver, final String resourcePath) {
		// get resource object of Path
		Resource resourceObj = resourceResolver.getResource(resourcePath);
		return resourceObj != null ? resourceObj : resourceResolver.getResource(BEANZ_ROASTERPAGE_PATH);
	}

	@Override
	public String getOurRoastersDetails(ResourceResolver resourceResolver) {
		log.debug("BrevilleBeanzRoasterDetailsReadServiceImpl >> getOurRoastersDetails >> Started");

		try {
			if (Objects.nonNull(cachedRoasterData) && cachedRoasterData.size() > 0) {
				log.debug("Object from the cached returned :: ");
				return JsonUtil.getMapper().writer().writeValueAsString(cachedRoasterData);
			}

			Resource resource = getResource(resourceResolver, beanzRoastersParentPath);
			Iterable<Resource> childPages = resource.getChildren();

			log.debug("Iterate over pages to populate the cache :: ");
			for (Resource pageReource : childPages) {
				if (!pageReource.getName().equals(ApplicationConstants.JCR_CONTENT)) {
					ValueMap valueMap = resourceResolver.getResource(
							pageReource.getPath() + ApplicationConstants.SLASH + ApplicationConstants.JCR_CONTENT)
							.getValueMap();
					LinkedHashMap<String, String> roasterProperties = new LinkedHashMap<String, String>();
					String roasterId = valueMap.get(ApplicationConstants.ROASTER_ID, null);
					roasterProperties.put(ApplicationConstants.ID, roasterId);

					roasterProperties.put(ApplicationConstants.TITLE,
							valueMap.get(ApplicationConstants.ROASTER_NAME, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.PRIMARY_IMG,
							valueMap.get(ApplicationConstants.ROASTER_RIGHTIMG, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.PRIMARY_IMG_ALT,
							valueMap.get(ApplicationConstants.ROASTER_RIGHTIMG_ALT, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.DESCRIPTION,
							valueMap.get(ApplicationConstants.ROASTER_DESC, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.LOCATION,
							valueMap.get(ApplicationConstants.ROASTER_LOCATION, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.BRAND_IMG,
							valueMap.get(ApplicationConstants.ROASTER_BRANDIMG, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.BRAND_IMG_ALT,
							valueMap.get(ApplicationConstants.ROASTER_BRANDIMG_ALT, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.SECONDARY_IMG,
							valueMap.get(ApplicationConstants.ROASTER_THUMBNAILIMG, StringUtils.EMPTY));
					roasterProperties.put(ApplicationConstants.SECONDARY_IMG_ALT,
							valueMap.get(ApplicationConstants.ROASTER_THUMBNAILIMG_ALT, StringUtils.EMPTY));

					if (Objects.nonNull(roasterId)) {
						cachedRoasterData.put(roasterId, roasterProperties);
					}

					log.debug("page path :: {} ", cachedRoasterData.size());
				}
			}
			return JsonUtil.getMapper().writer().writeValueAsString(cachedRoasterData);

		} catch (JsonProcessingException e) {
			log.error("Exception:: Error while processing the json {}", e.getMessage());
		}

		return "";
	}

	@Override
	public JsonObject refreshRoastersDetailsCache(ResourceResolver resourceResolver) {
		log.debug("refreshRoastersDetailsCache >> size {}",cachedRoasterData.size());
		cachedRoasterData.clear();
		return getOurRoastersDetailsJson(resourceResolver);
	}

	@Override
	public JsonObject getOurRoastersDetailsJson(ResourceResolver resourceResolver) {
		log.debug("getOurRoastersDetailsJson >> ");
		this.getOurRoastersDetails(resourceResolver);
		if (cachedRoasterData.size() > 0) {
			JsonObject jsonObject = getData();
			return jsonObject;
		}
		return null;
	}

	/**
	 * @return JsonObject representation of cached Information
	 */
	private JsonObject getData() {
		log.debug("getData >> ");
		JsonObject jsonObject = new JsonObject();
		JsonArray vendorInfoArr = new JsonArray();
		
		for (Map.Entry<String, LinkedHashMap<String, String>> vendor : cachedRoasterData.entrySet()) {
			log.debug("vendor info:: {}",vendor.toString());
			LinkedHashMap<String, String> vendOjb = vendor.getValue();
			JsonObject inforOjb = new JsonObject();			
			for(Map.Entry<String, String> info: vendOjb.entrySet()) {
				inforOjb.addProperty(info.getKey(), info.getValue());
			}
			vendorInfoArr.add(inforOjb);
		}
		jsonObject.add("roasters", vendorInfoArr);
		log.debug("vendorInfoArr >> {}", jsonObject.toString());
		return jsonObject;
	}
}
