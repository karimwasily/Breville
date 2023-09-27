import React from 'react';
import { string, bool, func } from 'prop-types';
import { Image } from 'components/shared-ui/image';
import classNames from 'classnames';

export const VariantColor = ( {
  sku,
  colorImage,
  title,
  isSelected,
  handleSelectWrap
} ) => {
  function handleSelectWrapper( sku, title ) {
    return function () {
      handleSelectWrap( sku, title );
    };
  }

  return (
    <button
      onClick={ handleSelectWrapper( sku, title ) }
      className={ classNames( 'variant-btn', {
       'variant-btn--selected': isSelected
      } ) }
    >
      <Image src={ `${ colorImage }` } />
    </button>
  );
};

VariantColor.propTypes = {
  sku: string,
  colorImage: string,
  title: string,
  isSelected: bool,
  handleSelectWrap: func
};