package com.breville.aem.brands.core.models.recipe;

import lombok.Getter;
import lombok.Setter;

public interface RecipeOverview {
    
    public RecipeDetail getRecipeDetail();

    public String getRecipeJson();

    public Boolean isEmpty();

    public Boolean isError();

    @Setter @Getter
    public static class RecipeDetail {
        private String recipeName, heroImage, heroVideo,
            recipeAuthor, recipeOwner, region, modelNumbers, 
            recipeDescription, skillLevel, totalTime, yield;
    }
    
}
