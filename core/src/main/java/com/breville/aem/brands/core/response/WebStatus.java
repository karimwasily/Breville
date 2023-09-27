package com.breville.aem.brands.core.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;


/**
 * @author Aravind S
 *
 */
@Setter
@Getter
public class WebStatus {
	
	@JsonProperty("channel")
	private String channel;
	
	@JsonProperty("value")
	private String value;
}
