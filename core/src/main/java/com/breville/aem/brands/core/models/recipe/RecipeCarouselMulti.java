package com.breville.aem.brands.core.models.recipe;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

public interface RecipeCarouselMulti {

    public String getTitle();

    public String getDescription();

    public List<CoffeeRecipe> getRecipeList();

    public Boolean isEmpty();

    public Boolean isError();
    
    @Setter @Getter
    public static class CoffeeRecipe {
        private String recipeName, fileReference, link;
    }
}
