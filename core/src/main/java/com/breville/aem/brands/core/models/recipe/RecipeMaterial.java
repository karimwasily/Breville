package com.breville.aem.brands.core.models.recipe;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

public interface RecipeMaterial {

    public List<Equipment> getEquipments();

    public List<Ingredient> getIngredients();

    public String getEquipmentJson();

    public String getIngredientJson();

    public Boolean isEmpty();

    public Boolean isError();

    @Setter @Getter
    public class Equipment {
        private String equipmentName, equipmentImage, equipmentPurchaseLink, equipmentPurchaseLinkTitle, tooltipKeyword, tooltipText;
    }

    @Setter @Getter
    public class Ingredient {
        private String ingredientName, ingredientImage, ingredientPurchaseLink, ingredientPurchaseLinkTitle, ingredientAmount, ingredientSubtext, tooltipKeyword, tooltipText;
    }

}
