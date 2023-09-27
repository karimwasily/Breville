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
public class ProductImages {

	@JsonProperty("productImage")
	private String productImage;

	@JsonProperty("imageIndex")
	private String imageIndex;

	@JsonProperty("imageType")
	private String imageType;

	@JsonProperty("imageText")
	private Object imageText;
}
