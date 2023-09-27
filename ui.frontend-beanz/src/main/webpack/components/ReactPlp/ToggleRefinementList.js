import React from 'react';
import classNames from 'classnames';
import { connectRefinementList } from 'react-instantsearch-dom';


// it toggles each refinement list only one selection at a time.
const RefinementList = ( { items, refine } ) => {

  function handleClickWrap( item ) {
    return function ( event ) {
      event.preventDefault();
      refine( item.value );
    };
  }

  function displayItems( items ) {
    const selectedItem = items.filter( ( item ) => item.isRefined );
    return selectedItem.length ? selectedItem : items;
  }

  return (
    <div className='ais-RefinementList'>
      <ul className='ais-RefinementList-list'>
        { displayItems( items ).map( ( item ) => (
          <li key={ item.label } className={ classNames( 'ais-RefinementList-item', { 'ais-RefinementList-item--selected': item.isRefined } ) }>
            <label className='ais-RefinementList-label'>
              <input className='ais-RefinementList-checkbox' type='checkbox' onClick={ handleClickWrap( item ) } />
              <span className='ais-RefinementList-labelText'>{ item.label }</span>{ ' ' }
              <span className='ais-RefinementList-count'>({ item.count })</span>
            </label>
          </li>
        ) ) }
      </ul>
    </div>

  );
};

export const ToggleRefinementList = connectRefinementList( RefinementList );
