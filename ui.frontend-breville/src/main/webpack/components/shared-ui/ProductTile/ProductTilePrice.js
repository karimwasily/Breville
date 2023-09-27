import React from 'react';
import {
  string, number
} from 'prop-types';
import { displayPrice as formatDisplayPrice } from 'xps-utils/format';
import { useSelector } from 'react-redux';
import { selectCurrencySymbol } from 'library/store/global/selector';
import classNames from 'classnames';

export const ProductTilePrice = ( {
  displayPrice,
  price,
  className = ''
} ) => {

  const currencySymbol = useSelector( selectCurrencySymbol );

  if ( !displayPrice && !price ) return null;

  return (
    displayPrice ? (
      <p className={ classNames( 'cmp-producttile__price', className ) }>{ displayPrice }</p>
    ) : (
      <p className={ classNames( 'cmp-producttile__price', className ) }>{ formatDisplayPrice( price, currencySymbol ) }</p>
    )
  );
};

ProductTilePrice.propTypes = {
  displayPrice: string,
  price: number
};
