package com.breville.aem.brands.core.models.recipe;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.breville.aem.brands.core.models.recipe.RecipeOverview.RecipeDetail;
import com.breville.aem.brands.core.models.SlingModelTest;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class RecipeOverviewModelTest extends SlingModelTest {

    private final AemContext ctx = new AemContext(ResourceResolverType.JCR_MOCK);
    private static final String TEST_JSON = "/coffeehub/components/recipeoverview/RecipeOverviewModelTest.json";
    private static final String TEST_PAGE = "/content";
    private static final String FULL_INFO_RESOURCE_PATH = "/content/full_info";
    private static final String BLANK_VALUE_RESOURCE_PATH = "/content/blank_info";
    private static final String NULL_VALUE_RESOURCE_PATH = "/content/null_info";

    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(RecipeOverview.class);
        ctx.load().json(TEST_JSON, TEST_PAGE);
    }

    @Test
    void givenAll_whenCheckEmpty_thenReturnFalse() {
        testSlingResourceGetter(RecipeOverview.class, FULL_INFO_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenAll_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeOverview.class, FULL_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenAll_whenGetRecipeDetail_thenReturnObjectWithCorrectValue() {
        ctx.currentResource(FULL_INFO_RESOURCE_PATH);
        RecipeOverview recipeOverview = ctx.request().adaptTo(RecipeOverview.class);
        RecipeDetail recipeDetail = recipeOverview.getRecipeDetail();
        assertThat(recipeDetail.getRecipeName().equals("Macchiato"));
        assertThat(recipeDetail.getHeroImage().equals("/content/Macchiato 2.png"));
        assertThat(recipeDetail.getHeroVideo().equals("/content/Macchiato 2.mp4"));
        assertThat(recipeDetail.getRecipeAuthor().equals("test author"));
        assertThat(recipeDetail.getRecipeOwner().equals("test owner"));
        assertThat(recipeDetail.getRegion().equals("Australia"));
        assertThat(recipeDetail.getModelNumbers().equals("abc123"));
        assertThat(recipeDetail.getRecipeDescription().equals("<p>With a Macchiato coffee, the idea is to place a dash of nicely steamed, microfoam (bubbly) milk on top of an espresso shot, to add a touch of sweetness. Macchiato roughly translates as ‘mark’ or ‘spot’ in Italian, reflecting the mark or ‘stain’ left by the milk so Baristas could quickly distinguish it from an Espresso.&nbsp;&nbsp;</p>\n"));
        assertThat(recipeDetail.getSkillLevel().equals("Hard"));
        assertThat(recipeDetail.getTotalTime().equals("50"));
        assertThat(recipeDetail.getYield().equals("10"));
    }

    @Test
    void givenBlank_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeOverview.class, BLANK_VALUE_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenBlank_whenCheckError_thenReturnTrue() {
        testSlingResourceGetter(RecipeOverview.class, BLANK_VALUE_RESOURCE_PATH, "isError", true);
    }

    @Test
    void givenBlank_whenGetRecipeDetail_thenReturnObjectWithCorrectValue() {
        testSlingResourceGetter(RecipeOverview.class, BLANK_VALUE_RESOURCE_PATH, "getRecipeDetail", null);
    }

    @Test
    void givenNull_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeOverview.class, NULL_VALUE_RESOURCE_PATH, "isEmpty", true);
    }

    @Test
    void givenNull_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeOverview.class, NULL_VALUE_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenNull_whenGetRecipeDetail_thenReturnNull() {
        testSlingResourceGetter(RecipeOverview.class, NULL_VALUE_RESOURCE_PATH, "getRecipeDetail", null);

    }

    @Override
    protected AemContext getContext() {
        return this.ctx;
    }
}
