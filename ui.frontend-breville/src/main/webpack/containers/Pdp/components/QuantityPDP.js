import React from 'react';
import classNames from 'classnames';

export const QuantityPDP = ( { isOnStock, availableQuantity, quantity, setQuantity, minQuantity: MIN_QUANTITY } ) => {

  function handleInputWrap( amount ) {
    return function () {
      const newQuantity = quantity + amount;
      const updatedQuantity = newQuantity < MIN_QUANTITY ? MIN_QUANTITY :
        newQuantity > availableQuantity ? availableQuantity : newQuantity;
      setQuantity( updatedQuantity );
    };
  }

  function addToCart() {
    window.alert( 'add to cart' );
  }

  // don't show anything until we know and have the stock availability
  if ( !isOnStock || !availableQuantity ) {
    console.log( { isOnStock, availableQuantity } );
    return null;
  }

  return (
    <div className='primary-product-container__product_quantity'>
      <div className='product-quantity'>
        <div className='quantity'>
          <button className={ classNames( `minus${ quantity === MIN_QUANTITY ? '' : '-active' }` ) } onClick={ handleInputWrap( -1 ) }></button>
          <input
            className='quantity'
            min='1'
            max={ availableQuantity }
            name='quantity'
            value={ quantity }
            type='number'
            readOnly
          />
          <button className='plus-active' onClick={ handleInputWrap( 1 ) }></button>
        </div>
      </div>
    </div>
  );
};