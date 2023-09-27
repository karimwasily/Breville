package com.breville.aem.brands.core.response;

import java.util.ArrayList;
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
public class MasterVariant {
	
	@JsonProperty("key")
	private String key;
	
	@JsonProperty("sku")
	private String sku;
	
	@JsonProperty("attributesRaw")
	private List<RawAttributes> attributesRaw = new ArrayList<RawAttributes>();
	
	@JsonProperty("images")
	private List<Images> images = new ArrayList<Images>();
	
	@JsonProperty("prices")
	private List<Prices> prices = new ArrayList<Prices>();
}
