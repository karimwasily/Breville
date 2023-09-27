package com.breville.aem.brands.core.models;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.services.SessionAccessor;

import lombok.Getter;
import lombok.ToString;

/**
 * @author Aravind S
 *
 */
@Getter
@ToString
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BeanzRoasterTile extends BaseModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(BeanzRoasterTile.class);

	@Inject
	private static SessionAccessor sessionAccessor;

	List<LinkedHashMap<String, String>> roasterData = new ArrayList<>();

	@Inject
	private String roasterParentPath;

	@PostConstruct
	public void initModel() {
		try {
			resourceResolver = sessionAccessor
					.getServiceResourceResolver(ApplicationConstants.SubService.BREVILLESERVICE);
			if (null != resourceResolver) {
				final Resource roasterRes = resourceResolver.getResource(roasterParentPath);
				if (Objects.nonNull(roasterRes)) {
					Iterable<Resource> childPages = roasterRes.getChildren();
					for (Resource pageReource : childPages) {
						LinkedHashMap<String, String> roasterProperties = new LinkedHashMap<String, String>();
						fetchRoasterData(roasterProperties, pageReource);
					}
				} else {
					LOGGER.error("Either sitesRes or PageManager is null.");
				}
			}
		} catch (final LoginException e) {

			LOGGER.error("Inside writeProps():resolver not found", e);
		} finally {

			if (resourceResolver != null && resourceResolver.isLive()) {
				resourceResolver.close();
				LOGGER.debug("writeProps() method End.");
			}
		}
	}

	private void fetchRoasterData(LinkedHashMap<String, String> roasterProperties, Resource pageReource) {
		if (!pageReource.getName().equals(ApplicationConstants.JCR_CONTENT)) {
			ValueMap valueMap = resourceResolver
					.getResource(pageReource.getPath() + ApplicationConstants.SLASH + ApplicationConstants.JCR_CONTENT)
					.getValueMap();
			roasterProperties.put(ApplicationConstants.TITLE,
					valueMap.get(ApplicationConstants.ROASTER_NAME, StringUtils.EMPTY));
			String descriptionData = valueMap.get(ApplicationConstants.ROASTER_CITY, StringUtils.EMPTY) + ", " + valueMap.get(ApplicationConstants.ROASTER_STATE, StringUtils.EMPTY); 
			roasterProperties.put("description", descriptionData );
			roasterProperties.put("imagePath", valueMap.get(ApplicationConstants.ROASTER_BRANDIMG, StringUtils.EMPTY));
			roasterProperties.put("pagePath", pageReource.getPath());
		}
		if (!roasterProperties.isEmpty()) {
			roasterData.add(roasterProperties);
		}
	}
}