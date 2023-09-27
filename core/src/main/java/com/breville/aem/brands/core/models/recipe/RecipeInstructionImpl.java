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
        adapters = { RecipeInstruction.class },
        defaultInjectionStrategy = OPTIONAL,
        resourceType = { RecipeInstructionImpl.RESOURCE_TYPE }
)
@Exporter(name = "jackson", selector = "model", extensions = "json")
public class RecipeInstructionImpl implements RecipeInstruction {

    protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/recipe/recipeinstruction";

    private static final String RECIPE_PATH = "recipeContentFragmentPath";
    private static final String STEP_LIST = "stepInstructionList";
    private static final String STEP_TITLE = "stepTitle";
    private static final String STEP_TEXT = "stepText";
    private static final String STEP_IMAGE = "stepImage";
    private static final String STEP_GOAL = "stepGoal";
    private static final String STEP_TIP = "stepTip";
    private static final String START_MINUTE = "startMinute";
    private static final String START_SECOND = "startSecond";
    private static final String END_MINUTE = "endMinute";
    private static final String END_SECOND = "endSecond";
    private static final String STEP_VIDEO_LINK = "stepVideoLink";

    @SlingObject
    private ResourceResolver resourceResolver;
    @Inject
    private Page currentPage;
    
    private List<StepInstruction> stepInstructions;
    
    private String stepJson;

    private Boolean isEmpty = false;

    private Boolean isError = false;

    @PostConstruct
    protected void setup() {
        try {
            ValueMap valueMap = currentPage.getContentResource().getValueMap();
            String recipePath = valueMap.get(RECIPE_PATH, String.class);
            if(StringUtils.isNotBlank(recipePath)) {
                List<String> stepInstructionList = getStepInstructionList(recipePath);

                setStepInstructionList(stepInstructionList);
                convertToJson();
            }
            else {
                isEmpty = true;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeInstructionModel: Could not finalise post constructed setup. Please check the content fragment in page properties.", e);
        }   
    }

    private List<String> getStepInstructionList(String recipePath) {
        List<String> stepInstructionList = new ArrayList<>();
        try {
            Resource recipeResource = resourceResolver.getResource(recipePath);
            String stepInstructionString = recipeResource.adaptTo(ContentFragment.class).getElement(STEP_LIST).getContent();
            stepInstructionList = Arrays.asList(stepInstructionString.split("\n"));
        }
        catch(RuntimeException e) {
            isEmpty = true;
            log.error("RecipeInstructionModel: Could not get instruction list. Please check the input within the content fragment.", e);
        }
        return stepInstructionList;
    }

    private void setStepInstructionList(List<String> stepInstructionList) {
        try{
            if(stepInstructionList != null) {
                List<StepInstruction> allSteps = new ArrayList<>();
                for(String stepInstructionPath : stepInstructionList) {
                    StepInstruction stepInstruction = new StepInstruction();
                    Resource stepInstructionResource = resourceResolver.getResource(stepInstructionPath);
                    if(stepInstructionResource != null) {
                        ContentFragment stepInstructionContentFragment = stepInstructionResource.adaptTo(ContentFragment.class);
                        stepInstruction.setStepTitle(stepInstructionContentFragment.getElement(STEP_TITLE).getContent());
                        stepInstruction.setStepText(stepInstructionContentFragment.getElement(STEP_TEXT).getContent());
                        stepInstruction.setStepImage(stepInstructionContentFragment.getElement(STEP_IMAGE).getContent());
                        stepInstruction.setStepGoal(stepInstructionContentFragment.getElement(STEP_GOAL).getContent());
                        stepInstruction.setStepTip(stepInstructionContentFragment.getElement(STEP_TIP).getContent());
                        stepInstruction.setStepVideoLink(stepInstructionContentFragment.getElement(STEP_VIDEO_LINK).getContent());
                        String startMinuteString = stepInstructionContentFragment.getElement(START_MINUTE).getContent();
                        String startSecondString = stepInstructionContentFragment.getElement(START_SECOND).getContent();
                        if(startMinuteString != null && startSecondString != null) {
                            stepInstruction.setStartTime(Integer.parseInt(startMinuteString) * 60 + Integer.parseInt(startSecondString));
                        }
                        else {stepInstruction.setStartTime(0);}
                        String endMinuteString = stepInstructionContentFragment.getElement(END_MINUTE).getContent();
                        String endSecondString = stepInstructionContentFragment.getElement(END_SECOND).getContent();
                        if(endMinuteString != null && endSecondString != null) {
                            stepInstruction.setEndTime(Integer.parseInt(endMinuteString) * 60 + Integer.parseInt(endSecondString));
                        }
                        else {stepInstruction.setEndTime(0);}
                        allSteps.add(stepInstruction);
                    }
                }
                stepInstructions = allSteps;
            }
        }
        catch(RuntimeException e) {
            isError = true;
            log.error("RecipeInstructionModel: Error pulling data from recipe-step-instruction content fragment.", e);
        }
    }

    private void convertToJson() {
        Gson gson = new Gson();
        stepJson = gson.toJson(stepInstructions);
    }

    @Override 
    public List<StepInstruction> getStepInstructions() {
        if (stepInstructions == null ||  stepInstructions.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(stepInstructions);
    }

    @Override 
    public String getStepJson() {
        return StringUtils.isNotBlank(stepJson) ? stepJson : StringUtils.EMPTY;
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
