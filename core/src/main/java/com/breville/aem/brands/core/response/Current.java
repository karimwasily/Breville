package com.breville.aem.brands.core.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/**
 * @author PradeepMC
 *
 */
@Setter
@Getter
public class Current {
	
	@JsonProperty("name")
	private String name;
	
	@JsonProperty("description")
	private String description;
	
	@JsonProperty("slug")
	private String slug;
	
	@JsonProperty("categories")
	private List<Category> categories;
	
	@JsonProperty("masterVariant")
	private MasterVariant masterVariant;
	
	@JsonProperty("variants")
	private List<Variants> variants;
}
