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
public class Results {
	
	
	@JsonProperty("id")
	private String id;
	
	@JsonProperty("key")
	private String key;
	
	@JsonProperty("skus")
	private List<String> skus;
	
	@JsonProperty("productType")
	private ProductType productType;
	
	@JsonProperty("masterData")
	private MasterData masterData;
}
