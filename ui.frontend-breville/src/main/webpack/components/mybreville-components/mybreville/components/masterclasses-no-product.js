import React from 'react';
import { array } from 'prop-types';
import Button from 'xps-react/core/button';
import { useTranslation } from 'react-i18next';
import ProductMasterclass from './product-masterclass';

const MasterclassesNoProduct = ( { masterClassesData } ) => {
  const { t } = useTranslation();

  return (
    <div className='masterclasses__container'>
      <div>
        <h2 className='masterclasses__title'>{ t( 'eh-title-masterclasses-by-breville' ) }</h2>
        <p className='masterclasses__description'>{ t( 'eh-description-master-your-moment' ) }</p>
        <p className='masterclasses_subtitle'>{ t( 'eh-popular-classes-happening-soon' ) }</p>
      </div>
      <ProductMasterclass masterClassesData={ masterClassesData } />
      <div className='masterclasses__button-container'>
        <Button
          className='masterclasses__button'
          colorScheme='black'
        >
          { t( 'eh-label-discover-masterclasses' ) }
        </Button>
      </div>
    </div>
  );
};

MasterclassesNoProduct.propTypes = {
  masterClassesData: array
};

export default MasterclassesNoProduct;