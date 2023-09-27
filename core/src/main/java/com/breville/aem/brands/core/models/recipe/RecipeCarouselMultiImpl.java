package com.breville.aem.brands.core.models.recipe;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import lombok.extern.slf4j.Slf4j;
import com.adobe.cq.dam.cfm.ContentFragment;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Model( adaptables = { SlingHttpServletRequest.class },
        adapters = { RecipeCarouselMulti.class },
        defaultInjectionStrategy = OPTIONAL,
        resourceType = { RecipeCarouselMultiImpl.RESOURCE_TYPE }
)
@Exporter(name = "jackson", selector = "model", extensions = "json")
public class RecipeCarouselMultiImpl implements RecipeCarouselMulti {

    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/recipe/recipecarouselmulti";
    private static final String RECIPE_PATH = "recipePath";
    private static final String RECIPE_LINK = "recipeLink";
    private static final String RECIPE_NAME = "recipeName";
    private static final String HERO_THUMBNAIL = "heroThumbnail";

    @Self
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ChildResource
    private List<Resource> recipePathList;

    private List<CoffeeRecipe> recipeList;

    private Boolean isEmpty = false;

    private Boolean isError = false;

    @PostConstruct
    protected void setup() {
        try {
            if(recipePathList != null && !recipePathList.isEmpty()) {
                List<CoffeeRecipe> allRecipeList = new ArrayList<>();
                for(Resource resource : recipePathList) {
                    ValueMap resourceMap = resource.getValueMap();
                    String recipePath = resourceMap.get(RECIPE_PATH, String.class);
                    String recipeLink = resourceMap.get(RECIPE_LINK, String.class);
                    Resource recipeResource = resourceResolver.getResource(recipePath);
                    if(recipeResource != null) {
                        ContentFragment recipeContentFragment = recipeResource.adaptTo(ContentFragment.class);
                        CoffeeRecipe coffeeRecipe = new CoffeeRecipe();
                        coffeeRecipe.setRecipeName(recipeContentFragment.getElement(RECIPE_NAME).getContent());
                        coffeeRecipe.setFileReference(recipeContentFragment.getElement(HERO_THUMBNAIL).getContent());
                        coffeeRecipe.setLink(recipeLink);
                        allRecipeList.add(coffeeRecipe);
                    }
                }
                recipeList = allRecipeList;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeCarouselMultiModel: Could not finalise post constructed setup. Please check the content fragment.", e);
        }
    }

    @Override
    public List<CoffeeRecipe> getRecipeList() {
        if (recipeList == null ||  recipeList.isEmpty()) {
            return new ArrayList<>();
        }
        return recipeList;
    }

    @Override
    public String getTitle() {
        return StringUtils.isNotBlank(title) ? title : StringUtils.EMPTY;
    }

    @Override
    public String getDescription() {
        return StringUtils.isNotBlank(description) ? description : StringUtils.EMPTY;
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
