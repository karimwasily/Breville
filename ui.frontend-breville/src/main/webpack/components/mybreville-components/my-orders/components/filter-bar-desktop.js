import React, { useState } from 'react';
import { array, func, string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import FilterDropdown from './filter-dropdown';
import FilterOptions from './filter-options';
import SortDropDown from './sort-dropdown';

const FilterBarDesktop = ( { filterDropdowns, toggleFilterDropdownOption, sortOptions, applySort, selectedSort } ) => {
  const { t } = useTranslation();
  const [toggledFilterDropdown, setToggledFilterDropdown] = useState( null );

  function onFilterDropdownClick( filterName ) {
    if ( toggledFilterDropdown?.filterName === filterName ) {
      setToggledFilterDropdown( null );
    }
    else {
      const selectedFilterDropdown = filterDropdowns.find( ( elem ) => elem.filterName === filterName );
      if ( selectedFilterDropdown ) {
        setToggledFilterDropdown( selectedFilterDropdown );
      }
    }
  }

  function handleClose( ) {
    setToggledFilterDropdown( null );
  }

  return (
    <div className='my-orders__filter-bar--desktop'>
      <div className='my-orders__filter-bar-left'>
        <p className='my-orders__filter-title'>{ `${ t( 'eh-filter-text-filter-by' ) }:` }</p>
        {
          filterDropdowns.map( ( elem, idx ) => (
            <FilterDropdown
              key={ idx }
              filterName={ elem.filterName }
              open={ toggledFilterDropdown?.filterName === elem.filterName }
              onClick={ onFilterDropdownClick }
            />
          ) )
        }
      </div>
      <div className='my-orders__filter-bar-right'>
        <p className='my-orders__filter-title my-orders__filter-title--right'>{ `${ t( 'eh-filter-text-sort-by' ) }:` }</p>
        <SortDropDown
          items={ sortOptions }
          onSort={ applySort }
          selectedSort={ selectedSort }
        />
      </div>
      {
        !!toggledFilterDropdown?.filterName && (
          <FilterOptions
            type={ toggledFilterDropdown.filterName }
            filterOptions={ toggledFilterDropdown.filterOptions }
            applyFilter={ toggleFilterDropdownOption }
            handleClose={ handleClose }
          />
        )
      }
    </div>
  );
};

FilterBarDesktop.propTypes = {
  filterDropdowns: array,
  toggleFilterDropdownOption: func,
  sortOptions: array,
  applySort: func,
  selectedSort: string
};

export default FilterBarDesktop;