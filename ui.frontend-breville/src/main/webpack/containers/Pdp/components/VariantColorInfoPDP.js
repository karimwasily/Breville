import React from 'react';
import { string } from 'prop-types';

export const VariantColorInfoPDP = ( { colorLabel } ) => {
  return (
    <div className='primary-product-container__color_name'>
      { colorLabel }
    </div>
  );
};

VariantColorInfoPDP.propTypes = {
  colorLabel: string
};
