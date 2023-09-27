package com.breville.aem.brands.core.models;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

public interface ImageMap {
    
    public Boolean isEmpty();

    public String getFileReferenceDesktop();

    public String getImageAltTextDesktop();

    public String getImageLocationDesktop();

    public List<Button> getButtonListDesktop();

    public String getFileReferenceMobile();

    public String getImageAltTextMobile();

    public List<Button> getButtonListMobile();

    @Setter @Getter
    public static class Button {
        private String coordinateX, coordinateY, modalUrl, accessibilityLabel;
    }
}
