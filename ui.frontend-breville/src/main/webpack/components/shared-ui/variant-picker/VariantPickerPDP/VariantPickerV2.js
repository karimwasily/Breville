import React from 'react';
import { object, func, array } from 'prop-types';
import { Image } from 'components/shared-ui/image';
import classNames from 'classnames';
import { VariantColor } from './VariantColor';

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
 * @param {Variant} props.selectedVariant current selected variant
 * @param {function} props.onVariantSelect handle variant selection
 * @returns {React.ReactElement}
 */
export const VariantPickerV2 = ( { variants, selectedVariant, onVariantSelect } ) => {
  function handleVariantSelectWrap( variant ) {
    return function () {
      onVariantSelect( variant );
    };
  }

  return (
    <div className='variant-picker'>
      <ul className='variant-picker__list'>
        { variants.map( ( v ) => (
          <li key={ v.sku } className='variant-picker__item'>
            <button
              onClick={ handleVariantSelectWrap( v ) }
              className={ classNames( 'variant-btn', {
                'variant-btn--selected': v.sku === selectedVariant.sku
                } ) }
            >
              <Image src={ v.src } />
            </button>
          </li>
            ) ) }
      </ul>
    </div>
  );
};

VariantPickerV2.propTypes = {
  variants: array,
  selectedVariant: object,
  onVariantSelect: func
};