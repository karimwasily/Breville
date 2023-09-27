import React from 'react';
import { array, func } from 'prop-types';
import { connectSortBy } from 'react-instantsearch-dom';
import classNames from 'classnames';

/**
 * @typedef {{
 *    label: string,
 *    value: string,
 *    count: number,
 *    isRefined: boolean
 *  }} RefinementListItem
 */

/**
 * Custom Algolia SortBy Dropdown Component
 * @params {{items?: RefinementListItem[], refine: function }} param0
 * @returns {React.ReactElement}
 */
const SortByDropdown = ( { items = [], refine } ) => {

  function handleChangeWrap( item ) {
    return function handleChange( event ) {
      if ( !item.isRefined ) {
        refine( item.value );
      }
    };
  }

  return (
    <div className='select-box'>
      <div className='select-box__current' tabIndex='0'>
        { items.map( ( item ) => (
          <div key={ item.label } className='select-box__value'>
            <input onChange={ handleChangeWrap( item ) }
              className='select-box__input'
              type='radio'
              id={ item.label }
              value={ item.value }
              name={ item.value }
              checked={ item.isRefined }
            />
            <div className={ classNames( 'select-box__input-text', {
              ['show-text']: item.isRefined
            } ) }
            >{ item.label }</div>
          </div>
        ) ) }
        <img className='select-box__icon' src='/content/dam/breville-brands/coffee-solution/svg/arrow-down-selectbox.svg' alt='Dropdown arrow icon' aria-hidden='true' />
      </div>
      <ul className='select-box__list'>
        { items.map( ( item ) => (
          <li key={ item.label } className='select-box__list-item' tabIndex={ item.label }>
            <label className='select-box__option' htmlFor={ item.label } aria-hidden>{ item.label }</label>
          </li>
          ) ) }
      </ul>
    </div>
  );
};

SortByDropdown.defaultProps = {
  items: []
};

SortByDropdown.propTypes = {
  items: array,
  refine: func
};

/**
 * @typedef {{
 *  items?: RefinementListItem[],
 *  defaultRefinement?: string,
 *  transformItems?: function
 * }} customSortByArgs
 */

/**
 * @type {function(customSortByArgs)}
 */
export const CustomSortByDropdown = connectSortBy( SortByDropdown );
