import React, { useState } from 'react';
import { array } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { createFilterDropdowns, updateFilterOptionCounts, sortByValue } from '../helpers';

import LoadMore from './orders-load-more';
import FilterBarDesktop from './filter-bar-desktop';
import FilterBarMobile from './filter-bar-mobile';
import FilterStatus from './filter-status';

const OrdersList = ( { orders } ) => {
  const { t } = useTranslation();
  const FILTER_DROPDOWNS = createFilterDropdowns( t, orders );

  // sort options to be passed to both mobile & desktop sort dropdown components
  const SORT_OPTIONS = [
    {
      value: 'time_desc',
      option: t( 'eh-sort-text-latest' ),
      label: t( 'eh-sort-text-latest' )
    },
    {
      value: 'time_asc',
      option: t( 'eh-sort-text-oldest' ),
      label: t( 'eh-sort-text-oldest' )
    },
    { value: 'price_desc',
      option: t( 'eh-sort-option-price-high' ),
      label: t( 'eh-sort-label-price-high' )
    },
    {
      value: 'price_asc',
      option: t( 'eh-sort-option-price-low' ),
      label: t( 'eh-sort-label-price-low' )
    }
  ];

  const [ filteredOrders, setFilteredOrders ] = useState( orders );
  const [ filterDropdowns, setFilterDropdowns] = useState( FILTER_DROPDOWNS );
  const [ selectedSort, setSelectedSort ] = useState( SORT_OPTIONS[0].value );

  function applyFilter( lastFilterDropdowns, lastSelectedSort ) {
    const typeFilterOptions = lastFilterDropdowns?.find( ( elem ) => elem.filterName === t( 'eh-filter-text-type' ) )?.filterOptions || [],
      yearFilterOptions = lastFilterDropdowns?.find( ( elem ) => elem.filterName === t( 'eh-filter-text-year' ) )?.filterOptions || [],
      typeActiveFilters = typeFilterOptions.filter( ( elem ) => elem.active ).map( ( elem ) => elem.label ),
      yearActiveFilters = yearFilterOptions.filter( ( elem ) => elem.active ).map( ( elem ) => elem.label );

    // Criterions
    // console.log( { typeActiveFilters, yearActiveFilters, lastSelectedSort } );
    let filteredOrders = orders.slice();

    // Filter whether the orders is subscribed or not
    if ( typeActiveFilters.length === 1 ) {
      // Either subscribed or standard
      if ( typeActiveFilters[0] === t( 'eh-filter-label-subscription-orders' ) ) {
        // Subscribed orders
        filteredOrders = filteredOrders.filter( ( order ) => !!order.HasSubscriptions );
      }
      else {
        // Standard orders
        filteredOrders = filteredOrders.filter( ( order ) => !order.HasSubscriptions );
      }
    }

    // Filter by year
    if ( yearActiveFilters?.length ) {
      filteredOrders = filteredOrders.filter( ( order ) => {
        const orderDate = new Date( order?.OrderCreatedDate ),
          orderDateYear = orderDate.getFullYear();

        /** Find years existing in the active year filters array */
        if ( !isNaN( orderDateYear ) ) {
          return yearActiveFilters.map( Number ).indexOf( orderDateYear ) >= 0;
        }

        return false;
      } );
    }

    // Finally, sort it
    filteredOrders = sortByValue( filteredOrders, lastSelectedSort );
    setFilteredOrders( filteredOrders );
    return filteredOrders;
  }

  // Action taken when filter is pressed by user
  function toggleFilterDropdownOption( filterOption, filterName ) {
    const clonedFilterDropdowns = filterDropdowns.slice();

    /** Toggle the selected filter option */
    const selectedFilterDropdown = clonedFilterDropdowns.find( ( elem ) => elem.filterName === filterName );

    if ( selectedFilterDropdown?.filterOptions ) {
      const selectedFilterDropdownOption = selectedFilterDropdown.filterOptions.find( ( elem ) => elem.label === filterOption.label );

      if ( selectedFilterDropdownOption ) {
        selectedFilterDropdownOption.active = !selectedFilterDropdownOption.active;

        /** Set the new state for filter dropdown */
        setFilterDropdowns( clonedFilterDropdowns );

        /** Apply filter (It also updates orders state) */
        const filteredOrders = applyFilter( clonedFilterDropdowns, selectedSort );

        /** Do a re-count for all filterOption from the non-selected filterName */
        const notSelectedFilters = clonedFilterDropdowns.filter( ( elem ) => elem.filterName !== filterName );
        for ( let i = 0, len = notSelectedFilters.length; i < len; i++ ) {
          const filterDropdown = notSelectedFilters[i],
            filterOptions = filterDropdown.filterOptions;

          if ( filterOptions?.length ) {
            filterDropdown.filterOptions = updateFilterOptionCounts( t, filteredOrders, filterOptions );
          }
        }
        setFilterDropdowns( clonedFilterDropdowns );
      }
    }
  }

  // Action taken when a sort option is pressed by user
  function applySort( sortValue ) {
    setSelectedSort( sortValue );

    /** Apply filter */
    applyFilter( filterDropdowns, sortValue );
  }

  // Clear all filters
  function clearFilters() {
    setFilterDropdowns( FILTER_DROPDOWNS );
    setSelectedSort( SORT_OPTIONS[0].value );

    /** Apply filter */
    applyFilter( FILTER_DROPDOWNS, SORT_OPTIONS[0].value );

    /**
     * Reset the filter dropdowns to original state
     */
    const newFilterDropdowns = createFilterDropdowns( t, orders );
    setFilterDropdowns( newFilterDropdowns );
  }

  return (
    <div className='orders-list'>
      <FilterBarDesktop
        filterDropdowns={ filterDropdowns }
        toggleFilterDropdownOption={ toggleFilterDropdownOption }
        sortOptions={ SORT_OPTIONS }
        applySort={ applySort }
        selectedSort={ selectedSort }
      />
      <FilterBarMobile
        filterDropdowns={ filterDropdowns }
        toggleFilterDropdownOption={ toggleFilterDropdownOption }
        sortOptions={ SORT_OPTIONS }
        applySort={ applySort }
        selectedSort={ selectedSort }
        clearFilters={ clearFilters }
      />
      <FilterStatus
        filterDropdowns={ filterDropdowns }
        removeFilter={ toggleFilterDropdownOption }
        clearFilters={ clearFilters }
      />
      <LoadMore orders={ filteredOrders } />
    </div>
  );
};

OrdersList.propTypes = {
  orders: array
};

export default OrdersList;