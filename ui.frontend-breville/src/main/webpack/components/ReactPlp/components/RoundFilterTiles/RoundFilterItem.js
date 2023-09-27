import React from 'react';
import Button from 'shared-ui/button';
import classnames from 'classnames';
import { array, bool, func, shape, string } from 'prop-types';

export const RoundFilterItem = ( { item, aemItem = {}, refine } ) => {
  const { title, imgSrc, imgAlt } = aemItem;

  const imgWrapperClasses = classnames(
    'cmp-teaser__image',
    'cmp-image__wrapper',
    { 'cmp-image__wrapper--selected': item.isRefined },
  );

  function onSelectHandler() {
    refine( item.value );
  }

  return (
    <div className='plp-category-item'>
      <Button
        className='teaser cmp-teaser--cs-filter-tile-round'
        size='small'
        colorScheme='none'
        onClick={ onSelectHandler }
      >
        <div className='cmp-teaser'>
          <div className={ imgWrapperClasses }>
            <div className='cmp-image'>
              <img src={ imgSrc } className='cmp-image__image' alt={ imgAlt } />
            </div>
          </div>
        </div>
      </Button>
      <h3 className='plp-category-item__title cmp-teaser__title'>{ title }</h3>
    </div>
  );
};

RoundFilterItem.propTypes = {
  item: shape( {
    value: array,
    isRefined: bool
  } ),
  aemItem: shape( {
    title: string,
    imgSrc: string,
    imgAlt: string,
    algoliaAttrMapVal: string
  } ),
  refine: func
};