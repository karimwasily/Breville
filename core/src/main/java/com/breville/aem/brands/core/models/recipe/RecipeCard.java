package com.breville.aem.brands.core.models.recipe;

import lombok.Getter;
import lombok.Setter;

public interface RecipeCard {

    public String getBackgroundImageReference();

    public Card getRecipe();
    
    public String getRecipeJson();

    public Boolean isEmpty();

    public Boolean isError();

    @Setter @Getter
    public static class Card {
        private String recipeName, thumbnail, introText;
    }
}
