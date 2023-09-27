import React from 'react';
import { Image } from 'shared-ui/image';
import { arrayOf, func, number, shape, string } from 'prop-types';

export function MulberryPreselect( { warrantyData, selectedWarranty } ) {
  const selectedOption = warrantyData.find( ( warranty ) => warranty.sku === selectedWarranty );
  if ( !selectedOption ) return null;

  const formattedName = parseInt( selectedOption.name ) / 12 || '';

  return (
    <>
      <div className='mulberry-preselect__plus-sign'>
        <Image src='/content/dam/breville-brands/coffee-solution/svg/plus.svg' />
      </div>
      <div className='mulberry-preselect__content-wrapper'>
        <Image className='mulberry-preselect__logo' src='../../../../resources/svgs/mulberry-vertical.svg' />
        <div className='mulberry-preselect__content'>
          <h4 className='mulberry-preselect__title'>Breville®Care Product Protection</h4>
          <p className='mulberry-preselect__description'>{ formattedName } Years</p>
        </div>
      </div>
    </>
  );
}

MulberryPreselect.propTypes = {
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
  } )
};