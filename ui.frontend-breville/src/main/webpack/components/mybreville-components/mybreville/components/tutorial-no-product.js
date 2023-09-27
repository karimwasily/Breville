

import React from 'react';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';
import ProductTutorial from './product-tutorial';

const TutorialNoProduct = ( { tutorialData } ) => {

  const { t } = useTranslation();

  return (
    <div className='mybreville__my-product-tutorial'>
      <h3 className='mybreville__my-product-tutorial-title'>{ t( 'eh-tutorials-no-orders-title' ) }</h3>
      <p className='mybreville__my-product-tutorial-subtext'>{ t( 'eh-tutorials-no-orders-description' ) }</p>
      <ProductTutorial data={ tutorialData } />
    </div>
  );
};

TutorialNoProduct.propTypes = {
  tutorialData: array
};

export default TutorialNoProduct;
