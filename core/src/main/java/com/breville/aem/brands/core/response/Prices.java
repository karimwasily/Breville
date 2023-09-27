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
public class Prices {

	@JsonProperty("value")
	private Value value;
	
	@JsonProperty("country")
	private String country;
	
	@JsonProperty("channel")
	private Channel channel;
}
