package com.breville.aem.brands.core.models;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import lombok.Getter;

@Getter
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MakeItCompleteBundleData {
	
	@Inject
	private String id;

	@Inject
	private String itemTitle;

	@Inject
	private String itemImgPath;

	@Inject
	private String itemImgAlt;

	@Inject
	private String itemDescription;

	@Inject
	private String itemPrice;

	@Inject
	private String itemPromotionPrice;

	@Inject
	@Named("modalData")
	private List<ModalData> modalData;
}
