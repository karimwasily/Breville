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
public class MasterData {
	
	@JsonProperty("published")
	private boolean published;
	
	@JsonProperty("current")
	private Current current;

}
