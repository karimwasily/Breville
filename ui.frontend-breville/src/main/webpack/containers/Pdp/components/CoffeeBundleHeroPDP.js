import React from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';
import { Image } from 'components/shared-ui/image';
import { selectProductVariantPDPImage } from 'library/store/product/selector';

export const CoffeeBundleHeroPDP = ( { imageAlt = 'Coffee Machine Variant' } ) => {
  const productVariantPDPImage = useSelector( selectProductVariantPDPImage );

  if ( !productVariantPDPImage ) return null;

  return (
    <Image
      className='cmp-complete-coffee-bundle__image-machine'
      src={ productVariantPDPImage }
      alt={ imageAlt }
    />
  );
};

CoffeeBundleHeroPDP.propTypes = {
  imageAlt: string
};