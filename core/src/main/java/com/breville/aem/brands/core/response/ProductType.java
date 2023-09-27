package com.breville.aem.brands.core.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/**
 * @author PradeepMC
 *
 */
@Setter
@Getter
public class ProductType {
	
	@JsonProperty("name")
	private String name;
	
	@JsonProperty("key")
	private String key;	
}
