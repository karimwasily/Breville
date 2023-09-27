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
public class Images {
	
	
	@JsonProperty("label")
	private String label;
	
	@JsonProperty("url")
	private String url;

}
