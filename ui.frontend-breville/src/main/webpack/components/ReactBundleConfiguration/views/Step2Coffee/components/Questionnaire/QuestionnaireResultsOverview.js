import React from 'react';
import { array, func } from 'prop-types';
import { Button } from 'xps-react/core';
import { keypressEnterSpace } from 'xps-utils/wcag/keypressEnterSpace';

export const QuestionnaireResultsOverview = ( { answered, startOver } ) => {
  function onKeyPressEvent( event ) {
    keypressEnterSpace( event, startOver );
  }

  return (
    <div className='cmp-questionnaire-result-overview'>
      <h4 className='cmp-questionnaire-result-overview--label-choice'>Your Choices:</h4>
      { answered.map( ( ans, idx ) => (
        <div className='cmp-questionnaire-result-overview--answer' key={ idx }>
          { ans.ansText }
        </div>
      ) ) }
      <Button
        className='cmp-questionnaire-result-overview--link'
        onClick={ startOver }
        onKeyPress={ onKeyPressEvent }
        textType='bold'
        size='small'
        colorScheme='none'
      >Start over</Button>
    </div>
  );
};

QuestionnaireResultsOverview.propTypes = {
  answered: array,
  startOver: func
};
