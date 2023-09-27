import React from 'react';
import { object, func, string, number } from 'prop-types';
import { normalizeBeanzHit } from 'xps-utils/algolia';
import { calcDiscountPriceUS } from 'library/utils/createDiscountPriceUS';
import { roundPriceUS } from 'library/utils/roundPriceUS';

// todo: provide bundle state
// todo: need to add product discount information
export const ProductResult = ( { hit: rawHit, cancelSelection, locale = 'en-US', numOfCoffeeBags, bundleDiscountPercentage, currencySymbol } ) => {
  const hit = normalizeBeanzHit( rawHit, locale );

  const discountCoffeePrice = calcDiscountPriceUS( hit.retailPriceMap, bundleDiscountPercentage );
  const bagTotal = roundPriceUS( numOfCoffeeBags * discountCoffeePrice );

  return (
    <div className='coffee-conf-result'>
      <img
        className='coffee-conf-result__img'
        src={ hit.tile_image }
        alt={ hit.imgAlt }
      ></img>
      <div className='coffee-conf-result__content-header'>
        <p className='coffee-conf-result__pretitle'>Your first shipment:</p>
        <p className='coffee-conf-result__title'>
          { hit.brand } - { hit.productName } - { currencySymbol }{ discountCoffeePrice }
        </p>
      </div>
      { /* // todo: this data is not dynamic! */ }
      <p className='coffee-conf-result__desc'>
        This is the first coffee sent out with your Beanz offer. Your approx
        total for <strong>{ numOfCoffeeBags } bags</strong> will be <strong>{ currencySymbol }{ bagTotal }.</strong>{ ' ' }
        <br className='coffee-conf-result__desc-br' />
        Change your selection and choose different varieties between each
        shipment on Beanz.com. Prices may vary if you change your coffee
        selection.
      </p>
      <button
        aria-label='cancel selection'
        onClick={ cancelSelection }
        className='coffee-conf-result__cancel-btn'
      ></button>
    </div>
  );
};

ProductResult.propTypes = {
  hit: object,
  cancelSelection: func,
  locale: string,
  numOfCoffeeBags: number,
  bundleDiscountPercentage: number,
  currencySymbol: string
};
