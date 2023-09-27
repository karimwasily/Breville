package com.breville.aem.brands.core.models;

import java.util.List;

public interface SecondaryNavigation {
    
    public List<Link> getNavigationLinks();

    public Boolean isEmpty();
}
