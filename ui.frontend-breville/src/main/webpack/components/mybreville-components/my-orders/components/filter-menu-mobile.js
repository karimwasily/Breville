import React, { useState } from 'react';
import { array, func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from 'xps-react/core/button';
import FilterDropdown from './filter-dropdown';
import FilterOptions from './filter-options';

const FilterMenuMobile = ( { filterDropdowns, toggleFilterDropdownOption, closeModal, clearFilters } ) => {
  const { t } = useTranslation();
  const filterTypeDropdown = filterDropdowns?.find( ( elem ) => elem.filterName === t( 'eh-filter-text-type' ) );
  const filterYearDropdown = filterDropdowns?.find( ( elem ) => elem.filterName === t( 'eh-filter-text-year' ) );
  const [isOpenFilterType, setOpenFilterType] = useState( false );
  const [isOpenFilterYear, setOpenFilterYear] = useState( false );

  function onFilterTypeDropdownToggle() {
    setOpenFilterType( !isOpenFilterType );
  }

  function onFilterYearDropdownToggle() {
    setOpenFilterYear( !isOpenFilterYear );
  }

  function onFilterTypeDropdownClose() {
    setOpenFilterType( false );
  }

  function onFilterYearDropdownClose() {
    setOpenFilterYear( false );
  }

  return (
    <div className='my-orders__filter-menu-mobile'>
      <div className='my-orders__filter-menu'>
        <p className='my-orders__filter-title'>{ `${ t( 'eh-filter-text-filter-by' ) }:` }</p>
        <button className='my-orders__filter-menu-button' onClick={ closeModal }></button>
      </div>
      <div className='my-orders__filter-menu-type'>
        <FilterDropdown
          filterName={ filterTypeDropdown.filterName }
          open={ isOpenFilterType }
          onClick={ onFilterTypeDropdownToggle }
        />
        {
          isOpenFilterType && (
            <FilterOptions
              type={ filterTypeDropdown.filterName }
              filterOptions={ filterTypeDropdown.filterOptions }
              applyFilter={ toggleFilterDropdownOption }
              handleClose={ onFilterTypeDropdownClose }
            />
          )
        }
      </div>
      <div className='my-orders__filter-menu-year'>
        <FilterDropdown
          filterName={ filterYearDropdown.filterName }
          open={ isOpenFilterYear }
          onClick={ onFilterYearDropdownToggle }
        />
        {
          isOpenFilterYear && (
            <FilterOptions
              type={ filterYearDropdown.filterName }
              filterOptions={ filterYearDropdown.filterOptions }
              applyFilter={ toggleFilterDropdownOption }
              handleClose={ onFilterYearDropdownClose }
            />
          )
        }
      </div>
      <div className='my-orders__filter-buttons'>
        <Button className='my-orders__filter-apply-button' onClick={ closeModal } colorScheme='green'>
          { t( 'eh-filter-text-apply' ) }
        </Button>
        <button className='my-orders__filter-reset-button' onClick={ clearFilters }>
          { t( 'eh-filter-label-clear-filters' ) }
        </button>
      </div>
    </div>
  );
};

FilterMenuMobile.propTypes = {
  filterDropdowns: array,
  toggleFilterDropdownOption: func,
  onClick: func,
  clearFilters: func
};

export default FilterMenuMobile;