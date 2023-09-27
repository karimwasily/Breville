package com.breville.aem.brands.core.models;

import java.util.List;

import javax.inject.Inject;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class RegisteredProducts {

  @Inject
  @Getter
  private String productGuideLink;

  public String asJson() throws JsonProcessingException {
      return JsonUtil.getMapper().writer().writeValueAsString(this);
  }
}
