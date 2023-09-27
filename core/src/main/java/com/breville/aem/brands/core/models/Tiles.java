package com.breville.aem.brands.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import lombok.Getter;

@Getter
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Tiles {	
    @Inject
    private String title;
    @Inject
    private String imgSrc;
    @Inject
    private String imgAlt;
    @Inject
    private String algoliaAttrMapVal;
}
