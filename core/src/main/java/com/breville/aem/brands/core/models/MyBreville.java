package com.breville.aem.brands.core.models;

import java.util.HashMap;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import lombok.Getter;
import lombok.ToString;
import com.google.gson.Gson;

@Getter
@ToString
@Model(
  adaptables = Resource.class,
  defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
  resourceType = MyBreville.RESOURCE_TYPE
)
public class MyBreville {

  protected static final String RESOURCE_TYPE = "breville-brands/components/myBreville";

  @Inject
  private String rootBeanzUrl,
    eventBriteUrl,
    brevilleSupportUrl;

	@Inject
  private String dashboardBeanzSubscriptionImageSrc, 
    dashboardBeanzSubscriptionAlt,
    dashboardBeanzSubscriptionText,
    dashboardBeanzSubscriptionUrl,
    dashboardBeanzSubscriptionLabel;

  @Inject
  private String dashboardMaintenanceSuppliesImageSrc,
    dashboardMaintenanceSuppliesAlt,
    dashboardMaintenanceSuppliesText,
    dashboardMaintenanceSuppliesUrl,
    dashboardMaintenanceSuppliesLabel;

  @Inject
  private String subscriptionBeanzSubscriptionImageSrc,
    subscriptionBeanzSubscriptionAlt,
    subscriptionBeanzSubscriptionText,
    subscriptionBeanzSubscriptionUrl,
    subscriptionBeanzSubscriptionLabel;

  @Inject
  private String subscriptionMaintenanceSuppliesImageSrc,
    subscriptionMaintenanceSuppliesAlt,
    subscriptionMaintenanceSuppliesText,
    subscriptionMaintenanceSuppliesUrl,
    subscriptionMaintenanceSuppliesLabel;

  @Inject
  private String subscriptionBeanzSubscriptionEditUrl,
    subscriptionBeanzSubscriptionEditLabel;

  public String getGeneralSettingJson() {
      HashMap<String,String> hashMap = new HashMap<>();
      hashMap.put("rootBeanzUrl", rootBeanzUrl);
      hashMap.put("eventBriteUrl", eventBriteUrl);
      hashMap.put("brevilleSupportUrl", brevilleSupportUrl);
      Gson gson = new Gson();
      return gson.toJson(hashMap);
    }

  public String getDashboardPageJson() {
    HashMap<String,String> hashMap = new HashMap<>();
    hashMap.put("beanzSubscriptionImageSrc", dashboardBeanzSubscriptionImageSrc);
    hashMap.put("beanzSubscriptionImageAlt", dashboardBeanzSubscriptionAlt);
    hashMap.put("beanzSubscriptionText", dashboardBeanzSubscriptionText);
    hashMap.put("beanzSubscriptionUrl", dashboardBeanzSubscriptionUrl);
    hashMap.put("beanzSubscriptionLabel", dashboardBeanzSubscriptionLabel);
    hashMap.put("maintenanceSuppliesImageSrc", dashboardMaintenanceSuppliesImageSrc);
    hashMap.put("maintenanceSuppliesImageAlt", dashboardMaintenanceSuppliesAlt);
    hashMap.put("maintenanceSuppliesText", dashboardMaintenanceSuppliesText);
    hashMap.put("maintenanceSuppliesUrl", dashboardMaintenanceSuppliesUrl);
    hashMap.put("maintenanceSuppliesLabel", dashboardMaintenanceSuppliesLabel);
    Gson gson = new Gson();
    return gson.toJson(hashMap);
  }

  public String getSubscriptionPageJson() {
    HashMap<String,String> hashMap = new HashMap<>();
    hashMap.put("beanzSubscriptionImageSrc", subscriptionBeanzSubscriptionImageSrc);
    hashMap.put("beanzSubscriptionImageAlt", subscriptionBeanzSubscriptionAlt);
    hashMap.put("beanzSubscriptionText", subscriptionBeanzSubscriptionText);
    hashMap.put("beanzSubscriptionUrl", subscriptionBeanzSubscriptionUrl);
    hashMap.put("beanzSubscriptionLabel", subscriptionBeanzSubscriptionLabel);
    hashMap.put("maintenanceSuppliesImageSrc", subscriptionMaintenanceSuppliesImageSrc);
    hashMap.put("maintenanceSuppliesImageAlt", subscriptionMaintenanceSuppliesAlt);
    hashMap.put("maintenanceSuppliesText", subscriptionMaintenanceSuppliesText);
    hashMap.put("maintenanceSuppliesUrl", subscriptionMaintenanceSuppliesUrl);
    hashMap.put("maintenanceSuppliesLabel", subscriptionMaintenanceSuppliesLabel);
    hashMap.put("beanzSubscriptionEditUrl", subscriptionBeanzSubscriptionEditUrl);
    hashMap.put("beanzSubscriptionEditLabel", subscriptionBeanzSubscriptionEditLabel);
    Gson gson = new Gson();
    return gson.toJson(hashMap);
  }
}
