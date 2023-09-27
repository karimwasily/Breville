import React, { useState } from 'react';
import { useQuestionnaire } from './useQuestionnaire';
import { QuestionnaireLanding } from './QuestionnaireLanding';
import { QuestionnaireResults } from './QuestionnaireResults';
import { func, object, array } from 'prop-types';
import { withAem } from 'xps-utils/withAem';

export const QuestionnaireView = ( { handleProductSelect, selectedProduct, aemData } ) => {
  const [showResults, setShowResults] = useState( false );

  const vendorsData = aemData.roasters;

  const { isComplete, answered, handleAnswer, coffeeProducts, startOver, baristaChoiceFacet } = useQuestionnaire(
    aemData.questionnaire, aemData.baristaChoiceQuestion
  );

  function handleStartOver() {
    setShowResults( false );
    startOver();
  }

  return (
    <>
      { !showResults ? (
        <div className='questionnaire__container'>
          <QuestionnaireLanding
            handleComplete={ setShowResults }
            isComplete={ isComplete }
            answered={ answered }
            handleAnswer={ handleAnswer }
            questionAnswers={ aemData.questionnaire.questionAnswers }
            baristaChoiceQuestion={ aemData.baristaChoiceQuestion }
          />
        </div>
      ) : (
        <QuestionnaireResults
          startOver={ handleStartOver }
          answered={ answered }
          handleProductSelect={ handleProductSelect }
          selectedProduct={ selectedProduct }
          coffeeProducts={ coffeeProducts }
          baristaChoiceFacet={ baristaChoiceFacet }
          vendorsData={ vendorsData }
        />
      ) }
    </>
  );
};

QuestionnaireView.propTypes = {
  handleProductSelect: func,
  selectedProduct: object,
  aemData: object
};
export default withAem( QuestionnaireView );