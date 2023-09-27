package com.breville.aem.brands.core.models;

import javax.inject.Inject;
import java.util.List;
import java.util.ArrayList;
import lombok.NoArgsConstructor;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model( adaptables = Resource.class,
        adapters = { SecondaryNavigation.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@NoArgsConstructor
public class SecondaryNavigationImpl implements SecondaryNavigation {
    
    @Inject
    private List<Link> navigationLinks;

    @Override
    public List<Link> getNavigationLinks() {
        if(navigationLinks == null || navigationLinks.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(navigationLinks);
    }

    public Boolean isEmpty() {
        return (navigationLinks == null || navigationLinks.isEmpty());
    }
}
