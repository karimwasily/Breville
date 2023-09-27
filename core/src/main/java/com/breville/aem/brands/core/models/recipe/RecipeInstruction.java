package com.breville.aem.brands.core.models.recipe;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

public interface RecipeInstruction {
    
    public List<StepInstruction> getStepInstructions();

    public String getStepJson();

    public Boolean isEmpty();

    public Boolean isError();

    @Getter @Setter
    public class StepInstruction {
        private String stepTitle, stepText, stepImage, stepVideoLink, stepGoal, stepTip;
        private Integer startTime, endTime;
    }

}
