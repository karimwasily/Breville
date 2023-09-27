import React from 'react';
import { string } from 'prop-types';
import { Ratings } from 'xps-react/core';

export const PDPReviews = ( { variantSKU, productType = '' } ) => {
  // Don't show reviews on accessory & parts
  if ( !productType.toUpperCase().includes( 'FG' ) ) return null;
  return <Ratings variantSKU={ variantSKU } widgetType='reviews' className='pdp-reviews__wrapper' />;
};

PDPReviews.propTypes = {
  variantSKU: string,
  productType: string
};
