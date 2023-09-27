import React from 'react';
import { object, string, func } from 'prop-types';

const FilterStatusOption = ( { classname, item, type, onClick } ) => {

  function handleOnClick() {
    onClick( item, type );
  }

  return (
    <li key={ item.label } className={ classname }>
      <span className='my-orders__filter-option-labelText'>{ item.label }</span>{ ' ' }
      <button className='my-orders__filter-option-cancel' onClick={ handleOnClick }></button>
    </li>
  );
};

FilterStatusOption.propTypes = {
  classname: string,
  item: object,
  type: string,
  onClick: func
};

export default FilterStatusOption;