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
public class Products {
	
	@JsonProperty("total")
	private String total;
	
	@JsonProperty("results")
	private List<Results> results;
}
