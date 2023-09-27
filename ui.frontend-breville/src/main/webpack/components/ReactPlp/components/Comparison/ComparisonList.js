import React from 'react';
import { bool, string } from 'prop-types';

import { ProductTile } from 'shared-ui/ProductTile';
import { useDispatch, useSelector } from 'react-redux';
import { selectComparionList, selectIsComparing } from 'library/store/global/selector';
import { comparisonRemove } from 'library/store/global/actions';
import { HorizontalScrollList } from 'shared-ui/HorizontalScrollList/HorizontalScrollList';
import { normalizeBrevilleHit } from 'xps-utils/algolia/normalizeHit';

export const ComparisonList = ( {
  showAddToCart = false,
  showCloseButton = false,
  showDescription = true,
  showAttributes = false,
  closeButtonText = 'x',
  showComparisonToggleBtn = true,
  showRatings = false,
  locale = 'en-US'
} ) => {
  const dispatch = useDispatch();
  const isComparing = useSelector( selectIsComparing );
  const comparisonList = useSelector( selectComparionList );

  function removeItemWrap( id ) {
    return function () {
      removeItem( id );
    };
  }
  function removeItem( id ) {
    return dispatch( comparisonRemove( { key: id } ) );
  }

  if ( comparisonList.length === 0 || !isComparing ) {
    return null;
  }

  return (
    <div className='cmp-comparison__list'>
      <HorizontalScrollList itemWidth={{ min: 240, md: 300, lg: 370 }} gutterWidth={ 10 }>
        { comparisonList.map( ( rawHit ) => {
        const hit = normalizeBrevilleHit( rawHit, locale );
        return (
          <div key={ hit.objectID } className='cmp-comparison__list-item'>
            { showComparisonToggleBtn && (
            <button
              onClick={ removeItemWrap( hit.objectID ) }
              className='cmp-comparison__list-item-remove'
            ></button>
             ) }
            <ProductTile
              data={ hit }
              sku={ hit.objectID }
              title={ hit.WEB_PRODUCT_NAME }
              price={ hit.retailPrice }
              description={ hit.description }
              imgSrc={ hit.tile_image }
              showAddToCart={ showAddToCart }
              showDescription={ showDescription }
              showAttributes={ showAttributes }
              removeItem={ removeItem }
              showCloseButton={ showCloseButton }
              closeButtonText={ closeButtonText }
              showRatings={ showRatings }
            />
          </div>
           );
        } ) }
      </HorizontalScrollList>
    </div>
  );
};

ComparisonList.propTypes = {
  showAddToCart: bool,
  showDescription: bool,
  showAttributes: bool,
  closeButtonText: string,
  showComparisonToggleBtn: bool,
  showCloseButton: bool,
  showRatings: bool,
  locale: string
};
