import React from 'react';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';

import MyProductItemEmpty from './my-product-item-empty';
import TutorialNoProduct from './tutorial-no-product';
import MasterclassesNoProduct from './masterclasses-no-product';

const NoProductComponent = ( { tutorialData, masterClassesData } ) => {

  const { t } = useTranslation();

  return (
    <div className='mybreville__my-product'>
      <h3 className='my-product__count'>
        { t( 'eh-label-mybreville-my-product' ) }
        <span className='my-product__count-number'>0</span>
      </h3>
      <MyProductItemEmpty />
      <TutorialNoProduct tutorialData={ tutorialData } />
      <MasterclassesNoProduct masterClassesData={ masterClassesData } />
    </div>
  );
};

NoProductComponent.propTypes = {
  tutorialData: array,
  masterClassesData: array
};

export default NoProductComponent;