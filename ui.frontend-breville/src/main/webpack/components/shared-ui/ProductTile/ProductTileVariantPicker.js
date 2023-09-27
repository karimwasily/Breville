import React from 'react';
import { VariantPicker } from '../variant-picker';
import { object, bool, array, func } from 'prop-types';
import { BREAKPOINT_MD } from 'library/constants';
import { useWindowSize } from 'xps-utils/useWindowSize';

export const ProductTileVariantPicker = ( { useCTVariantPicker = false, variantSkus, variantImageSrc, isHorizontalDisplay, variants, selectedVariant, onVariantSelect } ) => {
  const windowSize = useWindowSize();
  const isMobileLayout = windowSize.width < BREAKPOINT_MD;

  const variantPickerBaseProps = {
    skus: variantSkus,
    images: variantImageSrc,
    isHorizontalDisplay
  };

  const variantPickerCTProps = {
    variants,
    selectedVariant,
    onVariantSelect,
    initialNumVariantsShown: 99
  };

  return (
    useCTVariantPicker ? (
    // CT VARIANT PICKER
      <VariantPicker { ...variantPickerBaseProps } { ...variantPickerCTProps } className={ 'variant-picker' } isHorizontalDisplay={ isHorizontalDisplay } />
    ) : (
      // ALGOLIA VARIANT PICKER
      !isHorizontalDisplay && <VariantPicker { ...variantPickerBaseProps } onVariantSelect={ onVariantSelect } isHorizontalDisplay={ isHorizontalDisplay } displayStylesCountLabel={ isMobileLayout } disableSelect={ true } className={ isMobileLayout ? 'variant-picker-alg-mb' : 'variant-picker-vr' } />
    )
  );
};

ProductTileVariantPicker.propTypes = {
  useCTVariantPicker: bool,
  variantSkus: array,
  selectedVariant: object,
  onVariantSelect: func,
  variants: array,
  isHorizontalDisplay: bool,
  variantImageSrc: array
};
