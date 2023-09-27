import React from 'react';
import { object, func, any, bool, array, string } from 'prop-types';
import {
  CustomCurrentRefinements,
  CustomStatsHits
} from 'components/shared-ui/AlgoliaCustomWidgets';
import Button from 'components/shared-ui/button';
import { ComparisonToggle } from '../Comparison/ComparisonToggle';
import { MobileFilterMenu } from '../MobileFilterMenu/MobileFilterMenu';
import { algoliaService } from 'xps-utils/algolia';
import { SortBy } from 'react-instantsearch-dom';

/**
 * Plp Header for mobile view
 * @params {{facetMenu: object, showFacet: string | null, toggleFacet: function, transformFeatureFilterItems: function}} param0
 * @returns {React.ReactElement}
 */
export const MobilePlpHeader = ( { title, facetMenu, showFacet, showFeatureFilter, toggleFacet, transformFeatureFilterItems, sortList, currencySymbol, filterOperator } ) => {
  function toggleFacetWrapper( facet ) {
    return function () {
      toggleFacet( facet );
    };
  }

  return (
    <div className='plp-header-mobile'>
      { /* facets */ }
      <div className='plp-controls'>

        { /* Render a dropdown select menu that utilises the native dropdown of the mobile device */ }
        <div className='sort-by-btn'>
          <SortBy
            defaultRefinement = { algoliaService.brevilleIndex }
            items={ sortList }
          />
        </div>
        <Button
          colorScheme='black'
          onClick={ toggleFacetWrapper( facetMenu.FILTER ) }
          isActive={ facetMenu.FILTER === showFacet }
        >
          Filter
        </Button>
        <ComparisonToggle btnSize='medium' className='compare-btn' />
      </div>

      { /* facet options */ }
      <div className='facet-container'>
        { /* sort menu */ }
        { /* filter menu */ }
        <MobileFilterMenu
          facetMenu={ facetMenu }
          toggleFacet={ toggleFacet }
          showFeatureFilter={ showFeatureFilter }
          transformFeatureFilterItems={ transformFeatureFilterItems }
          isActive={ showFacet === facetMenu.FILTER }
          close={ toggleFacetWrapper( facetMenu.FILTER ) }
          currencySymbol={ currencySymbol }
          filterOperator={ filterOperator }
        />
      </div>

      { /* selected facets */ }
      <CustomCurrentRefinements
        translations={{ title: 'Applied Filters:', reset: 'Clear All' }}
        currencySymbol={ currencySymbol }
      />

      { /* title */ }
      <h4 className='plp-title'>
        <CustomStatsHits /> Products
      </h4>
    </div>
  );
};

MobilePlpHeader.propTypes = {
  facetMenu: object.isRequired,
  showFacet: any,
  showFeatureFilter: bool,
  toggleFacet: func.isRequired,
  transformFeatureFilterItems: func,
  sortList: array,
  currencySymbol: string,
  filterOperator: string
};
