import React from 'react';
import { array } from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectGeneralAemData } from 'library/store/mybreville/selector';
import { Button } from 'xps-react/core';
import ProductMasterclass from './product-masterclass';

const RegisteredProductInformationMasterclass = ( { masterClassesData } ) => {

  const { t } = useTranslation();
  const generalAemData = useSelector( selectGeneralAemData );
  const eventBriteUrl = generalAemData?.eventBriteUrl;

  // TODO - MASTERCLASS FOR INDIVIDUAL PRODUCT IS NOT AVAILABLE YET
  return ( masterClassesData?.length < -1 ?
    (
      <div className='registered-product-information__masterclass'>
        <ProductMasterclass masterClassesData={ masterClassesData } />
        <div className='registered-product-masterclass__button-wrapper'>
          <Button
            className='registered-product-masterclass__button'
            size='small'
            colorScheme='black'
          >
            { t( 'eh-masterclasses-button-text' ) } ({ masterClassesData?.length })
          </Button>
        </div>
      </div>
    )
    :
    (
      <div className='registered-product-information__masterclass--empty'>
        <p className='registered-product-masterclass__title'>{ t( 'eh-masterclasses-title-coming-soon' ) }</p>
        <div className='registered-product-masterclass__button-wrapper'>
          <Button
            className='registered-product-masterclass__button'
            size='small'
            colorScheme='black'
            href={ eventBriteUrl || '#' }
            rel='noopener noreferrer'
            target='_blank'
          >
            { t( 'eh-masterclasses-eventbrite-button' ) }
          </Button>
        </div>
      </div>
    )
  );
};

RegisteredProductInformationMasterclass.defaultProps = {
  masterClassesData: []
};

RegisteredProductInformationMasterclass.propTypes = {
  masterClassesData: array
};

export default RegisteredProductInformationMasterclass;