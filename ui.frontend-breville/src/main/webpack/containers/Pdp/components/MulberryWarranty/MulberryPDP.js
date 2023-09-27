import React from 'react';
import { MulberryWarranty } from 'containers/Pdp/components/MulberryWarranty/MulberryWarranty';
import { arrayOf, func, number, shape, string } from 'prop-types';

export function MulberryPDP( { aemData, warrantyObject } ) {
  const { category } = aemData;

  if ( category === 'espresso' ) return null;
  return (
    <div className='mulberry-pdp__wrapper'>
      <MulberryWarranty { ...warrantyObject } />
    </div>
  );
}

MulberryPDP.propTypes = {
  aemData: shape( {
    category: string
  } ),
  warrantyObject: shape( {
    warrantyData: arrayOf( shape( {
      id: string,
      name: string,
      centAmount: number,
      formattedPrice: string,
      sku: string,
      channel: string
    } ) ),
    selectedWarranty: string,
    setSelectedWarranty: func
  } ),
  setSelectedMulberryOption: func,
  selectedMulberryOption: string
};
