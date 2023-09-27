import React from 'react';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'xps-react/core';
import ProductTutorial from './product-tutorial';

const RegisteredProductInformationTutorial = ( { tutorialData } ) => {

  const { t } = useTranslation();

  return (
    <div className='registered-product-information__tutorial'>
      <ProductTutorial data={ tutorialData } />
      <div className='registered-product-tutorials__button-wrapper'>
        <Button
          className='registered-product-tutorials__button'
          size='small'
          colorScheme='black'
        >
          { t( 'eh-label-view-all-tutorials' ) } (35)
        </Button>
      </div>
    </div>
  );
};

RegisteredProductInformationTutorial.propTypes = {
  tutorialData: array
};

export default RegisteredProductInformationTutorial;