import React, { useState } from 'react';
import { array, func } from 'prop-types';

export const Dropdown = ( { items, onSelect } ) => {
  // do some state stuff here
  const [selected, setSelected] = useState( items[0] );

  function handleSelect( event ) {
    const item = event.target.value;
    // update internal
    setSelected( item );
    // broadcasting to parent
    onSelect( item );
  }

  return (
    <div className='select-box'>
      <div className='select-box__current' tabindex='0'>
        { items.map( ( item, idx ) => (
          <div key= { idx } className='select-box__value'>
            <input onChange={ handleSelect } className='select-box__input' type='radio' id={ idx } value={ item.value } name={ item.value } checked={ selected.value === item } />
            <div className='select-box__input-text'>{ item.label }</div>
          </div>
        ) ) }
        <img className='select-box__icon' src='/content/dam/breville-brands/coffee-solution/svg/arrow-down-selectbox.svg' alt='Dropdown arrow icon' aria-hidden='true' />
      </div>
      <ul className='select-box__list'>
        { items.map( ( item, idx ) => (
          <li key = { idx } className='select-box__list-item' tabIndex = { idx }>
            <label className='select-box__option' htmlFor={ idx } aria-hidden>{ item.label }</label>
          </li>
          ) ) }
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  items: array,
  onSelect: func
};
