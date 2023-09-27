import React from 'react';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';
import { useTranslation } from 'react-i18next';

const SubscriptionProductTiles = ( { item } ) => {
  const { t } = useTranslation();

  return (
    <div className= 'subscription-product__container'>
      <div>
        <img className='subscription-product__image' src={ item?.orderImages } alt='imageUrl' />
      </div>
      <div className='subscription-product__content'>
        <div className='subscription-product__container--main'>
          <div className='subscription-product__container--main-title-svg'>
            <Link className='subscription-product__container--main-title-svg-para' to='/my-subscriptions'>
              { item?.itemName || '' }
            </Link>
          </div>
          { item.itemFrequency && <div className='subscription-product__container--main-freqency' >
            { item.itemFrequency || '' }
          </div> }
          <div className={ String( item?.status ).toUpperCase() === t( 'eh-status-active' ).toUpperCase() ?
             'subscription-product__container--main-subscriptionActiveStatus' :
            'subscription-product__container--main-subscriptionPausedStatus' }
          >
            { item?.status || '' }
          </div>
        </div>
        { item.isBeanzProduct && <div className='subscription-product__container--orderImagesName-grind'>
          <div className='subscription-product__container--orderImagesName-grind-margin'>{ `${ item?.orderRoasterName || '' } ${ item?.orderImagesName || '' }` }</div>
          <div className='subscription-product__container--orderImagesName-grind-margin'>{ t( 'eh-subscription-label-grind' ) }: { item?.grind || '' }</div>
        </div> }
      </div>
    </div>
  );
};

SubscriptionProductTiles.propTypes = {
  item: object
};

export default SubscriptionProductTiles;