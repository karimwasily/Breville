package com.breville.aem.brands.core.models;

import lombok.Getter;
import lombok.ToString;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Getter
@ToString
@Model(adaptables = {SlingHttpServletRequest.class, Resource.class,
}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ShareIcons {

    @ValueMapValue
    private String id;
    @ValueMapValue
    private String type;
    @ValueMapValue
    private String url;

}
