package com.breville.aem.brands.core.models.recipe;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.breville.aem.brands.core.models.recipe.RecipeCard.Card;
import com.breville.aem.brands.core.models.SlingModelTest;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class RecipeCardModelTest extends SlingModelTest {

    private final AemContext ctx = new AemContext(ResourceResolverType.JCR_MOCK);
    private static final String TEST_JSON = "/coffeehub/components/recipecard/RecipeCardModelTest.json";
    private static final String TEST_PAGE = "/content";
    private static final String FULL_INFO_RESOURCE_PATH = "/content/full_info";
    private static final String BLANK_VALUE_RESOURCE_PATH = "/content/blank_info";
    private static final String NULL_VALUE_RESOURCE_PATH = "/content/null_info";
    private static final String INCORRECT_INFO_RESOURCE_PATH = "/content/incorrect_info";

    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(RecipeCard.class);
        ctx.load().json(TEST_JSON, TEST_PAGE);
    }

    @Test
    void givenAll_whenGetRecipeList_thenReturnListOfRecipeWithCorrectInformation() {
        ctx.currentResource(FULL_INFO_RESOURCE_PATH);
        RecipeCard recipeCardCarousel = ctx.request().adaptTo(RecipeCard.class);
        Card recipeCard = recipeCardCarousel.getRecipe();
        assertThat(recipeCard.getRecipeName().equals("Macchiato"));
        assertThat(recipeCard.getThumbnail().equals("/content/dam/coffeehub/en/us/recipes/recipes-detail/recipe/macchiato/Macchiato 2.png"));
        assertThat(recipeCard.getIntroText().equals("The point of this drink is to have an espresso slightly moderated or subdued by a splash of milk."));
    }

    @Test
    void givenBlank_whenGetRecipeList_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeCard.class, BLANK_VALUE_RESOURCE_PATH, "getRecipe", null);
    }

    @Test
    void givenNull_whenGetRecipeList_thenReturnEmptyList() {
        testSlingResourceGetter(RecipeCard.class, NULL_VALUE_RESOURCE_PATH, "getRecipe", null);
    }

    @Test
    void givenAll_whenGetBackgroundImageReference_thenReturnFileReference() {
        testSlingResourceGetter(RecipeCard.class, FULL_INFO_RESOURCE_PATH, "getBackgroundImageReference", "/content/dam/coffeehub/en/us/heroes/third-wave-hero-video.jpg");
    }

    @Test
    void givenBlank_whenGetBackgroundImageReference_thenReturnFileReference() {
        testSlingResourceGetter(RecipeCard.class, BLANK_VALUE_RESOURCE_PATH, "getBackgroundImageReference", "");
    }

    @Test
    void givenNull_whenGetBackgroundImageReference_thenReturnFileReference() {
        testSlingResourceGetter(RecipeCard.class, NULL_VALUE_RESOURCE_PATH, "getBackgroundImageReference", "");
    }

    @Test
    void givenAll_whenCheckEmpty_thenReturnFalse() {
        testSlingResourceGetter(RecipeCard.class, FULL_INFO_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenBlank_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeCard.class, BLANK_VALUE_RESOURCE_PATH, "isEmpty", true);
    }

    @Test
    void givenNull_whenCheckEmpty_thenReturnTrue() {
        testSlingResourceGetter(RecipeCard.class, NULL_VALUE_RESOURCE_PATH, "isEmpty", true);
    }

    @Test
    void givenIncorrect_whenCheckEmpty_thenReturnFalse() {
        testSlingResourceGetter(RecipeCard.class, INCORRECT_INFO_RESOURCE_PATH, "isEmpty", false);
    }

    @Test
    void givenAll_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeCard.class, FULL_INFO_RESOURCE_PATH, "isError", false);
    }

    @Test
    void givenBlank_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeCard.class, FULL_INFO_RESOURCE_PATH, "isError", false);
    }
    

    @Test
    void givenNull_whenCheckError_thenReturnFalse() {
        testSlingResourceGetter(RecipeCard.class, FULL_INFO_RESOURCE_PATH, "isError", false);
    }
    

    @Test
    void givenIncorrect_whenCheckError_thenReturnTrue() {
        testSlingResourceGetter(RecipeCard.class, INCORRECT_INFO_RESOURCE_PATH, "isError", true);
    }

    @Override
    protected AemContext getContext() {
        return this.ctx;
    }
}
