package com.breville.aem.brands.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.breville.aem.brands.core.utils.PathUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString(exclude = "resolver")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Link {
    @Inject
    @Getter private String linkText;

    @Inject
    @Getter private String linkHref;

    @Inject
    @JsonIgnore
    private ResourceResolver resolver;

    @Getter private boolean active;

    public Link(String linkText, String linkHref, boolean active, ResourceResolver resolver) {
        this.linkText = linkText;
        this.linkHref = linkHref;
        this.active = active;
        this.resolver = resolver;
        init();
    }

    @PostConstruct
    private void init() {
        this.linkHref = PathUtil.buildLInk(this.linkHref, this.resolver);
    }
}
