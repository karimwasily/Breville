package com.breville.aem.brands.core.models;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface Mapbox {
    public String asJson()  throws JsonProcessingException;

    public List<Chapter> getChapters();

    public String getTagline();

    public String getTitle();

    public String getByline();

    public String getFooterText();

    @Setter @Getter
    public class Chapter {
        private String id, tagline, alignment, title, description;
        private Location location;
        private List<Image> imageList;
    }

    @Setter @Getter
    public class Location {
        private List<String> center;
        private String zoom, pitch, bearing;
    }

    @Setter @Getter
    public class Image {
        private String fileReference, description, alt;
    }
}
