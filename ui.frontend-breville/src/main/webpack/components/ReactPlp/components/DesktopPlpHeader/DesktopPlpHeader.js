import React from 'react';
import classnames from 'classnames';
import { string, object, func, any, bool, array } from 'prop-types';
import {
  CustomCurrentRefinements,
  CustomRangeSlider,
  CustomRefinementList,
  CustomSortByDropdown,
  CustomStatsHits
} from 'components/shared-ui/AlgoliaCustomWidgets';
import Button from 'components/shared-ui/button';

import { ComparisonToggle } from '../Comparison/ComparisonToggle';
import { algoliaService } from 'xps-utils/algolia';

/**
 * Plp Header for desktop view
 * @params {{title: string, facetMenu: object, showFacet: string, toggleFacet: function, transformFeatureFilterItems: function, currencySymbol: string}} args
 * @returns {React.ReactElement}
 */
export const DesktopPlpHeader = ( {
  title,
  facetMenu,
  showFacet,
  showFeatureFilter,
  toggleFacet,
  transformFeatureFilterItems,
  close,
  sortList,
  currencySymbol,
  filterOperator
} ) => {

  function toggleFacetWrapper( facet ) {
    return function () {
      toggleFacet( facet );
    };
  }

  return (
    <div className='plp-header-desktop'>
      <div className='plp-header-desktop__inner'>

        { /* title */ }
        <h2 className='plp-title'>
          { title }{ ' ' }
          <span className='stats-hits'>
            <CustomStatsHits withBrackets />
          </span>
        </h2>

        { /* facets */ }
        <div className='plp-controls'>
          { /* left side */ }
          <div className='plp-controls__left'>
            <div className='plp-controls__filter-title'>Filter by:</div>

            { showFeatureFilter && (
              <div className={ classnames( 'plp-controls__filter-link', {
                  'plp-controls__filter-link-active': showFacet === facetMenu.FEATURES
                } ) }
              >
                <Button
                  colorScheme='black'
                  onClick={ toggleFacetWrapper( facetMenu.FEATURES ) }
                  size='small'
                  type='link'
                  linkType='normal'
                  textType='bold'
                >
                  Features <span className='plp-controls__filter-link-icon' />
                </Button>
              </div>
            ) }

            <div className={ classnames( 'plp-controls__filter-link', {
                'plp-controls__filter-link-active': showFacet === facetMenu.PRICE
              } ) }
            >
              <Button
                colorScheme='black'
                onClick={ toggleFacetWrapper( facetMenu.PRICE ) }
                size='small'
                type='link'
                linkType='normal'
                textType='bold'
              >
                Price Range <span className='plp-controls__filter-link-icon'></span>
              </Button>
            </div>

          </div>
          { /* right side */ }
          <div className='plp-controls__right'>
            <p className='plp-controls__filter-title'>Sort by:</p>
            <CustomSortByDropdown
              defaultRefinement = { algoliaService.brevilleIndex }
              items={ sortList }
            />
            <ComparisonToggle />
          </div>
        </div>

        { /* facet options */ }
        <div className={ classnames( 'facet-container', {
              'facet-container-active': showFacet
            } ) }
        >
          <div className='facet-container-section'>
            { /* close button */ }
            <button onClick={ close } className={ classnames( 'desktop-facet-action-btn', {
                hidden: !showFacet
              } ) }
            >
              <span className='desktop-facet-close-btn-icon'></span>
              <a>Close</a>
            </button>

            <CustomRefinementList
              attribute={ facetMenu.FEATURES }
              transformItems={ transformFeatureFilterItems }
              operator={ filterOperator }
              className={ classnames( 'facet-features', {
                  hidden: showFacet !== facetMenu.FEATURES || !showFeatureFilter
                } ) }
            />

            <CustomRangeSlider
              attribute={ facetMenu.PRICE }
              className={ classnames( 'facet-price', {
                hidden: showFacet !== facetMenu.PRICE
              } ) }
              currencySymbol={ currencySymbol }
            />
          </div>
        </div>
        { /* selected facets */ }
        <CustomCurrentRefinements
          translations={{ title: 'Applied Filters:', reset: 'Clear All' }}
          currencySymbol={ currencySymbol }
        />

      </div>
    </div>
  );
};

DesktopPlpHeader.propTypes = {
  title: string,
  facetMenu: object,
  showFacet: any,
  showFeatureFilter: bool,
  toggleFacet: func,
  transformFeatureFilterItems: func,
  close: func,
  sortList: array,
  currencySymbol: string,
  filterOperator: string
};
