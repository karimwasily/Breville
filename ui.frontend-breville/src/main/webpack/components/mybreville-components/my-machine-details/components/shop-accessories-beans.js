import React from 'react';
import { useSelector } from 'react-redux';
import { selectMyBrevilleAemData } from 'library/store/mybreville/selector';
import { useTranslation } from 'react-i18next';
import { Button } from 'xps-react/core';

const ShopAccessoriesBeans = () => {
  const { t } = useTranslation();
  const aemData = useSelector( selectMyBrevilleAemData );

  return (
    <div className='shop-accessories-beans'>

      <h3 className='shop-accessories-beans__title'>{ t( 'eh-title-shop-accessories-beans' ) }</h3>
      <div className='shop-accessories-beans__link-wrapper'><a className='shop-accessories-beans__link' href='#'>{ t( 'eh-link-shop-more-accessories' ) }</a></div>
      <div className='shop-accessories-beans__tile-maintenance'>
        <img src={ aemData?.maintenanceSuppliesImageSrc } className='shop-accessories-beans__tile-img' alt={ aemData?.maintenanceSuppliesImageAlt } />
        <Button
          className='shop-accessories-beans__button'
          size='medium'
          colorScheme='black'
          href={ aemData?.maintenanceSuppliesUrl || '#' }
          target='_blank'
          aria-label={ aemData?.maintenanceSuppliesLabel || '' }
        >
          { aemData?.maintenanceSuppliesText || '' }
        </Button>
      </div>
      <div className='shop-accessories-beans__tile-shop'>
        <img src={ aemData?.beanzSubscriptionImageSrc } className='shop-accessories-beans__tile-img' alt={ aemData?.beanzSubscriptionImageAlt } />
        <div className='shop-accessories-beans__tile-shop-wrapper'>
          <p className='shop-accessories-beans__tile-shop-wrapper-text'>{ t( 'eh-text-shop-beanz' ) }</p>
          <Button
            className='shop-accessories-beans__tile-shop-wrapper-button'
            size='medium'
            colorScheme='black'
            href={ aemData?.beanzSubscriptionUrl || '#' }
            target='_blank'
            aria-label={ aemData?.beanzSubscriptionLabel || '' }
          >
            { aemData?.beanzSubscriptionText || '' }
          </Button>
        </div>
      </div>
    </div>
  );
};

ShopAccessoriesBeans.propTypes = {
};

export default ShopAccessoriesBeans;