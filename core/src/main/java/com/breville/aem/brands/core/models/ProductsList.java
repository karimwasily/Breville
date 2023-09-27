package com.breville.aem.brands.core.models;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

/**
 * This productlist component is used to listing the product tiles and its integrated
 * with Algolia to fetch data using reactJS
 * 
 * @author PradeepMC
 *
 */
@Getter
@ToString
@Slf4j
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = {
		ProductsList.class }, defaultInjectionStrategy = OPTIONAL, resourceType = ProductsList.RESOURCE_TYPE)
public class ProductsList {
	
	protected static final String RESOURCE_TYPE = "breville-brands/components/productslist";
	
	@Inject
	@JsonIgnore
	private Resource resource;

	@Getter
	private List<String> objectIDList;

	@Getter
	private List<String> tileTitles;

	@Getter
	@ValueMapValue
	private String indexName;

	@Getter
	@ValueMapValue
	private String limit;

	@Getter
	@ValueMapValue
	private Boolean useCoffeeProductTile;

	@PostConstruct
	protected void setup() {		
		//get the multifield values in List<String>
		objectIDList = Optional.ofNullable(this.resource.hasChildren() ? this.resource.getChild("objectIDList") : null)
					.map(Resource::getChildren).map(Iterable::spliterator).map(s -> StreamSupport.stream(s, false))
					.orElseGet(Stream::empty).map(res -> res.getValueMap().get("text", String.class))
					.collect(Collectors.toList());
		log.debug("values {}, {}, {}",objectIDList, indexName,limit);

		tileTitles = Optional.ofNullable(this.resource.hasChildren() ? this.resource.getChild("tileTitles") : null)
					.map(Resource::getChildren).map(Iterable::spliterator).map(s -> StreamSupport.stream(s, false))
					.orElseGet(Stream::empty).map(res -> res.getValueMap().get("text", String.class))
					.collect(Collectors.toList());
	}

	/**
	 * @return Data in Json String format
	 * @throws JsonProcessingException
	 */
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
}
