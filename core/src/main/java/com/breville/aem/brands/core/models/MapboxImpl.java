package com.breville.aem.brands.core.models;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import javax.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Model( adaptables = { SlingHttpServletRequest.class, Resource.class }, 
        adapters = { Mapbox.class }, 
        defaultInjectionStrategy = OPTIONAL, 
        resourceType = MapboxImpl.RESOURCE_TYPE )
public class MapboxImpl implements Mapbox{


    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/mapbox";
    protected static final String CHAPTER_ID = "id";
    protected static final String CHAPTER_TAGLINE = "tagline";
    protected static final String CHAPTER_ALLIGNMENT = "alignment";
    protected static final String CHAPTER_TITLE = "title";
    protected static final String CHAPTER_DESCRIPTION = "description";
    protected static final String CHAPTER_IMAGE_LIST = "/imageList";
    protected static final String CHAPTER_IMAGE_FILEREFERENCE = "fileReference";
    protected static final String CHAPTER_IMAGE_ALTTEXT = "alt";
    protected static final String CHAPTER_IMAGE_DESCRIPTION = "description";
    protected static final String CHAPTER_LONGITUDE = "longitude";
    protected static final String CHAPTER_LATITUDE = "latitude";
    protected static final String CHAPTER_ZOOM = "zoom";
    protected static final String CHAPTER_PITCH = "pitch";
    protected static final String CHAPTER_BEARING = "bearing";


    @ValueMapValue 
    private String style;

    @ValueMapValue 
    private String accessToken;

    @ValueMapValue 
    private String showMarkers;

    @ValueMapValue 
    private String title;

    @ValueMapValue 
    private String tagline;

    @ValueMapValue 
    private String byline;

    @ValueMapValue 
    private String footer;

    @ChildResource @JsonIgnore
    private List<Resource> chapterList;

    private List<Chapter> chapters;

    @PostConstruct
    protected void setup() {
        try {
            if(chapterList != null && !chapterList.isEmpty()) {
                List<Chapter> allChapters = new ArrayList<>();
                for(Resource resource : chapterList) {
                    Chapter chapter = new Chapter();
                    Location location = new Location();
                    ValueMap resourceMap = resource.getValueMap();

                    List<String> coordinates = new ArrayList<>();
                    coordinates.add(resourceMap.get(CHAPTER_LONGITUDE, String.class));
                    coordinates.add(resourceMap.get(CHAPTER_LATITUDE, String.class));

                    location.setCenter(coordinates);
                    location.setZoom(resourceMap.get(CHAPTER_ZOOM, String.class));
                    location.setPitch(resourceMap.get(CHAPTER_PITCH, String.class));
                    location.setBearing(resourceMap.get(CHAPTER_BEARING, String.class));

                    chapter.setId(resourceMap.get(CHAPTER_ID, String.class));
                    chapter.setTagline(resourceMap.get(CHAPTER_TAGLINE, String.class));
                    chapter.setTitle(resourceMap.get(CHAPTER_TITLE, String.class));
                    chapter.setDescription(resourceMap.get(CHAPTER_DESCRIPTION, String.class));
                    chapter.setAlignment(resourceMap.get(CHAPTER_ALLIGNMENT, String.class));
                    chapter.setLocation(location);
                    if(resource.hasChildren()) {
                        Resource resourceChildren = resource.getChild(resource.getPath() + CHAPTER_IMAGE_LIST);
                        List<Image> imageList = createListOfChapterImage(resourceChildren);
                        chapter.setImageList(imageList);
                    }

                    allChapters.add(chapter);
                }
                chapters = allChapters;
            }
        }
        catch(RuntimeException e) {
            log.error("Mapbox: Could not finalise post constructed setup. Please check the input.", e);
        }
    }

    private List<Image> createListOfChapterImage(Resource imageList) {
        List<Image> images = new ArrayList<>();
        if(imageList.hasChildren()) {
            Iterable<Resource> imageIterable = imageList.getChildren();
            Iterator<Resource> imageIterator = imageIterable.iterator();

            while(imageIterator.hasNext()) {
                Resource resource = imageIterator.next();
                ValueMap imageResourceMap = resource.getValueMap();

                Image image = new Image();
                image.setFileReference(imageResourceMap.get(CHAPTER_IMAGE_FILEREFERENCE, String.class));
                image.setDescription(imageResourceMap.get(CHAPTER_IMAGE_DESCRIPTION, String.class));
                image.setAlt(imageResourceMap.get(CHAPTER_IMAGE_ALTTEXT, String.class));
                images.add(image);
            }
        }
        return images;
    }

    @Override
    public String asJson() throws JsonProcessingException {
        return JsonUtil.getMapper().writer().writeValueAsString(this);
    }
    
    @Override
    public List<Chapter> getChapters() {
        if(chapters == null || chapters.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(chapters);
    }

    @Override
    public String getTitle() {
        return StringUtils.isNotBlank(title) ? title : StringUtils.EMPTY;
    }

    @Override
    public String getTagline() {
        return StringUtils.isNotBlank(tagline) ? tagline : StringUtils.EMPTY;
    }

    @Override
    public String getByline() {
        return StringUtils.isNotBlank(byline) ? byline : StringUtils.EMPTY;
    }

    @Override
    public String getFooterText() {
        return StringUtils.isNotBlank(footer) ? footer : StringUtils.EMPTY;
    }
}