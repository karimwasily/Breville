import React from 'react';
import { object } from 'prop-types';

export const PricePDP = ( { price } ) => {
  // ! disabling slash until affirm widget is styled correctly
  // const showSlash = Boolean( price?.centAmount );
  const showSlash = false;

  if ( !price?.displayPrice ) return null;

  return (
    <div className='primary-product-container__price-value'>
      { price?.displayPrice }
      { showSlash && <span className='primary-product-container__slash'>/</span> }
    </div>
  );
};

PricePDP.propTypes = {
  price: object
};
