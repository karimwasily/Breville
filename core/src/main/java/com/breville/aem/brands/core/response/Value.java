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
public class Value {
	
	@JsonProperty("type")
	private String type;	
	
	@JsonProperty("currencyCode")
	private String currencyCode;
	
	@JsonProperty("centAmount")
	private String centAmount;
	
	@JsonProperty("fractionDigits")
	private String fractionDigits;

}
