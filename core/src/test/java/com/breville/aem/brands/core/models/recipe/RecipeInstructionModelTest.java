package com.breville.aem.brands.core.models.recipe;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.breville.aem.brands.core.models.recipe.RecipeInstruction.StepInstruction;
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
class RecipeInstructionModelTest extends SlingModelTest {

    private final AemContext ctx = new AemContext(ResourceResolverType.JCR_MOCK);
    private static final String TEST_JSON = "/coffeehub/components/recipeinstruction/RecipeInstructionModelTest.json";
    private static final String TEST_PAGE = "/content";
    private static final String FULL_INFO_RESOURCE_PATH = "/content/full_info";
    private static final String BLANK_INFO_RESOURCE_PATH = "/content/blank_info";
    private static final String BLANK_RECIPE_INFO_RESOURCE_PATH = "/content/blank_recipe_info";
    private static final String BLANK_CF_INFO_RESOURCE_PATH = "/content/blank_cf_info";

    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(RecipeInstruction.class);
        ctx.load().json(TEST_JSON, TEST_PAGE);
    }
    
    @Test
    void givenAll_whenCheckEmpty_thenReturnFalse() {
        testSlingResourceGetter(RecipeInstruction.class, FULL_INFO_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenAll_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeInstruction.class, FULL_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenAll_whenGetStepInstructions_thenReturnListSizeOfOneContentFragmentWithCorrectValue() {
        ctx.currentResource(FULL_INFO_RESOURCE_PATH);
        RecipeInstruction recipeInstructionModel = ctx.request().adaptTo(RecipeInstruction.class);
        List<StepInstruction> stepList = recipeInstructionModel.getStepInstructions();
        StepInstruction stepContent = stepList.get(0);
        assertThat(stepList.size() == 1);
        assertThat(stepContent.getStepTitle().equals("Step 1"));
        assertThat(stepContent.getStepText().equals("<p>Extract a single Espresso into a serving glass or cup</p>"));
        assertThat(stepContent.getStepImage().equals("/content/dam/assets.jpeg"));
        assertThat(stepContent.getStepVideoLink().equals("https://www.youtube.com"));
        assertThat(stepContent.getStepGoal().equals("test goal"));
        assertThat(stepContent.getStepTip().equals("test tip"));
        assertThat(stepContent.getStartTime().equals(70));
        assertThat(stepContent.getEndTime().equals(75));
    }

    @Test
    void givenBlankPath_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_INFO_RESOURCE_PATH, "isEmpty", true);
    }

    @Test
    void givenBlankPath_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenBlankPath_whenGetStepInstructions_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_INFO_RESOURCE_PATH, "getStepInstructions", new ArrayList<>());
    }

    @Test
    void givenBlankRecipe_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_RECIPE_INFO_RESOURCE_PATH, "isEmpty", true);
    }

    @Test
    void givenBlankRecipe_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_RECIPE_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenBlankRecipe_whenGetStepInstructions_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_RECIPE_INFO_RESOURCE_PATH, "getStepInstructions", new ArrayList<>());
    }

    @Test
    void givenBlankContentFragment_whenCheckEmpty_thenReturnFalse() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_CF_INFO_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenBlankContentFragment_whenCheckError_thenReturnTrue() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_CF_INFO_RESOURCE_PATH, "isError", true);
    }

    @Test
    void givenBlankContentFragment_whenGetStepInstructions_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeInstruction.class, BLANK_CF_INFO_RESOURCE_PATH, "getStepInstructions", new ArrayList<>());
    }

    @Override
    protected AemContext getContext() {
        return this.ctx;
    }
}
