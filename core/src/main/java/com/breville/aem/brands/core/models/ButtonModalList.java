package com.breville.aem.brands.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;
import java.util.ArrayList;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import com.google.gson.Gson;

@Getter
@ToString
@Slf4j
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ButtonModalList {

  private static final String BUTTON_LABEL = "buttonLabel";
  private static final String EXPERIENCE_FRAGMENT_PATH = "experienceFragmentPath";

  @Inject
  @Getter
  private String title;

  @ChildResource
  private List<Resource> buttonList;

  private List<ButtonDetail> buttonDetails;

  @PostConstruct
  protected void setup() {
    try {
      if(buttonList != null && !buttonList.isEmpty()) {
        List<ButtonDetail> allButtonList = new ArrayList<>();
        for(Resource resource : buttonList) {
          ValueMap resourceMap = resource.getValueMap();
          String buttonLabel = resourceMap.get(BUTTON_LABEL, String.class);
          String experienceFragmentLabel = resourceMap.get(EXPERIENCE_FRAGMENT_PATH, String.class);

          ButtonDetail buttonDetail = new ButtonDetail();
          buttonDetail.setButtonLabel(buttonLabel);
          buttonDetail.setExperienceFragmentPath(experienceFragmentLabel);

          allButtonList.add(buttonDetail);
        }
        buttonDetails = allButtonList;
      }
    }
    catch(RuntimeException e) {
      log.error("ButtonModalList: Could not finalise post constructed setup. Please check the content fragment.", e);
    }
  }

  public String asJson() {
    Gson gson = new Gson();
    return gson.toJson(buttonDetails);
  }

  @Setter @Getter
  public static class ButtonDetail {
    private String buttonLabel, experienceFragmentPath;
  }

}
