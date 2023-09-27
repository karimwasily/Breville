package com.breville.aem.brands.core.models;

import javax.inject.Inject;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ReactCarousel {

	@Inject
	@Getter
	private String id;

	@Inject
	@Getter
	private Boolean dots;

	@Inject
	@Getter
	private Boolean arrows;

	@Inject
	@Getter
	private Boolean infinite;

	@Inject
	@Getter
	private int speed;

	@Inject
	@Getter
	private int slidesToShowMobile;

	@Inject
	@Getter
	private int slidesToShowTablet;

	@Inject
	@Getter
	private int slidesToShowDesktop;

	@Inject
	@Getter
	private int slidesToShow;

	@Inject
	@Getter
	private Boolean centerMode;

	@Inject
	@Getter
	private String centerPadding;

	@Inject
	@Getter
	private Boolean useCenterPaddingRatio;

	@Inject
	@Getter
	private int centerPaddingRatio;

	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}
}
