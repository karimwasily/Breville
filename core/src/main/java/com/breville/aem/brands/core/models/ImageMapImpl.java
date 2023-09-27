package com.breville.aem.brands.core.models;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Slf4j
@Model( adaptables = { SlingHttpServletRequest.class, Resource.class }, 
        adapters = {ImageMap.class }, 
        defaultInjectionStrategy = OPTIONAL, 
        resourceType = ImageMapImpl.RESOURCE_TYPE)
public class ImageMapImpl implements ImageMap {

    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/image-map";
    private static final String FOCUS_POINT = "focusPoint";
    private static final String MODAL_URL = "modalUrl";
    private static final String ACCESSIBILITY_LABEL = "accessibilityLabel";

    private List<Button> desktopButtons;
    private List<Button> mobileButtons;

    @ValueMapValue
    private String fileReferenceDesktop;

    @ValueMapValue
    private String imageAltTextDesktop;

    @ValueMapValue
    private String imageLocationDesktop;

    @ValueMapValue
    private String fileReferenceMobile;

    @ValueMapValue
    private String imageAltTextMobile;

    @ChildResource
    private List<Resource> buttonListDesktop;

    @ChildResource
    private List<Resource> buttonListMobile;

    @ChildResource
    private List<Resource> textfieldList;

    @PostConstruct
    protected void setup() {
        desktopButtons = getButtonsFromList(buttonListDesktop);
        mobileButtons = getButtonsFromList(buttonListMobile);
    }

    private List<Button> getButtonsFromList(List<Resource> thisList) {
        List<Button> buttonList = new ArrayList<>();
        try {
            if(thisList != null && !thisList.isEmpty()) {
                for(Resource resource : thisList) {
                    Button button = new Button();
                    ValueMap resourceMap = resource.getValueMap();
                    String coordinate = resourceMap.get(FOCUS_POINT, String.class);
                    String modalUrl = resourceMap.get(MODAL_URL, String.class);
                    String accessibilityLabel = resourceMap.get(ACCESSIBILITY_LABEL, String.class);
                    if(StringUtils.isNotBlank(coordinate) ) {
                        String[] coordinateArray = coordinate.split(":");
                        String coordinateX = coordinateArray[0];
                        String coordinateY = coordinateArray[1];
                        button.setCoordinateX(coordinateX);
                        button.setCoordinateY(coordinateY);
                        button.setModalUrl(modalUrl);
                        button.setAccessibilityLabel(accessibilityLabel);
                    }
                    buttonList.add(button);
                }
            }
        }
        catch( RuntimeException e ) {
            log.error("ImageMap: Could not finalise post constructed setup. Check desktop button list", e);
        }
        return buttonList;
    }

    @Override
    public Boolean isEmpty() {
        return !StringUtils.isNotBlank(imageLocationDesktop);
    }

    @Override
    public String getFileReferenceDesktop() {
        return StringUtils.isNotBlank(fileReferenceDesktop) ? fileReferenceDesktop : StringUtils.EMPTY;
    }

    @Override
    public String getImageAltTextDesktop() {
        return StringUtils.isNotBlank(imageAltTextDesktop) ? imageAltTextDesktop : StringUtils.EMPTY;
    }

    @Override
    public String getImageLocationDesktop() {
        return StringUtils.isNotBlank(imageLocationDesktop) ? imageLocationDesktop : StringUtils.EMPTY;
    }

    @Override
    public List<Button> getButtonListDesktop() {
        if (desktopButtons == null ||  desktopButtons.isEmpty()) {
            return new ArrayList<>();
        }
        return desktopButtons;
    }

    @Override
    public String getFileReferenceMobile() {
        return StringUtils.isNotBlank(fileReferenceMobile) ? fileReferenceMobile : StringUtils.EMPTY;
    }

    @Override
    public String getImageAltTextMobile() {
        return StringUtils.isNotBlank(imageAltTextMobile) ? imageAltTextMobile : StringUtils.EMPTY;
    }

    @Override
    public List<Button> getButtonListMobile() {
        if (mobileButtons == null ||  mobileButtons.isEmpty()) {
            return new ArrayList<>();
        }
        return mobileButtons;
    }
}
