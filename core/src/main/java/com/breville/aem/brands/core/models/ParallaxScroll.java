package com.breville.aem.brands.core.models;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

public interface ParallaxScroll {

    public String getBackgroundColor();

    public String getLocation();

    public String getImageLocation();

    public String getBottomBackground();

    public List<ParallaxImage> getParallaxImages();
    @Getter @Setter
    public class ParallaxImage {
        private String src, alt, scrollSpeed, scrollConfiguration;
    }
}
