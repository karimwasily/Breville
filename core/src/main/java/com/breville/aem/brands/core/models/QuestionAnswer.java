package com.breville.aem.brands.core.models;


import lombok.Getter;
import lombok.ToString;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

@Getter
@ToString
@Model(adaptables = {Resource.class,
        SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class QuestionAnswer {
    @Inject
    public String serial;
    @Inject
    public String imagePath;
    @Inject
    public String imageAltText;
    @Inject
    public String customClass;
    @Inject
    public String facet;
    @Inject
    public String question;
    @Inject
    @Via("resource")
    @Named("answers")
    public List<Answer> answers;
}