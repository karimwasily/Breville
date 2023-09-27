/**
 * 
 */
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
public class ProductVideos {
	
	@JsonProperty("videoURL")
	private String videoURL;

	@JsonProperty("videoTitle")
	private String videoTitle;

	@JsonProperty("videoAltText")
	private String videoAltText;

	@JsonProperty("videoType")
	private String videoType;
	
	@JsonProperty("videoCarouselIndex")
	private String videoCarouselIndex;

}
