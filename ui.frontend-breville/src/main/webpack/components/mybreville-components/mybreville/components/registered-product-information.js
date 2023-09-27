import React, { useState } from 'react';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'xps-react/core';
import RegisteredProductInformationTutorial from './registered-product-information-tutorial';
import RegisteredProductInformationMasterclass from './registered-product-information-masterclass';
import { TUTORIAL_TYPE, MASTERCLASS_TYPE, RECIPE_TYPE } from '../../constants';

const RegisteredProductInformation = ( { tutorialData, masterClassesData } ) => {

  const { t } = useTranslation();
  const [informationType, setInformationType] = useState( TUTORIAL_TYPE );

  function handleControllerClick( type ) {
    return function () {
      setInformationType( type );
    };
  }

  const relatedInformation = () => {
    switch ( informationType ) {
      case TUTORIAL_TYPE:
        return ( <RegisteredProductInformationTutorial tutorialData={ tutorialData } /> );
      case MASTERCLASS_TYPE:
        return ( <RegisteredProductInformationMasterclass masterClassesData={ masterClassesData } /> );
      case RECIPE_TYPE:
        return ( '' );
      default:
        return ( '' );
    }
  };

  return (
    <>
      <div className='registered-product-information__controller'>
        <Button
          className={ `registered-product-information__controller-button 
            ${ informationType === TUTORIAL_TYPE && 'registered-product-information__controller-button--active' }` }
          size='small' colorScheme='custom'
          onClick={ handleControllerClick( TUTORIAL_TYPE ) }
        >
          { t( 'eh-label-tutorials' ) }
        </Button>
        <Button
          className={ `registered-product-information__controller-button 
          ${ informationType === MASTERCLASS_TYPE && 'registered-product-information__controller-button--active' }` }
          size='small' colorScheme='custom'
          onClick={ handleControllerClick( MASTERCLASS_TYPE ) }
        >
          { t( 'eh-label-masterclasses' ) }
        </Button>
        { /*
        REMOVING AS NOT PART OF MVP
        <Button
          className={ `registered-product-information__controller-button
          ${ informationType === RECIPE_TYPE && 'registered-product-information__controller-button--active' }` }
          size='small' colorScheme='custom'
          onClick={ handleControllerClick( RECIPE_TYPE ) }
        >
          { t( 'eh-label-recipes' ) }
        </Button> */ }
      </div>
      { relatedInformation() }
    </>
  );
};

RegisteredProductInformation.defaultProps = {
  tutorialData: [],
  masterClassesData: []
};

RegisteredProductInformation.propTypes = {
  tutorialData: array,
  masterClassesData: array
};

export default RegisteredProductInformation;