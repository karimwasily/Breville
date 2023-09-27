package com.breville.aem.brands.core.models;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Model( adaptables = { SlingHttpServletRequest.class, Resource.class }, 
        adapters = {ParallaxScroll.class }, 
        defaultInjectionStrategy = OPTIONAL, 
        resourceType = ParallaxScrollImpl.RESOURCE_TYPE
)
public class ParallaxScrollImpl implements ParallaxScroll {

    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/parallax-scroll";
    protected static final String IMAGE_SOURCE = "fileReference";
    protected static final String IMAGE_ALT = "alt";
    protected static final String SCROLL_SPEED = "scrollSpeed";
    protected static final String SCROLL_CONFIGURATION = "scrollConfiguration";

    @ChildResource
	private List<Resource> imageList;

    private List<ParallaxImage> images;

    @ValueMapValue
    private String backgroundColor;

    @ValueMapValue
    private String bottomBackground;

    @ValueMapValue
    private String imageLocation;

    @ValueMapValue
    private String location;

    @PostConstruct
	protected void setup() {
        try {
            if(imageList != null && !imageList.isEmpty()) {
                List<ParallaxImage> allImages = new ArrayList<>();
                for(Resource resource : imageList) {
                    ParallaxImage image = new ParallaxImage();
                    ValueMap resourceMap = resource.getValueMap();
                    String imageSource = resourceMap.get(IMAGE_SOURCE, String.class);
                    String imageAlt = resourceMap.get(IMAGE_ALT, String.class);
                    String scrollSpeed = resourceMap.get(SCROLL_SPEED, String.class);
                    String scrollConfiguration = resourceMap.get(SCROLL_CONFIGURATION, String.class);
                    image.setSrc(imageSource);
                    image.setAlt(imageAlt);
                    image.setScrollSpeed(scrollSpeed);
                    image.setScrollConfiguration(scrollConfiguration);
                    allImages.add(image);
                }
                images = allImages;
            }
        }
        catch( RuntimeException e ) {
            log.error("ParallaxScrollImpl: Could not finalise post constructed setup. Please check the input.", e);
        }
    }

    @Override
    public List<ParallaxImage> getParallaxImages() {
        if(images == null || images.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(images);
    }

    @Override
    public String getBackgroundColor() {
        return StringUtils.isNotBlank(backgroundColor) ? backgroundColor : StringUtils.EMPTY;
    }

    @Override
    public String getBottomBackground() {
        return StringUtils.isNotBlank(bottomBackground) ? bottomBackground : StringUtils.EMPTY;
    }

    @Override
    public String getLocation() {
        return StringUtils.isNotBlank(location) ? location : StringUtils.EMPTY;
    }

    @Override
    public String getImageLocation() {
        return StringUtils.isNotBlank(imageLocation) ? imageLocation : StringUtils.EMPTY;
    }
}
