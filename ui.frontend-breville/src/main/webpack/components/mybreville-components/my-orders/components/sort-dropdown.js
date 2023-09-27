import React from 'react';
import { array, func, string } from 'prop-types';
import classNames from 'classnames';


const SortDropDown = ( { items, onSort, selectedSort } ) => {

  function handleSelect( event ) {
    const value = event.target.value;
    onSort( value );
  }

  return (
    <div className='select-box'>
      <div className='select-box__current' tabIndex='0'>
        { items.map( ( item, index ) => (
          <div key= { item.value } className='select-box__value'>
            <input
              onChange={ handleSelect }
              className='select-box__input'
              type='radio'
              id={ index }
              value={ item.value }
              name={ item.value }
              checked={ item.value === selectedSort }
            />
            <div className={ classNames( 'select-box__input-text', {
              ['show-text']: item.value === selectedSort
            } ) }
            >
              { item.option }
            </div>
          </div>
        ) ) }
        <span className='select-box__icon' />
      </div>
      <ul className='select-box__list'>
        { items.map( ( item, index ) => (
          <li
            key={ item.value }
            className='select-box__list-item'
            tabIndex = { index }
          >
            <label
              className='select-box__option'
              htmlFor={ index }
              aria-hidden
            >
              { item.label }
            </label>
          </li>
          ) ) }
      </ul>
    </div>
  );
};

SortDropDown.propTypes = {
  itmes: array,
  onSort: func,
  selectedSort: string
};

export default SortDropDown;