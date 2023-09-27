import React from 'react';
import { object, func, bool } from 'prop-types';
import { Button } from 'xps-react/core';
import classNames from 'classnames';
import { normalizeBeanzHit } from 'xps-utils/algolia';

export const CoffeeBrandTile = ( { data, handleProductSelect, isSelected } ) => {
  const {
    sku,
    title,
    brand,
    roast,
    flavour,
    imgSrc,
    imgAlt,
    price } = normalizeBeanzHit( data );

  function handleClick() {
    handleProductSelect( data );
  }
  return (
    <div className='coffeetile'>
      <div className='cmp-coffeetile'>
        <div className='cmp-coffeetile__image'>
          <div className='cmp-image' itemType='http://schema.org/ImageObject'>
            <img
              src={ imgSrc }
              className='cmp-image__image'
              itemProp='contentUrl'
              alt={ imgAlt }
            />
          </div>
        </div>
        <div className='cmp-coffeetile__info'>
          <h6 className='cmp-coffeetile__title'>{ brand }</h6>
          <h6 className='cmp-coffeetile__label'>{ title }</h6>
          <h3 className='cmp-coffeetile__taste'>{ flavour }</h3>
          <h3 className='cmp-coffeetile__roast'>{ roast }</h3>
          <h3 className='cmp-coffeetile__price'>{ price }</h3>
          <h3 className='cmp-coffeetile__select'>
            <Button
              colorScheme='inverted'
              size='small'
              className={ classNames( 'cmp-coffeetile__select-button', {
                'cmp-coffeetile__select-button--selected': isSelected
              } ) }
              onClick={ handleClick }
            >
              Select
            </Button>
            { isSelected && (
              <span className='cmp-coffeetile__select-button--selected-label'>
                Selected
              </span>
            ) }
          </h3>
        </div>
      </div>
    </div>
  );
};

CoffeeBrandTile.propTypes = {
  data: object.isRequired,
  handleProductSelect: func,
  isSelected: bool
};
