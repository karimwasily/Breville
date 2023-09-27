package com.breville.aem.brands.core.models;

import static java.lang.String.format;
import static org.apache.commons.lang3.StringUtils.isBlank;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.settings.SlingSettingsService;

import lombok.Getter;

/**
 * A very simple way of passing information between aem components
 *
 * @author Martin Petrovsky - Solution Digital / Vervio
 */
@Model(
    adaptables = { Resource.class, SlingHttpServletRequest.class },
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class Attribs {
    @RequestAttribute(injectionStrategy = InjectionStrategy.REQUIRED)
    private String attrib;

    @RequestAttribute(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Getter
    private String value;

    @Inject
    private SlingSettingsService settingService;

    @Getter
    private boolean isLive = true;

    @Inject
    private SlingHttpServletRequest request;

    @PostConstruct
    protected void postMethod() {
        if (isBlank(value)) {
            value = (String) request.getAttribute(key());
        } else {
            request.setAttribute(key(), value);
        }
        this.isLive = settingService.getRunModes().contains("prod") || settingService.getRunModes().contains("uat");
    }

    private String key() {
        return format("%s.%s",Attribs.class.getName(), attrib);
    }
}
