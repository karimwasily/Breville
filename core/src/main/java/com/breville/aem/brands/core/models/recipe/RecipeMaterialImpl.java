package com.breville.aem.brands.core.models.recipe;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
@Model( adaptables = { SlingHttpServletRequest.class },
        adapters = { RecipeMaterial.class },
        defaultInjectionStrategy = OPTIONAL,
        resourceType = { RecipeMaterialImpl.RESOURCE_TYPE }
)
@Exporter(name = "jackson", selector = "model", extensions = "json")
public class RecipeMaterialImpl implements RecipeMaterial {

    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/recipe/recipematerial";

    private static final String RECIPE_PATH = "recipeContentFragmentPath";
    private static final String EQUIPMENT_LIST = "equipmentList";
    private static final String INGREDIENT_LIST = "ingredientList";

    private static final String EQUIPMENT_NAME = "specialisedEquipmentName";
    private static final String EQUIPMENT_IMAGE = "specialisedEquipmentImage";
    private static final String EQUIPMENT_LINK = "equipmentPurchaseLink";
    private static final String EQUIPMENT_LINK_TITLE = "purchaseLinkTitle";
    private static final String EQUIPMENT_TOOLTIP_KEYWORD = "tooltipKeyword";
    private static final String EQUIPMENT_TOOLTIP_TEXT = "tooltipText";

    private static final String INGREDIENT_PATH = "ingredientPath";
    private static final String INGREDIENT_NAME = "ingredientName";
    private static final String INGREDIENT_IMAGE = "ingredientImage";
    private static final String INGREDIENT_LINK = "ingredientPurchaseLink";
    private static final String INGREDIENT_LINK_TITLE = "purchaseLinkTitle";
    private static final String INGREDIENT_AMOUNT = "ingredientAmount";
    private static final String INGREDIENT_SUBTEXT = "ingredientSubtext";
    private static final String INGREDIENT_TOOLTIP_KEYWORD = "tooltipKeyword";
    private static final String INGREDIENT_TOOLTIP_TEXT = "tooltipText";

    @SlingObject
    private ResourceResolver resourceResolver;
    @Inject
    private Page currentPage;

    private List<Equipment> equipments;

    private List<Ingredient> ingredients;

    private String equipmentJson;

    private String ingredientJson;

    private Boolean isEmpty = false;

    private Boolean isError = false;

    @PostConstruct
    protected void setup() {
        try {
            ValueMap valueMap = currentPage.getContentResource().getValueMap();
            String recipePath = valueMap.get(RECIPE_PATH, String.class);
            if(StringUtils.isNotBlank(recipePath)) {
                List<String> equipmentList = getEquipmentList(recipePath);
                List<String> ingredientList = getIngredientList(recipePath);

                setEquipmentList(equipmentList);
                setIngredientList(ingredientList);
                convertToJson();
            }
            else {
                isEmpty = true;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeMaterialModel: Could not finalise post constructed setup. Please check the content fragment.", e);
        }
    }

    private List<String> getEquipmentList(String recipePath) {
        List<String> equipmentList = new ArrayList<>();
        try {
            Resource recipeResource = resourceResolver.getResource(recipePath);
            String equipmentsString = recipeResource.adaptTo(ContentFragment.class).getElement(EQUIPMENT_LIST).getContent();
            equipmentList = Arrays.asList(equipmentsString.split("\n"));
        }
        catch(RuntimeException e) {
            isEmpty = true;
            log.error("RecipeMaterialModel: Could not get equipment list. Please check the input within the content fragment.", e);
        }
        return equipmentList;
    }

    private List<String> getIngredientList(String recipePath) {
        List<String> ingredientList = new ArrayList<>();
        try {
            Resource recipeResource = resourceResolver.getResource(recipePath);
            String ingredientString = recipeResource.adaptTo(ContentFragment.class).getElement(INGREDIENT_LIST).getContent();
            ingredientList = Arrays.asList(ingredientString.split("\n"));
        }
        catch(RuntimeException e) {
            isEmpty = true;
            log.error("RecipeMaterialModel: Could not get ingredient list. Please check the input within the content fragment.", e);
        }
        return ingredientList;
    }

    private void setEquipmentList(List<String> equipmentList) {
        try{
            if(equipmentList != null) {
                List<Equipment> allEquipments = new ArrayList<>();
                for(String equipmentPath : equipmentList) {
                    Equipment equipment = new Equipment();
                    Resource equipmentResource = resourceResolver.getResource(equipmentPath);
                    if(equipmentResource != null) {
                        ContentFragment equipmentContentFragment = equipmentResource.adaptTo(ContentFragment.class);
                        equipment.setEquipmentName(equipmentContentFragment.getElement(EQUIPMENT_NAME).getContent());
                        equipment.setEquipmentImage(equipmentContentFragment.getElement(EQUIPMENT_IMAGE).getContent());
                        equipment.setEquipmentPurchaseLink(equipmentContentFragment.getElement(EQUIPMENT_LINK).getContent());
                        equipment.setEquipmentPurchaseLinkTitle(equipmentContentFragment.getElement(EQUIPMENT_LINK_TITLE).getContent());
                        equipment.setTooltipKeyword(equipmentContentFragment.getElement(EQUIPMENT_TOOLTIP_KEYWORD).getContent());
                        equipment.setTooltipText(equipmentContentFragment.getElement(EQUIPMENT_TOOLTIP_TEXT).getContent());
                        allEquipments.add(equipment);
                    }
                }
                equipments = allEquipments;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeMaterialModel: Error pulling data from equipment-detail content fragment", e);
        }
    }

    private void setIngredientList(List<String> ingredientList) {
        try{
            if(ingredientList != null) {
                List<Ingredient> allIngredients = new ArrayList<>();
                for(String ingredientPath : ingredientList) {
                    Ingredient ingredient = new Ingredient();
                    Resource ingredientResource = resourceResolver.getResource(ingredientPath);
                    if(ingredientResource != null) {
                        ContentFragment ingredientContentFragment = ingredientResource.adaptTo(ContentFragment.class);
                        ContentFragment ingredientDataContentFragment = getIngredientData(ingredientContentFragment.getElement(INGREDIENT_PATH).getContent());
                        if(ingredientDataContentFragment != null) {
                            ingredient.setIngredientName(ingredientDataContentFragment.getElement(INGREDIENT_NAME).getContent());
                            ingredient.setIngredientImage(ingredientDataContentFragment.getElement(INGREDIENT_IMAGE).getContent());
                            ingredient.setIngredientPurchaseLink(ingredientDataContentFragment.getElement(INGREDIENT_LINK).getContent());
                            ingredient.setIngredientPurchaseLinkTitle(ingredientDataContentFragment.getElement(INGREDIENT_LINK_TITLE).getContent());
                            ingredient.setTooltipKeyword(ingredientDataContentFragment.getElement(INGREDIENT_TOOLTIP_KEYWORD).getContent());
                            ingredient.setTooltipText(ingredientDataContentFragment.getElement(INGREDIENT_TOOLTIP_TEXT).getContent());
                            ingredient.setIngredientAmount(ingredientContentFragment.getElement(INGREDIENT_AMOUNT).getContent());
                            ingredient.setIngredientSubtext(ingredientContentFragment.getElement(INGREDIENT_SUBTEXT).getContent());
                            allIngredients.add(ingredient);
                        }
                    }
                }
                ingredients = allIngredients;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeMaterialModel: Error pulling data from ingredient-usage content fragment", e);
        }
    }

    private ContentFragment getIngredientData(String ingredientDataPath) {
        try {
            if(ingredientDataPath != null) {
                Resource ingredientDataResource = resourceResolver.getResource(ingredientDataPath);
                if(ingredientDataResource != null) {
                    return ingredientDataResource.adaptTo(ContentFragment.class);
                }
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeMaterialModel: Error pulling data from ingredient-usage content fragment", e);
        }
        return null;
    }

    private void convertToJson() {
        Gson gson = new Gson();
        equipmentJson = gson.toJson(equipments);
        ingredientJson = gson.toJson(ingredients);
    }

    @Override 
    public List<Equipment> getEquipments() {
        if (equipments == null ||  equipments.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(equipments);
    }

    @Override 
    public List<Ingredient> getIngredients() {
        if (ingredients == null ||  ingredients.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(ingredients);
    }

    @Override 
    public String getEquipmentJson() {
        return StringUtils.isNotBlank(equipmentJson) ? equipmentJson : StringUtils.EMPTY;
    }

    @Override 
    public String getIngredientJson() {
        return StringUtils.isNotBlank(ingredientJson) ? ingredientJson : StringUtils.EMPTY;
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
