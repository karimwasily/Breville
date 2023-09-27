import React, { useEffect, useState } from 'react';
import { array, func, string } from 'prop-types';
import { connectRefinementList } from 'react-instantsearch-core';
import classnames from 'classnames';

/**
 * @typedef {{
 *    label: string,
 *    value: string,
 *    count: number,
 *    isRefined: boolean
 *  }} RefinementListItem
 */

/**
 * Custom Algolia RefinementList (preserving OOTB html markup)
 *
 * @params {{
 *  items: RefinementListItem[],
 *  refine: function,
 *  currentRefinement?: string[],
 *  transformItems?: function,
 *  className?: string
 *  }} args
 * @returns {React.ReactElement}
 */
const RefinementList = ( { items, refine, transformItems, className } ) => {
  const [updatedItems, setUpdatedItems] = useState( [] );

  useEffect( () => {
    setUpdatedItems( transformItems ? transformItems( items ) : items );
  }, [items] );

  function handleClickWrap( item ) {
    return function ( event ) {
      event.preventDefault();
      refine( item.value );
    };
  }

  const facetContainerClass = classnames( 'ais-RefinementList', className );
  const facetItemClass = ( item ) => classnames( 'ais-RefinementList-item', { 'ais-RefinementList-item--selected': item.isRefined } );

  return (
    <div className={ facetContainerClass }>
      <ul className='ais-RefinementList-list'>
        { updatedItems.map( ( item ) => (
          <li key={ item.label } className={ facetItemClass( item ) }>
            <label className='ais-RefinementList-label'>
              <input className='ais-RefinementList-checkbox' type='checkbox' onClick={ handleClickWrap( item ) } />
              <span className='ais-RefinementList-labelText'>{ item.label }</span>{ ' ' }
              <span className='ais-RefinementList-count'>{ item.count }</span>
            </label>
          </li>
      ) ) }
      </ul>
    </div>
  );
};

RefinementList.defaultProps = {
  items: [],
  active: false
};

RefinementList.propTypes = {
  items: array,
  refine: func,
  currentRefinement: array,
  attribute: string
};

/**
 * @typedef {{
 *  attribute: string,
 *  defaultRefinement?: string[],
 *  operator?: string,
 *  limit?: number,
 *  showMore?: boolean,
 *  showMoreLimit?: number,
 *  searchable?: boolean,
 *  transformItems?: function,
 *  translations?: object,
 * }} customRefinementListArgs
 */

/**
 * @type {function(customRefinementListArgs)}
 */
export const CustomRefinementList = connectRefinementList( RefinementList );
