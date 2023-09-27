import React from 'react';
import { string, array } from 'prop-types';
import { Image } from 'components/shared-ui/image';

export const StyleCountLabel = ( { selectedVariantImage, variants, className = '' } ) => (
  <div className={ className }>
    { variants.length >= 2 && (
      <>
        <button
          className='variant-btn'
        >
          <Image src={ selectedVariantImage } />
        </button>

        <span className='variant-count-label'>{ variants.length } Styles</span>
      </>
    )
    }
  </div>
);

StyleCountLabel.propTypes = {
  selectedVariantImage: string,
  variants: array,
  className: string
};