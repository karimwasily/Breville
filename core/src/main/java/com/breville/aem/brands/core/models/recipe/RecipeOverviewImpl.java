package com.breville.aem.brands.core.models.recipe;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import com.google.gson.Gson;
import com.adobe.cq.dam.cfm.ContentFragment;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import com.day.cq.wcm.api.Page;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Model( adaptables = { SlingHttpServletRequest.class, Resource.class }, 
        adapters = { RecipeOverview.class },
        defaultInjectionStrategy = OPTIONAL,
        resourceType = { RecipeOverviewImpl.RESOURCE_TYPE }
)
@Exporter(name = "jackson", selector = "model", extensions = "json")
public class RecipeOverviewImpl implements RecipeOverview {

    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/recipe/recipeoverview";

    private static final String RECIPE_PATH = "recipeContentFragmentPath";
    private static final String RECIPE_NAME = "recipeName";
    private static final String HERO_IMAGE = "heroImage";
    private static final String HERO_VIDEO = "heroVideo";
    private static final String RECIPE_AUTHOR = "recipeAuthor";
    private static final String RECIPE_OWNER = "recipeOwner";
    private static final String REGION = "region";
    private static final String MODEL_NUMBERS = "modelNumbers";
    private static final String RECIPE_DESCRIPTION = "recipeDescription";
    private static final String SKILL_LEVEL = "skillLevel";
    private static final String TOTAL_TIME = "totalTime";
    private static final String YIELD = "yield";

    @SlingObject
    private ResourceResolver resourceResolver;
    @Inject
    private Page currentPage;
    
    private RecipeDetail recipeDetail;
    
    private String recipeJson;

    private Boolean isEmpty = false;

    private Boolean isError = false;

    @PostConstruct
    protected void setup() {
        try {
            ValueMap valueMap = currentPage.getContentResource().getValueMap();
            String recipePath = valueMap.get(RECIPE_PATH, String.class);
            if(StringUtils.isNotBlank(recipePath)) {
                Resource recipeResource = resourceResolver.getResource(recipePath);

                setRecipeDetail(recipeResource);
                convertToJson();
            }
            else {
                isEmpty = true;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeOverviewModel: Could not finalise post constructed setup. Please check the content fragment.", e);
        }
    }

    private void setRecipeDetail(Resource recipeContentFragmentResource) {
        try {
            if (recipeContentFragmentResource != null) {
                RecipeDetail recipeDetailObject = new RecipeDetail();
                ContentFragment recipeContentFragment = recipeContentFragmentResource.adaptTo(ContentFragment.class);
                recipeDetailObject.setRecipeName(recipeContentFragment.getElement(RECIPE_NAME).getContent());
                recipeDetailObject.setHeroImage(recipeContentFragment.getElement(HERO_IMAGE).getContent());
                recipeDetailObject.setHeroVideo(recipeContentFragment.getElement(HERO_VIDEO).getContent());
                recipeDetailObject.setRecipeAuthor(recipeContentFragment.getElement(RECIPE_AUTHOR).getContent());
                recipeDetailObject.setRecipeOwner(recipeContentFragment.getElement(RECIPE_OWNER).getContent());
                recipeDetailObject.setRegion(recipeContentFragment.getElement(REGION).getContent());
                recipeDetailObject.setModelNumbers(recipeContentFragment.getElement(MODEL_NUMBERS).getContent());
                recipeDetailObject.setRecipeDescription(recipeContentFragment.getElement(RECIPE_DESCRIPTION).getContent());
                recipeDetailObject.setSkillLevel(recipeContentFragment.getElement(SKILL_LEVEL).getContent());
                recipeDetailObject.setTotalTime(recipeContentFragment.getElement(TOTAL_TIME).getContent());
                recipeDetailObject.setYield(recipeContentFragment.getElement(YIELD).getContent());
                recipeDetail = recipeDetailObject;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error(e.toString());
            log.error("RecipeOverviewModel: Error pulling data from recipe detail content fragment", e);
        }
    }

    private void convertToJson() {
        Gson gson = new Gson();
        recipeJson = gson.toJson(recipeDetail);
    }

    @Override
    public RecipeDetail getRecipeDetail() {
        return recipeDetail;
    }

    @Override
    public String getRecipeJson() {
        return StringUtils.isNotBlank(recipeJson) ? recipeJson : StringUtils.EMPTY;
    }

    @Override
    public Boolean isEmpty() {
        return isEmpty;
    }

    @Override
    public Boolean isError() {
        return isError;
    }
}
