import React from 'react';
import {
  object,
  bool,
  string,
  number,
  array,
  func,
  oneOfType,
  instanceOf
} from 'prop-types';

import { Ratings } from 'xps-react/core';
import { Button } from 'xps-react/core';

import { ProductTileAttributes } from './components/ProductAttributes';
import { ProductTilePrice } from '../ProductTile/ProductTilePrice';
import { ProductTileTitle } from '../ProductTile/ProductTileTitle';
import { ProductTileImage } from '../ProductTile/ProductTileImage';
import { ProductTileVariantPicker } from '../ProductTile/ProductTileVariantPicker';
import { useTranslation } from 'react-i18next';

export const ProductTile = ( {
  data,
  parentProductKey = null,
  imgSrc,
  imgAlt = '',
  price,
  displayPrice,
  title,
  sku,
  description,
  showAddToCart = false,
  handleAddToCartBtn,
  showDescription = true,
  showAttributes = false,
  attributes,
  removeItem = null,
  showCloseButton = false,
  closeButtonText = 'x',
  pdpUrl = null,
  variantSkus = [],
  variantImageSrc = [],
  isHorizontalDisplay,
  showRatings = true,
  showVariants = true,
  useCTVariantPicker = false,
  ratingType = 'inline_rating',
  variants = [],
  selectedVariant,
  onVariantSelect,
  showFooterPrice = false,
  secondaryActionComponent = null,
  isOnStock = true
} ) => {
  const { t } = useTranslation();

  function handleRemoveItem() {
    removeItem( sku );
  }

  function handleAddToCartBtnWrap( data ) {
    return function () {
      handleAddToCartBtn( data );
    };
  }

  return (
    <div className='producttile'>
      <div className='cmp-producttile'>

        <div className='cmp-producttile__image'>
          <div className='cmp-image' itemType='http://schema.org/ImageObject'>
            <ProductTileImage pdpUrl={ pdpUrl } imgSrc={ imgSrc } imgAlt={ imgAlt } />
          </div>
        </div>

        <div className='cmp-producttile__primary-content-wrapper'>

          <div className='cmp-producttile__header-content'>
            <ProductTileTitle pdpUrl={ pdpUrl } title={ title } />

            { showDescription && (
              <div className='cmp-producttile__description'><p>{ description }</p></div>
             ) }

            { ( showRatings && sku ) && (
            <Ratings variantSKU={ sku } widgetType={ ratingType } style={{ minHeight: '35px' }} />
            ) }

            { showVariants && <ProductTileVariantPicker useCTVariantPicker={ useCTVariantPicker } variantSkus={ variantSkus } variantImageSrc={ variantImageSrc } isHorizontalDisplay={ isHorizontalDisplay } variants={ variants } selectedVariant={ selectedVariant } onVariantSelect={ onVariantSelect } /> }

            { /* todo: add to cart functionality */ }
            { showAddToCart && (
              isOnStock ?
                <Button onClick={ handleAddToCartBtnWrap( { parentProductKey, variant: data } ) } textType='bold' colorScheme='green' size='stretch' className='producttile-add-to-cart__btn' >{ t( 'br-add-to-cart' ) }</Button>
              : <Button disabled textType='bold' size='stretch' className='cmp-button--sold-out producttile-add-to-cart__btn'>{ t( 'br-sold-out' ) }</Button>
            ) }

            { secondaryActionComponent && secondaryActionComponent( { parentProductKey, variant: data } ) }
          </div>

          <div className='cmp-producttile__price-wrapper'>
            <ProductTilePrice displayPrice={ displayPrice } price={ price } />
          </div>

        </div>

        <div className='cmp-producttile__footer-content'>

          { showCloseButton && (
            <Button
              className='cmp-comparison__list-item-remove'
              onClick={ handleRemoveItem }
            >
              { closeButtonText }
            </Button>
          ) }

          { showAttributes && attributes && (
            <ProductTileAttributes attributes={ attributes } />
          ) }
        </div>

        { showFooterPrice && <ProductTilePrice displayPrice={ displayPrice } price={ price } className='producttile-footer__price' /> }

      </div>
    </div>
  );
};

ProductTile.propTypes = {
  data: object.isRequired,
  parentProductKey: string,
  imgSrc: string,
  imgAlt: string,
  price: number,
  displayPrice: string,
  title: string,
  sku: string,
  description: string,
  showAddToCart: bool,
  handleAddToCartBtn: func,
  showDescription: bool,
  showAttributes: bool,
  attributes: array,
  removeItem: func,
  showCloseButton: bool,
  closeButtonText: string,
  pdpUrl: oneOfType( [string, instanceOf( null )] ),
  variantSkus: array,
  variantImageSrc: array,
  showRatings: bool,
  ratingType: string,
  showVariants: bool,
  useNewVariantPicker: bool,
  useCTVariantPicker: bool,
  variants: array,
  selectedVariant: object,
  onVariantSelect: func,
  isHorizontalDisplay: bool,
  showFooterPrice: bool,
  isOnStock: bool
};
