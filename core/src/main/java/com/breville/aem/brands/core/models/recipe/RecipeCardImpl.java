package com.breville.aem.brands.core.models.recipe;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import javax.annotation.PostConstruct;
import com.google.gson.Gson;
import com.adobe.cq.dam.cfm.ContentFragment;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.Self;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Model( adaptables = { SlingHttpServletRequest.class, Resource.class }, 
        adapters = { RecipeCard.class },
        resourceType = RecipeCardImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = OPTIONAL
)
@Exporter(name = "jackson", selector = "model", extensions = "json")
public class RecipeCardImpl implements RecipeCard {
    protected static final String RESOURCE_TYPE = "breville-brands/coffeehub/components/recipe/recipecard";
    private static final String RECIPE_NAME = "recipeName";
    private static final String HERO_THUMBNAIL = "heroThumbnail";
    private static final String RECIPE_INTRO_TEXT = "recipeIntroText";

    @Self
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String recipeContentFragmentPath;

    @ValueMapValue
    private String fileReference;

    private Card recipe;

    private String recipeJson;

    private Boolean isError = false;
    
    private Boolean isEmpty = false;

    @PostConstruct
    protected void setup() {
        try{
            if(recipeContentFragmentPath != null && StringUtils.isNotBlank(recipeContentFragmentPath)) {
                Resource recipeResource = resourceResolver.getResource(recipeContentFragmentPath);
                Card recipeCard = new Card();
                if(recipeResource != null) {
                    ContentFragment recipeContentFragment = recipeResource.adaptTo(ContentFragment.class);
                    
                    recipeCard.setRecipeName(recipeContentFragment.getElement(RECIPE_NAME).getContent());
                    recipeCard.setThumbnail(recipeContentFragment.getElement(HERO_THUMBNAIL).getContent());
                    recipeCard.setIntroText(recipeContentFragment.getElement(RECIPE_INTRO_TEXT).getContent());
                    convertToJson();
                }
                recipe = recipeCard;
            }
            else {
                isEmpty = true;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error(e.toString());
            log.error("RecipeCardModel: Could not finalise post construct setup. Please check the content fragment.");
        }
    }

    private void convertToJson() {
        Gson gson = new Gson();
        recipeJson = gson.toJson(recipe);
    }

    @Override
    public String getBackgroundImageReference() {
        return StringUtils.isNotBlank(fileReference) ? fileReference : StringUtils.EMPTY;
    }

    @Override
    public Card getRecipe() {
        return recipe;
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