import React from 'react';
import classnames from 'classnames';
import { array, object, func, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import FilterOption from './filter-option';

const FilterOptions = ( { className, type, filterOptions, applyFilter, handleClose } ) => {
  const { t } = useTranslation();

  function onClosed() {
    if ( handleClose && typeof handleClose === 'function' ) {
      handleClose();
    }
  }

  const facetContainerClasses = classnames( 'my-orders__filter-options-wrapper', className );

  return (
    <div className={ facetContainerClasses }>
      <button onClick={ onClosed } className='my-orders__close-button' >
        <span className='my-orders__close-button-icon'></span>
        <a className='my-orders__close-button-text'> { t( 'eh-text-close' ) } </a>
      </button>
      <div className='my-orders__filter-options' >
        {
          filterOptions.map( ( filterOption, idx ) => (
            <FilterOption
              key={ idx }
              item={ filterOption }
              onClick={ applyFilter }
              type={ type }
            />
          ) )
        }
      </div>
    </div>
  );
};

FilterOptions.defaultProps = {
  type: '',
  filterOptions: []
};

FilterOptions.propTypes = {
  className: string,
  type: string,
  filterOptions: array.isRequired,
  applyFilter: func,
  handleClose: func
};

export default FilterOptions;