import React, { useMemo } from 'react';
import { VariantColor } from './VariantColor';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductVariant, selectProductVariantSKU, selectVariants } from 'library/store/product/selector';
import { setProductVariantViaSKU } from 'library/store/product/actions';
import { getVariantColor } from 'library/utils/normalize';
import { selectLocale } from 'library/store/global/selector';

export const VariantPickerPDP = () => {
  const productVariant = useSelector( selectProductVariant );
  const productVariantSKU = useSelector( selectProductVariantSKU );
  const localeVariants = useSelector( selectVariants );
  const locale = useSelector( selectLocale );

  const dispatch = useDispatch();

  // compose single array of variants
  const variants = useMemo( () => {
    return localeVariants.map( ( variant ) => getVariantColor( variant, locale ) );
  }, [localeVariants] );

  function handleSelectWrap( sku ) {
    return function () {
      dispatch( setProductVariantViaSKU( sku ) );
    };
  }

  if ( !productVariant ) return null;

  return (
    <div className='variant-picker-pdp'>
      <ul className='variant-picker__list'>
        { variants.map( ( v ) => (
          <li key={ v.sku } className='variant-picker__item'>
            <VariantColor
              sku={ v.sku }
              colorImage={ v.src }
              title={ v.label }
              isSelected={ productVariantSKU === v.sku }
              handleSelectWrap={ handleSelectWrap( v.sku ) }
            />
          </li>
            ) ) }
      </ul>
    </div>
  );
};