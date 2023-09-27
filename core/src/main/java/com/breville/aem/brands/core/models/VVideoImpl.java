package com.breville.aem.brands.core.models;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Model( adaptables = { SlingHttpServletRequest.class },
        adapters = { VVideo.class },
        defaultInjectionStrategy = OPTIONAL,
        resourceType = { VVideoImpl.RESOURCE_TYPE }
)
@Exporter(name = "jackson", selector = "model", extensions = "json")
public class VVideoImpl implements VVideo {

    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/v-video";
    private static final String CHAPTER_DESCRIPTION = "chapterDescription";
    private static final String TIMESTAMP_MINUTE = "timestampMinute";
    private static final String TIMESTAMP_SECOND = "timestampSecond";

    @ValueMapValue
    private String videoId;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String overlayImageReference;

    @ValueMapValue
    private String imageAltText;

    @ValueMapValue
    private String startMinute;

    @ValueMapValue
    private String startSecond;

    @ValueMapValue
    private String stopMinute;

    @ValueMapValue
    private String stopSecond;

    @ValueMapValue
    private Boolean showTimestamp;

    @ChildResource
    private List<Resource> chapterList;

    private List<Chapter> chapters;

    private Integer startTime = 0;
    private Integer stopTime = 0;

    @PostConstruct
    protected void setup() {
        videoSettingSetup();
        chapterSetup();
    }

    protected void videoSettingSetup() {
        try {
            if(startMinute != null && startSecond != null) {
                startTime = (Integer.parseInt(startMinute) * 60 + Integer.parseInt(startSecond));
            }

            if(stopMinute != null && stopSecond != null) {
                stopTime = (Integer.parseInt(stopMinute) * 60 + Integer.parseInt(stopSecond));
            }
        }
        catch(RuntimeException e) {
            log.error("VVideoImpl: Could not finalise post constructed setup. Please check the video settinginput.", e);
        }
    }

    protected void chapterSetup() {
        try {
            if(chapterList != null && !chapterList.isEmpty()) {
                List<Chapter> allChapterList = new ArrayList<>();
                for(Resource resource : chapterList) {
                    Chapter chapter = new Chapter();
                    ValueMap resourceMap = resource.getValueMap();
                    String chapterDescription = resourceMap.get(CHAPTER_DESCRIPTION, String.class);
                    String timestampMinute = resourceMap.get(TIMESTAMP_MINUTE, String.class);
                    String timestampSecond = resourceMap.get(TIMESTAMP_SECOND, String.class);
                    Integer chapterTime = (Integer.parseInt(timestampMinute) * 60 + Integer.parseInt(timestampSecond));
                    chapter.setChapterDescription(chapterDescription);
                    chapter.setChapterTime(chapterTime);
                    chapter.setChapterMinute(Integer.parseInt(timestampMinute));
                    chapter.setChapterSecond(Integer.parseInt(timestampSecond));
                    allChapterList.add(chapter);
                }
                chapters = allChapterList;
            }
        }
        catch(RuntimeException e) {
            log.error("VVideoImpl: Could not finalise post constructed setup. Please check the chapter input.", e);
        }
    }

    @Override
    public String getVideoId() {
        return StringUtils.isNotBlank(videoId) ? videoId : StringUtils.EMPTY;
    }

    @Override
    public String getOverlayImageReference() {
        return StringUtils.isNotBlank(overlayImageReference) ? overlayImageReference : StringUtils.EMPTY;
    }

    @Override
    public String getImageAltText() {
        return StringUtils.isNotBlank(imageAltText) ? imageAltText : StringUtils.EMPTY;
    }

    @Override
    public String getTitle() {
        return StringUtils.isNotBlank(title) ? title : StringUtils.EMPTY;
    }

    @Override
    public Integer getStartTime() {
        return startTime != null ? startTime : 0;
    }

    @Override
    public Integer getStopTime() {
        return stopTime != null ? stopTime : 0;
    }

    @Override
    public Boolean showTimestamp() {
        if(showTimestamp == null) {
            return false;
        }
        else { return showTimestamp; }
    }

    @Override
    public String getChapters() {
        if (chapters == null || chapters.isEmpty()) {
            return StringUtils.EMPTY;
        }
        else {
            Gson gson = new Gson();
            return gson.toJson(chapters); 
        }
    }
    
}
