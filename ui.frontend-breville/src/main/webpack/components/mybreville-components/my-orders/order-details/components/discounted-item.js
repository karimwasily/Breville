import React from 'react';
import { string, number, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';

const DiscountedItem = ( { image, name, discountPercentage, price, discountPrice, coffeeName, isSubscription, isCoffee, quantity } ) => {

  const { t } = useTranslation();
  const actualPrice = price + discountPrice;

  let itemName = name;
  if ( isSubscription && isCoffee ) {
    itemName = `${ t( 'eh-order-details-label-beanz-trial' ) } ${ t( 'eh-text-subscription' ) }`;
  }
  else if ( isSubscription ) {
    itemName = `${ name } ${ t( 'eh-text-subscription' ) }`;
  }

  return (
    <div className='order-details__discounted-item'>
      <div className='item-image'>
        <img className='image' src={ image } alt={ name }></img>
      </div>
      <div className='item-text'>
        <div className='item-details'>
          <p className='item-name'>{ itemName }</p>
          <p className='item-description'>{ coffeeName }</p>
        </div>
        <div className='item-quantity'>
          <span>{ t( 'eh-order-details-shipment-details-qty' ) }:</span><span className='quantity-text'> { quantity }</span>
        </div>
        <div className='item-discount'>
          <div className='discount'>
            <p className='discount-percentage'>{ discountPercentage }%
              <span> { t( 'eh-label-price-off' ) }</span>
            </p>
          </div>
          <div className='price-values'>
            <div className='item-pricing'>
              <p className='item-price-value'>{ t( 'eh-label-dollar-sign' ) }{ actualPrice?.toFixed( 2 ) }</p>
              <p className='item-discount-price-value'>{ t( 'eh-label-dollar-sign' ) }{ price?.toFixed( 2 ) }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DiscountedItem.propTypes = {
  image: string,
  name: string,
  discountPercentage: number,
  price: number,
  discountPrice: number,
  coffeeName: string,
  isSubscription: bool,
  isCoffee: bool,
  quantity: number
};

export default DiscountedItem;
