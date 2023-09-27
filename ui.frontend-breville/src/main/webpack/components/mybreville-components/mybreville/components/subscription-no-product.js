import React from 'react';
import { useSelector } from 'react-redux';
import { selectMySubscriptionAemData } from 'library/store/mybreville/selector';
import { useTranslation } from 'react-i18next';
import { Button } from 'xps-react/core';

const SubscriptionNoProduct = () => {
  const { t } = useTranslation();
  const aemData = useSelector( selectMySubscriptionAemData );

  return (
    <div className='subscription-no-product'>
      <h3 className='subscription-no-product__title'>{ t( 'eh-title-start-a-subscription' ) }</h3>
      <p className='subscription-no-product__subtext'>{ t( 'eh-text-no-subscription' ) }</p>
      <div className='subscription-no-product__tile-wrapper'>
        <div className='subscription-no-product__tile-subscriptions'>
          <img src={ aemData?.beanzSubscriptionImageSrc } className='subscription-no-product__tile-img' alt={ aemData?.beanzSubscriptionImageAlt } />
          <Button
            className='subscription-no-product__button'
            size='medium'
            colorScheme='black'
            href={ aemData?.beanzSubscriptionUrl || '#' }
            target='_blank'
            aria-label={ aemData?.beanzSubscriptionLabel || '' }
          >
            { aemData?.beanzSubscriptionText || '' }
          </Button>
        </div>
        <div className='subscription-no-product__tile-maintenance'>
          <img src={ aemData?.maintenanceSuppliesImageSrc } className='subscription-no-product__tile-img' alt={ aemData?.maintenanceSuppliesImageAlt } />
          <Button
            className='subscription-no-product__button'
            size='medium'
            colorScheme='black'
            href={ aemData?.maintenanceSuppliesUrl || '#' }
            target='_blank'
            aria-label={ aemData?.maintenanceSuppliesLabel || '' }
          >
            { aemData?.maintenanceSuppliesText || '' }
          </Button>
        </div>
      </div>
    </div>
  );
};

SubscriptionNoProduct.propTypes = {
};

export default SubscriptionNoProduct;