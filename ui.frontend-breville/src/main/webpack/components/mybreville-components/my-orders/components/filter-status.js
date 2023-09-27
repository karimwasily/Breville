import React from 'react';
import { array, func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import FilterStatusOption from './filter-status-option';

const FilterStatus = ( { filterDropdowns, removeFilter, clearFilters } ) => {
  const { t } = useTranslation();
  const filterOptions = [];

  function handleOptionClick( item, type ) {
    removeFilter( item, type );
  }

  for ( let i = 0, len = filterDropdowns?.length; i < len; i++ ) {
    const filterDropdown = filterDropdowns[i],
      filterName = filterDropdown?.filterName,
      filterActiveOptions = filterDropdown?.filterOptions?.filter( ( elem ) => elem.active );

    if ( filterName && filterActiveOptions?.length ) {
      for ( let y = 0, len2 = filterActiveOptions?.length; y < len2; y++ ) {
        const filterActiveOption = filterActiveOptions[y];
        filterOptions.push(
          <FilterStatusOption
            key={ filterName }
            classname='my-orders__filter-status-option'
            item={ filterActiveOption }
            type={ filterName }
            onClick={ handleOptionClick }
          />
        );
      }
    }
  }

  return filterOptions.length > 0 && (
    <div className='my-orders__filter-status'>
      <p className='my-orders__filter-status-title'>{ t( 'eh-filter-label-applied-filters' ) }:</p>
      <div className='my-orders__filters-status-wrapper'>
        { filterOptions }
      </div>
      <button className='my-orders__filter-clear-all' onClick={ clearFilters }>{ t( 'eh-filter-label-clear-all' ) }</button>
    </div>
  );
};

FilterStatus.propTypes = {
  filterDropdowns: array,
  removeFilter: func,
  clearFilters: func
};

export default FilterStatus;