import { node, object } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectComparionList, selectIsComparing } from 'library/store/global/selector';
import { comparisonAdd, comparisonRemove } from 'library/store/global/actions';

export const ComparisonItem = ( { children, item } ) => {
  const [isSelected, setSelected] = useState( false );

  const dispatch = useDispatch();
  const isComparing = useSelector( selectIsComparing );
  const comparisonList = useSelector( selectComparionList );

  const handleCompare = ( item ) => {
    if ( !isSelected ) {
      // todo: give aem author ability to set comparison limit
      const COMPARISON_LIMIT = 3;
      if ( comparisonList.length < COMPARISON_LIMIT ) dispatch( comparisonAdd( item ) );
    }
    else {
      dispatch( comparisonRemove( { key: item.key } ) );
    }
  };

  // toggle selection based on whether item has been selected
  useEffect( () => {
    const isItemInList =
      comparisonList.filter( ( comparisonItem ) => comparisonItem.objectID === item.objectID ).length > 0;
    // if item is in list then set to true
    if ( isItemInList ) {
      setSelected( true );
    }
    else if ( isSelected ) {
      // otherwise if currently selected then toggle off
      setSelected( false );
    }
  }, [comparisonList] );

  return (
    <div className='cmp-comparison__item'>
      { isComparing && (
        <button
          className={ `cmp-comparison__item-select ${
            isSelected ? 'cmp-comparison__item-select--selected' : ''
          }` }
          onClick={ () => handleCompare( item ) }
        ></button>
      ) }
      { children }
    </div>
  );
};

ComparisonItem.propTypes = {
  children: node,
  item: object
};
