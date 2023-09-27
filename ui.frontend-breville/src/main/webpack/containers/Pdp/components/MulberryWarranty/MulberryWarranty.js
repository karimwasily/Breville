import React from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import Button from 'shared-ui/button';
import classNames from 'classnames';

function MulberryOption( { optionItem, onSelect, isSelected } ) {
  const { name, formattedPrice, sku } = optionItem;
  const warrantyPeriod = parseInt( name ) / 12 || '';

  function onClickHandler() {
    onSelect( sku );
  }

  return (
    <Button onClick={ onClickHandler }
      colorScheme='inverted'
      className={ classNames( 'mulberry-warranty__option-item', { 'mulberry-warranty__option-item--selected': isSelected } ) }
    >
      { warrantyPeriod } years - { formattedPrice }
      { isSelected && <span className='mulberry-warranty__option-item_tick' /> }
    </Button>
  );
}

export function MulberryWarranty( { warrantyData, selectedWarranty, setSelectedWarranty } ) {
  function onSelectOption( sku ) {
    setSelectedWarranty( ( selected ) => ( selected === sku ? '' : sku ) );
  }

  if ( !warrantyData?.length ) return null;

  return (
    <div className='mulberry-warranty__wrapper'>
      <h3 className='mulberry-warranty__title'>Protect your purchase with Breville®Care </h3>
      <p className='mulberry-warranty__description'>
        <span className='mulberry-warranty__description-text'>Optional additional years of coverage to your Standard Warranty</span>
        <span className='mulberry-warranty__description-icon' />
      </p>
      <div className='mulberry-warranty__options'>
        { warrantyData.map( ( item ) => (
          <MulberryOption
            key={ item.id }
            onSelect={ onSelectOption }
            optionItem={ item }
            isSelected={ selectedWarranty === item.sku }
          />
        ) ) }
      </div>
    </div>
  );
}

MulberryWarranty.propTypes = {
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
};