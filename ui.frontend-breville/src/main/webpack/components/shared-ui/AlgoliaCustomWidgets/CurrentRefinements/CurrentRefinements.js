import React, { useEffect } from 'react';
import { array, object, func, string } from 'prop-types';
import { connectCurrentRefinements } from 'react-instantsearch-core';
import { uniqBy } from 'lodash';
import { formatPriceRangeLabel } from 'library/utils/formatPriceRangeLabel';
import { capitalize } from 'xps-utils/format';

const deduplicate = ( items ) => uniqBy( items, ( item ) => item.attribute );

/**
 * creates a badge result for facet selections
 * @params {{label: string, onClick: function}} args
 * @returns {React.ReactElement}
 */
const Badge = ( { label, onClick } ) => (
  <div className='current-refinements__item'>
    <span className='current-refinements__item-text'>{ label }</span>
    <button
      onClick={ onClick }
      className='current-refinements__item-cancel'
    ></button>
  </div>
);
Badge.propTypes = {
  label: string.isRequired,
  onClick: func.isRequired
};

/**
 * @typedef {{
 *    label: string,
 *    value: string,
 *    count: number,
 *    isRefined: boolean
 *  }} RefinementListItem
 */

/**
 * Custom Algolia RefinementList Component
 *
 * @param {{
 *  items: {
 *    label: string,
 *    value: string[],
 *    count: number,
 *    isRefined: boolean
 *    items: RefinementListItem[]
 *  }[],
 *  refine: function,
 *  currentRefinement?: string[],
 *  translations: object,
 *  }} args
 * @returns {any}
 */

const CurrentRefinements = ( { items, handleItems, refine, translations, key = '', currencySymbol = '$' } ) => {
  const { title, reset } = translations;

  useEffect( () => {
    if ( handleItems ) handleItems( items );
  }, [items] );

  function clearAllRefinements() {
    return refine( items );
  }

  function formatLabel( item, currencySymbol ) {
    const { label } = item;

    // format as capitalized
    let formattedLabel = capitalize( label );

    // format if price
    if ( item.attribute === 'retailPrice' ) {
      formattedLabel = formatPriceRangeLabel( item, currencySymbol );
    }

    return formattedLabel;
  }

  // * depduplicating items since we are using duplicate refinement lists for mobile and desktop
  const uniqItems = deduplicate( items );
  if ( items.length === 0 ) return null;

  return (
    <div className='current-refinements'>
      { title && <p className='current-refinements__title'>{ title }</p> }
      <div className='current-refinements__inner'>
        { uniqItems.map( ( item ) => {
          function clearRefinement( item ) {
            return function () {
              return refine( item.value );
            };
          }

          return ( item.items ? (
            item.items.map( ( nested ) => (
              <Badge
                key={ nested.label }
                label={ formatLabel( nested, currencySymbol ) }
                onClick={ clearRefinement( nested ) }
              />
            ) )
          ) : (
            <Badge
              key={ item.label }
              label={ formatLabel( item, currencySymbol ) }
              onClick={ clearRefinement( item ) }
            />
          ) );
        }
        ) }
        <button
          onClick={ clearAllRefinements }
          className='current-refinements__reset'
        >
          { reset }
        </button>
      </div>
    </div>
  );
};

CurrentRefinements.defaultProps = {
  items: [],
  translations: {
    title: 'Applied Filters:',
    reset: 'Clear All'
  },
  key: '',
  currencySymbol: '$'
};

CurrentRefinements.propTypes = {
  items: array,
  handleItems: func,
  refine: func,
  translations: object.isRequired,
  key: string
};

/**
 * @typedef {{
 *  clearsQuery?:boolean,
 *  transformItems?: function,
 *  translations: {title: string, reset: string}
 * }} customCurrentRefinmentListArgs
 */

/**
 * @type {function(customCurrentRefinmentListArgs)}
 */
export const CustomCurrentRefinements = connectCurrentRefinements(
  CurrentRefinements
);
