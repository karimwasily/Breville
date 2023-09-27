import React from 'react';
import { func, bool, array, object } from 'prop-types';
import classNames from 'classnames';
import { Button } from 'xps-react/core';
import { QuestionnaireSelectDesktop } from './components/QuestionnaireSelectDesktop';
import { QuestionnaireSelectMobile } from './components/QuestionnaireSelectMobile';

export const QuestionnaireLanding = ( {
  handleComplete,
  isComplete = false,
  answered,
  handleAnswer,
  questionAnswers,
  baristaChoiceQuestion
} ) => {
  function isDisabled( answered, currentPosition ) {
    return answered.length < currentPosition;
  }

  function handleChangeMobile( qaIndex, question, e ) {
    question.answers.filter( ( ans ) => {
      if ( ans.ansText === e.target.value ) {
        handleAnswer( ans, qaIndex );
      }
    } );
  }

  return (
    <>
      <ol>
        { questionAnswers.map( ( qa, qaIndex ) => (
          <li key={ qa.serial }
            className={ classNames(
              'questionnaire__item',
              {
                'questionnaire__item--disabled': isDisabled( answered, qaIndex )
              }
            ) }
            style={{
              opacity: isDisabled( answered, qaIndex ) ? 0.5 : 'inherit'
            }}
          >
            <h4 className='questionnaire__question'>
              { qa.question }
            </h4>

            <QuestionnaireSelectDesktop
              answers={ qa.answers }
              answered={ answered }
              handleAnswer={ handleAnswer }
              isDisabled={ isDisabled }
              className='questionnaire__desktop'
              qaIndex={ qaIndex }
            />
            <QuestionnaireSelectMobile
              answered={ answered }
              handleChange={ handleChangeMobile }
              isDisabled={ isDisabled }
              qa={ qa }
              qaIndex={ qaIndex }
              className='questionnaire__mobile'
            />

          </li>
        ) ) }
        <li key={ questionAnswers.length + 1 }
          className={ classNames(
              'questionnaire__item',
              {
                'questionnaire__item--disabled': isDisabled( answered, questionAnswers.length )
              }
            ) }
          style={{
              opacity: isDisabled( answered, questionAnswers.length ) ? 0.5 : 'inherit'
            }}
        >
          <h4 className='questionnaire__question'>
            { baristaChoiceQuestion.question }
          </h4>

          <QuestionnaireSelectDesktop
            answers={ baristaChoiceQuestion.answers }
            answered={ answered }
            handleAnswer={ handleAnswer }
            isDisabled={ isDisabled }
            className='questionnaire__desktop'
            qaIndex={ questionAnswers.length }
          />
          <QuestionnaireSelectMobile
            answered={ answered }
            handleChange={ handleChangeMobile }
            isDisabled={ isDisabled }
            qa={ baristaChoiceQuestion }
            qaIndex={ questionAnswers.length }
            className='questionnaire__mobile'
          />

        </li>
      </ol>
      <Button
        size='medium'
        textType='bold'
        onClick={ handleComplete }
        disabled={ !isComplete }
        colorScheme={ `${ !isComplete ? 'grey' : 'green' }` }
        className='questionnaire__btn-find-coffee'
      >Find my perfect coffee</Button>
    </>
  );
};

QuestionnaireLanding.propTypes = {
  handleComplete: func,
  isComplete: bool,
  answered: array,
  handleAnswer: func,
  questionAnswers: array,
  baristaChoiceQuestion: object
};
