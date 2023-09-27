package com.breville.aem.brands.core.pojo;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

public class Country extends CountryStateBase {

	@Getter @Setter
	private List<State> states = new ArrayList<>();

	@Getter @Setter
	private String isdCode;

	@Getter @Setter
	private String countryCode;

	@Getter @Setter
	private String shippingCountryCode;

	@Getter @Setter
	private String zipCodeRegexPattern;

	@Getter @Setter
	private String countryName;

	@Getter @Setter
	private String countryNumericCode;

	@Getter @Setter
	private String phoneNumberPlaceHolder;

	@Getter @Setter
	private String phoneNumberRegex;

	@Getter @Setter
	private String phoneNumberMask;

	

}
