import React from 'react';
import { connectRefinementList } from 'react-instantsearch-core';
import { RoundFilterItem } from 'components/ReactPlp/components/RoundFilterTiles/RoundFilterItem';
import { array, arrayOf, func, shape, string } from 'prop-types';
import { useUpperCase } from 'components/ReactPlp/hooks/useUpperCase';

function RoundFilterRefinementList( { items, refine, tileList } ) {
  const [_items, _tileList] = useUpperCase( items, tileList );

  const aemCategoryLabels = _tileList.map( ( tile ) => tile.algoliaAttrMapVal ) || [];

  const filterItem = ( item ) => {
    return aemCategoryLabels.includes( item.label );
  };

  const sortItem = ( prevItem, item ) => {
    return aemCategoryLabels.indexOf( prevItem.label ) - aemCategoryLabels.indexOf( item.label );
  };

  return (
    <div className='plp-category container responsivegrid cmp-container--cs-centered'>
      <h4 className='plp-category__header'>Machines for Every Espresso Lover</h4>
      <div className='plp-category__list-wrapper cmp-container'>
        { _items
          .filter( filterItem )
          .sort( sortItem )
          .map( ( item ) => (
            <RoundFilterItem
              key={ item.label }
              item={ item }
              aemItem={ _tileList.find( ( aemItem ) => aemItem.algoliaAttrMapVal === item.label ) }
              refine={ refine }
            /> )
          ) }
      </div>
    </div>
  );
}

RoundFilterRefinementList.propTypes = {
  items: array,
  refine: func,
  tileList: arrayOf( shape( {
    title: string,
    imgSrc: string,
    imgAlt: string,
    algoliaAttrMapVal: string
  } ) )
};

export default connectRefinementList( RoundFilterRefinementList );
