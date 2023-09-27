import React, { useState, useEffect } from 'react';
import { object, func, array, number, string, bool } from 'prop-types';
import { StyleCountLabel } from './components/StyleCountLabel/StyleCountLabel';
import { Image } from 'components/shared-ui/image';
import classNames from 'classnames';
import { VerticalListMoreButton } from './components/VerticalListMoreButton/VerticalListMoreButton';

/**
 * @typedef {object} Variant
 * @property {string} src
 * @property {string} sku
 * @property {string} color
 */

/**
 * Variant picker to support image assets
 * @param {object} props props
 * @param {Variant[]} props.variants array of variants with required attributes
 * @param {Variant?} props.selectedVariant current selected variant
 * @param {function} props.onVariantSelect handle variant selection
 * @param {string[]} props.skus Array of skus
 * @param {string[]} props.images Array of images
 * @param {boolean?} props.isHorizontalDisplay string represents horizontal or vertical swatch
 * @param {boolean?} props.disableSelect disable ability to select a variant
 * @param {boolean?} props.isHorizontalDisplay string represents horizontal or vertical swatch
 * @param {number?} props.initialNumVariantsShown initial number of swatches to show
 * @param {boolean} props.displayStylesCountLabel show label of total styles
 * @param {string?} props.className string different class for horizontal and vertical swatch
 * @returns {React.ReactElement}
 */
export const VariantPicker = ( { variants = [], selectedVariant = null, onVariantSelect, skus, images, isHorizontalDisplay, disableSelect = false, initialNumVariantsShown = 3, displayStylesCountLabel = false, className = '' } ) => {
  const [showMore, setShowMore] = useState( false );
  const [color, setColor] = useState( variants[0]?.color );
  const [variantList, setVariantList] = useState( variants );
  const [selectedVariantSKU, setSelectedVariantSKU] = useState( null );
  const [selectedVariantImage, setSelectedVariantImage] = useState( variants[0]?.src );

  useEffect( () => {
    if ( skus && !variants.length ){
      setVariantList( skus.map( ( sku, idx ) => ( {
        sku,
        src: images[idx]
      } ) ) );
    }
  }, [] );

  function toggleShowMore( flag ) {
    setShowMore( ( state ) => ( flag ? flag : !state ) );
  }

  function handleVariantSelectWrap( variant ) {
    return function ( event ) {
      // Prevent variant selection event from bubbling up to tile selection.
      event.stopPropagation();
      if ( isHorizontalDisplay ){
        setColor( variant.color );
        onVariantSelect( variant );
      }
      else {
        // TODO:Temp SKU update on click of variant, Onclick of variant image changes need to be done
        const found = variantList.find( ( v ) => v.sku === variant.sku );
        setSelectedVariantImage( found.src );
        setSelectedVariantSKU( found.sku );
        setColor( variant.color );
      }
    };
  }
  // First variant swatch selection(only in vertical variant)
  function isInitialSelection( idx ) {
    const isFirst = idx === 0;
    const noVariantSelected = selectedVariantSKU === null;
    return isFirst && noVariantSelected;
  }

  function checkSelectedVariant( idx, sku ){
    // Since the vertical variant doesn't have selected variant object needs to have separate check
    if ( !selectedVariant ){
      return selectedVariantSKU ? selectedVariantSKU === sku : isInitialSelection( idx );
    }
    else {
      return sku === selectedVariant.sku;
    }
  }

  return (
    ( displayStylesCountLabel && !isHorizontalDisplay ) ?
      ( <StyleCountLabel selectedVariantImage={ selectedVariantImage } variants={ variantList } className={ className } /> )
      :
      (
        <div className={ className }>
          <ul className='variant-picker__list'>

            { /* list */ }
            { variantList.map( ( v, idx ) => (
              <li key={ v.sku } className='variant-picker__item' >
                <button
                  onClick={ handleVariantSelectWrap( v ) }
                  className={ classNames( 'variant-btn', {
                      'variant-btn--hidden': idx + 1 > initialNumVariantsShown && !showMore,
                      'variant-btn--selected': checkSelectedVariant( idx, v.sku ) && !disableSelect,
                      'variant-btn--disable-select': disableSelect
                    } ) }
                >
                  <Image src={ v.src } />
                </button>
              </li>
              ) ) }
            { variantList.length > initialNumVariantsShown && !isHorizontalDisplay && <VerticalListMoreButton toggleShowMore={ toggleShowMore } showMore={ showMore } /> }
          </ul>

          { /* color label description */ }
          { isHorizontalDisplay && <p className='variant-picker__color-label' >{ color }</p> }
        </div>
      )
  );
};

VariantPicker.propTypes = {
  variants: array,
  selectedVariant: object,
  onVariantSelect: func,
  skus: array,
  images: array,
  initialNumVariantsShown: number,
  swatchDisplayType: string,
  displayStylesCountLabel: bool,
  className: string,
  isHorizontalDisplay: bool,
  disableSelect: bool
};
