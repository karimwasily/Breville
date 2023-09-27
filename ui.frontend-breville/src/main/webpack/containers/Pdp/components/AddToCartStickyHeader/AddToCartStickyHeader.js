import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectProductName,
  selectProductVariantColor, selectProductVariantPDPImage
} from 'library/store/product/selector';
import { Image } from 'shared-ui/image';

export function AddToCartStickyHeader() {
  const productName = useSelector( selectProductName );
  const variantColor = useSelector( selectProductVariantColor );
  const variantPDPImage = useSelector( selectProductVariantPDPImage );

  return (
    <div className='sticky-header__wrapper'>
      <Image src={ variantPDPImage } alt={ productName } className='sticky-header__hero-image' />
      <div className='sticky-header__info-wrapper'>
        <h3 className='sticky-header__product-name'>{ productName }</h3>
        <div className='sticky-header__color-wrapper'>
          <Image className='sticky-header__swatch' src={ variantColor.src } alt={ variantColor.label } />
          <p className='sticky-header__color-label'>{ variantColor.label }</p>
        </div>
      </div>
    </div>
  );
}