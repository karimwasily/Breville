package com.breville.aem.brands.core.models.recipe;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.breville.aem.brands.core.models.recipe.RecipeMaterial.Equipment;
import com.breville.aem.brands.core.models.recipe.RecipeMaterial.Ingredient;
import com.breville.aem.brands.core.models.SlingModelTest;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class RecipeMaterialModelTest extends SlingModelTest {

    private final AemContext ctx = new AemContext(ResourceResolverType.JCR_MOCK);
    private static final String TEST_JSON = "/coffeehub/components/recipematerial/RecipeMaterialModelTest.json";
    private static final String TEST_PAGE = "/content";
    private static final String FULL_INFO_RESOURCE_PATH = "/content/full_info";
    private static final String BLANK_INFO_RESOURCE_PATH = "/content/blank_info";
    private static final String BLANK_RECIPE_INFO_RESOURCE_PATH = "/content/blank_recipe_info";
    private static final String BLANK_CF_INFO_RESOURCE_PATH = "/content/blank_cf_info";

    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(RecipeMaterial.class);
        ctx.load().json(TEST_JSON, TEST_PAGE);
    }

    @Test
    void givenAll_whenCheckEmpty_thenReturnFalse() {
        testSlingResourceGetter(RecipeMaterial.class, FULL_INFO_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenAll_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeMaterial.class, FULL_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenAll_whenGetEquipments_thenReturnListSizeOfOneContentFragmentWithCorrectValue() {
        ctx.currentResource(FULL_INFO_RESOURCE_PATH);
        RecipeMaterial RecipeMaterialModel = ctx.request().adaptTo(RecipeMaterial.class);
        List<Equipment> equipmentList = RecipeMaterialModel.getEquipments();
        Equipment equipment = equipmentList.get(0);
        assertThat(equipmentList.size() == 1);
        assertThat(equipment.getEquipmentName().equals("Small Glass or Demitasse"));
        assertThat(equipment.getEquipmentImage().equals("/content/dam/asset.jpeg"));
        assertThat(equipment.getEquipmentPurchaseLink().equals("https://www.google.com"));
        assertThat(equipment.getEquipmentPurchaseLinkTitle().equals("Test title"));
        assertThat(equipment.getTooltipKeyword().equals("Test keyword"));
        assertThat(equipment.getTooltipText().equals("<p>Test text</p>"));
    }

    @Test
    void givenAll_whenGetIngredients_thenReturnListSizeOfOneContentFragmentWithCorrectValue() {
        ctx.currentResource(FULL_INFO_RESOURCE_PATH);
        RecipeMaterial RecipeMaterialModel = ctx.request().adaptTo(RecipeMaterial.class);
        List<Ingredient> ingredientList = RecipeMaterialModel.getIngredients();
        Ingredient ingredient = ingredientList.get(0);
        assertThat(ingredientList.size() == 1);
        assertThat(ingredient.getIngredientName().equals("Espresso Shot"));
        assertThat(ingredient.getIngredientImage().equals("/content/dam/assets.jpeg"));
        assertThat(ingredient.getIngredientPurchaseLink().equals("https://www.google.com"));
        assertThat(ingredient.getIngredientPurchaseLinkTitle().equals("Test title"));
        assertThat(ingredient.getIngredientAmount().equals("50mg"));
        assertThat(ingredient.getTooltipKeyword().equals("Test keyword"));
        assertThat(ingredient.getTooltipText().equals("<p>Test text</p>"));
    }

    @Test
    void givenBlankPath_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_INFO_RESOURCE_PATH, "isEmpty", true);
    }

    @Test
    void givenBlankPath_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenBlankPath_whenGetEquipments_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_INFO_RESOURCE_PATH, "getEquipments", new ArrayList<>());
    }

    @Test
    void givenBlankPath_whenGetIngredients_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_INFO_RESOURCE_PATH, "getIngredients", new ArrayList<>());
    }

    @Test
    void givenBlankRecipe_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_RECIPE_INFO_RESOURCE_PATH, "isEmpty", true);
    }

    @Test
    void givenBlankRecipe_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_RECIPE_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenBlankRecipe_whenGetEquipments_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_RECIPE_INFO_RESOURCE_PATH, "getEquipments", new ArrayList<>());
    }

    @Test
    void givenBlankRecipe_whenGetIngredients_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_RECIPE_INFO_RESOURCE_PATH, "getIngredients", new ArrayList<>());
    }

    @Test
    void givenBlankContentFragment_whenCheckEmpty_thenReturnFalse() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_CF_INFO_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenBlankContentFragment_whenCheckError_thenReturnTrue() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_CF_INFO_RESOURCE_PATH, "isError", true);
    }

    @Test
    void givenBlankContentFragment_whenGetEquipments_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_CF_INFO_RESOURCE_PATH, "getEquipments", new ArrayList<>());
    }

    @Test
    void givenBlankContentFragment_whenGetIngredients_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeMaterial.class, BLANK_CF_INFO_RESOURCE_PATH, "getIngredients", new ArrayList<>());
    }

    @Override
    protected AemContext getContext() {
        return this.ctx;
    }
}
