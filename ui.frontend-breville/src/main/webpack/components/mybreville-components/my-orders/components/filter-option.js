import React from 'react';
import classNames from 'classnames';
import { object, string, func } from 'prop-types';

const FilterOption = ( { className, item, type, onClick } ) => {

  function handleOnClick() {
    if ( onClick && typeof onClick === 'function' ) {
      onClick( item, type );
    }
  }

  const classes = classNames( 'my-orders__filter-option', className, {
    'my-orders__filter-option--selected': item.active
  } );

  return (
    <li key={ item.label } className={ classes }>
      <label className='my-orders__filter-option-label'>
        <input
          className='my-orders__filter-option-checkbox'
          type='checkbox'
          onClick={ handleOnClick }
        />
        <span className='my-orders__filter-option-labelText'>{ item.label }</span>{ ' ' }
        <span className='my-orders__filter-option-count'>{ item.count }</span>
      </label>
    </li>
  );
};

FilterOption.propTypes = {
  className: string,
  item: object,
  type: string,
  onClick: func
};

export default FilterOption;