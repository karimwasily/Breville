import React, { useState } from 'react';
import { array, func, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import Button from 'xps-react/core/button';
import FilterMenuMobile from './filter-menu-mobile';
import SortDropDownMobile from './sort-dropdown-mobile';

// const FilterBarMobile = ( { unfilteredList, filteredList, applyFilter, clearFilters, filters, sortOptions, onSort, selectedSort } ) => {
const FilterBarMobile = ( { filterDropdowns, toggleFilterDropdownOption, sortOptions, applySort, selectedSort, clearFilters } ) => {
  const { t } = useTranslation();
  const [ showMobileMenu, setShowMobileMenu ] = useState( false );
  const modalClasses = classnames( 'my-orders__filter-modal', { 'my-orders__filter-modal--open': showMobileMenu } );

  function toggleMobileMenu() {
    setShowMobileMenu( !showMobileMenu );
  }

  return (
    <div className='my-orders__filter-bar--mobile'>
      <div className='my-orders__filter-bar-control'>
        <div className='my-orders__filter-bar-button my-orders__filter-bar-sort'>
          <SortDropDownMobile
            items={ sortOptions }
            onSort={ applySort }
            selectedSort={ selectedSort }
          />
        </div>
        <Button className='my-orders__filter-bar-button' colorScheme='black' onClick={ toggleMobileMenu }>
          { `${ t( 'eh-filter-text-filter' ) }` }
        </Button>
      </div>
      <div className={ modalClasses }>
        <FilterMenuMobile
          filterDropdowns={ filterDropdowns }
          toggleFilterDropdownOption={ toggleFilterDropdownOption }
          closeModal={ toggleMobileMenu }
          clearFilters={ clearFilters }
        />
      </div>
    </div>
  );
};

FilterBarMobile.propTypes = {
  filterDropdowns: array,
  toggleFilterDropdownOption: func,
  sortOptions: array,
  applySort: func,
  selectedSort: string,
  clearFilters: func
};

export default FilterBarMobile;