package com.breville.aem.brands.core.models;

import lombok.Getter;
import lombok.Setter;

public interface VVideo {
    public String getVideoId();

    public String getOverlayImageReference();

    public String getImageAltText();

    public String getTitle();

    public Integer getStartTime();

    public Integer getStopTime();

    public Boolean showTimestamp();

    public String getChapters();

    @Getter @Setter
    public class Chapter {
        public String chapterDescription;
        public Integer chapterTime, chapterMinute, chapterSecond;
    }
}
