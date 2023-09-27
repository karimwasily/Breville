import React, { useState } from 'react';
import { object, string, func, bool } from 'prop-types';
import { ProductTile } from './ProductTile';
import { formatSwatchVariants } from 'library/utils/formatSwatchVariants';
import { SelectWrapper } from '../SelectWrapper';
import { get } from 'react-hook-form';

/**
 * util component for CT product data to be passed to product tile component and to control variant product selection
 * @param {object} props props
 * @param {object} props.parentProduct ct graphql response for the machine which includes variants
 * @param {object} props.selectedParentProduct which model machine is selected
 * @param {function} props.onSelection callback when selection has occcurred
 * @param {string} props.url url to send user to on tile image
 * @param {string?} props.locale locale setting
 * @param {boolean} [props.disableSelectWrapper] disable the selection wrapper
 * @param {boolean} [props.showFooterPrice] display price in the footer of the tile
 * @param {boolean} [props.showAddToCart] display add to cart button
 * @param {function} [props.handleAddToCartBtn] handler to init add to cart modal
 * @param {function} [props.secondaryActionComponent] secondary action react component to place withing product tile
 * @returns {React.ReactElement}
 */
export const CTProductTile = ( { parentProduct, selectedParentProduct, onSelection, url, locale = 'en-US', disableSelectWrapper = false, showFooterPrice = false, showAddToCart = false, handleAddToCartBtn = () => null, secondaryActionComponent = null } ) => {
  const title = get( parentProduct, 'masterData.current.name', '' );
  const variants = get( parentProduct, 'masterData.current._localeVariants', [] );
  const [variant, setVariant] = useState( variants[0] );

  // handle when the wrapper is selected
  function handleSelectWrapper() {
    onSelection( parentProduct, variant );
  }

  // handle when the swatch is selected
  function handleVariantSelection( selectedVariant ) {
    const found = variants.find( ( v ) => v.sku === selectedVariant.sku );
    setVariant( found );
    if ( onSelection ) onSelection( parentProduct, found );
  }

  function variantImg( v ) {
    return v.images.find( ( img ) => img.label === 'tile' )?.url;
  }

  const swatchVariants = formatSwatchVariants( variants, locale );

  return (
    <SelectWrapper
      handleSelect={ handleSelectWrapper }
      isSelected={ parentProduct.key === selectedParentProduct?.key }
      disable={ disableSelectWrapper }
    >
      <ProductTile
        data={ variant }
        parentProductKey={ parentProduct.key }
        sku={ variant?.sku }
        title={ title }
        pdpUrl={ url }
        imgSrc={ variantImg( variant ) }
        displayPrice={ variant?._price.displayPrice }
        showDescription={ false }
        showAttributes={ Boolean( variant?.attributesRaw ) }
        attributes={ variant?.attributesRaw }
        useNewVariantPicker={ true }
        variants={ swatchVariants }
        isHorizontalDisplay={ true }
        selectedVariant={ variant }
        onVariantSelect={ handleVariantSelection }
        ratingType='inline_rating'
        useCTVariantPicker={ true }
        showFooterPrice={ showFooterPrice }
        showAddToCart={ showAddToCart }
        handleAddToCartBtn={ handleAddToCartBtn }
        secondaryActionComponent={ secondaryActionComponent }
        isOnStock={ Boolean( variant?._availability?.isOnStock ) }
      />
    </SelectWrapper>
  );
};

CTProductTile.propTypes = {
  parentProduct: object,
  selectedParentProduct: object,
  onSelection: func,
  url: string,
  locale: string,
  disableSelectWrapper: bool,
  showFooterPrice: bool,
  showAddToCart: bool
};
