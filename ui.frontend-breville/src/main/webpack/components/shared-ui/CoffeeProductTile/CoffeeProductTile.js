import React from 'react';
import { string, object, func, bool, number } from 'prop-types';
import { Button } from 'xps-react/core';
import classNames from 'classnames';
import { calcDiscountPriceUS } from 'library/utils/createDiscountPriceUS';
import { useTranslation } from 'react-i18next';

export const CoffeeProductTile = ( {
  hit,
  sku,
  title,
  brand,
  roast,
  flavour,
  imgSrc,
  imgAlt = '',
  price,
  displayPrice,
  showSelect = false,
  onSelect,
  isSelected = false,
  discountPercentage,
  currencySymbol
} ) => {
  const { t } = useTranslation();

  function handleClick() {
    onSelect( hit );
  }

  return (
    <div className='coffee-product-tile'>
      <div className='coffee-product-tile__image'>
        <div className='image'>
          <img
            src={ imgSrc }
            className='image__image'
            itemProp='contentUrl'
            alt={ imgAlt }
            title=''
          />
        </div>
      </div>
      <div className='coffee-product-tile__info'>
        <p className='coffee-product-tile__brand'>{ brand }</p>
        <h3 className='coffee-product-tile__title'>{ title }</h3>
        <p className='coffee-product-tile__flavour'>{ flavour }</p>
        <p className='coffee-product-tile__roast'>{ roast }</p>

        { discountPercentage ? (
          <p className='coffee-product-tile__price'>
            <span className='coffee-product-tile__price-before'>{ currencySymbol }{ price }</span>
            <span className='coffee-product-tile__price-after'>{ currencySymbol }{ calcDiscountPriceUS( price, discountPercentage ) }</span>
          </p>
        ) : (
          displayPrice ? (
            <p className='coffee-product-tile__price'>{ displayPrice }</p>
          ) : (
            <p className='coffee-product-tile__price'>{ currencySymbol }{ price }</p>
          )
        ) }

        { showSelect && (
          <div className='coffee-product-tile__select'>
            <div className='coffee-product-tile__select-inner'>
              <Button
                colorScheme='inverted'
                size='small'
                className={ classNames( 'coffee-product-tile__select-button', {
                  'coffee-product-tile__select-button--selected': isSelected
                } ) }
                onClick={ handleClick }
              >
                { t( 'br-select' ) }
              </Button>
              { isSelected && (
                <span className='coffee-product-tile__select-button--selected-label'>
                  { t( 'br-selected' ) }
                </span>
              ) }
            </div>
          </div>
        ) }
      </div>
    </div>
  );
};
CoffeeProductTile.propTypes = {
  hit: object,
  sku: string,
  title: string,
  brand: string,
  roast: string,
  flavour: string,
  imgSrc: string,
  imgAlt: string,
  price: number,
  displayPrice: string,
  showSelect: bool,
  onSelect: func,
  isSelected: bool,
  discountPercentage: number,
  currencySymbol: string
};
