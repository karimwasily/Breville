package com.breville.aem.brands.core.models;

import lombok.Getter;
import lombok.ToString;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Getter
@ToString
@Model(adaptables = {Resource.class,
        SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Answer {
    @Inject
    public String ansText;
    @Inject
    public String ansId;
    @Inject
    public String ansHeading;
    @Inject
    public String ansDescription;
    @Inject
    public String facetAnswer;
}
