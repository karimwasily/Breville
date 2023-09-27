package com.breville.aem.brands.core.models;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

/**
 * @author MAzhar
 *
 */
@Getter
@ToString
@Slf4j
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchResults {
	private static final String LENGTH = "length";
	private static final String DISTINCT = "distinct";
	private static final String ALGOLIA_CONFIG = "algoliaConfig";

	@ValueMapValue
	private String distinct;

	@ValueMapValue
	private String length;

	/**
	 * @return
	 * @throws JsonProcessingException
	 */
	public String asJson() throws JsonProcessingException {
		Map<String, Object> searchResults = new HashMap<String, Object>();
		searchResults.put(ALGOLIA_CONFIG, getAlgoliaConfigJson());
		return JsonUtil.getMapper().writer().writeValueAsString(searchResults);
	}

	/**
	 * @return the Algolia Confign
	 */
	private Map<String, Object> getAlgoliaConfigJson() {
		try {
			Map<String, Object> algoliaConfig = new HashMap<String, Object>();
			algoliaConfig.put(DISTINCT, Objects.isNull(this.distinct) ? 0 : Integer.parseInt(this.distinct));
			algoliaConfig.put(LENGTH, Objects.isNull(this.length) ? 3 : Integer.parseInt(this.length));
			return algoliaConfig;
		} catch (Exception e) {
			log.error("Error while gettiing getAlgoliaConfig  :: {}", e.getMessage());
		}
		return null;
	}
}
