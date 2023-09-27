import React from 'react';
import { array, func, string } from 'prop-types';


const SortDropDownMobile = ( { items, onSort, selectedSort } ) => {

  function handleChange( event ) {
    const value = event.target.value;
    onSort( value );
  }

  return (
    <div className='ais-SortBy'>
      <select
        className='ais-SortBy-select'
        aria-label='Sort By'
        value={ selectedSort }
        onChange={ handleChange }
      >
        { items.map( ( item ) => (
          <option
            key={ item.value }
            className='ais-SortBy-option'
            value={ item.value }
          >
            { item.label }
          </option>
          ) ) }
      </select>
    </div>
  );
};

SortDropDownMobile.propTypes = {
  itmes: array,
  onSort: func,
  selectedSort: string
};

export default SortDropDownMobile;