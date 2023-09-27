import React, { useState } from 'react';
import { string, bool, array } from 'prop-types';
import { orderBy } from 'lodash';

// algolia css reset (affects price range slider)
import 'instantsearch.css/themes/reset.css';

import { ComparisonBanner } from './components/Comparison/ComparisonBanner';
import { MobilePlpHeader } from './components/MobilePlpHeader/MobilePlpHeader';
import { DesktopPlpHeader } from './components/DesktopPlpHeader/DesktopPlpHeader';
import { PlpHit } from './components/PlpHit';

import { InstantSearch, Configure, Hits } from 'react-instantsearch-dom';
import { algoliaService } from 'xps-utils/algolia';
import { selectAlgoliaBrevilleIndex, selectLocale, selectCurrencySymbol } from 'library/store/global/selector';
import { useSelector } from 'react-redux';
import RoundFilterRefinementList from 'components/ReactPlp/components/RoundFilterTiles/RoundFilterTiles';
import { capitalize } from 'xps-utils/format';

export const PlpLandingView = ( { aemData } ) => {
  const [ showFacet, setShowFacet] = useState( null );
  const [ showFeatureFilter, setShowFeatureFilter] = useState( true );
  const { categoryTitle, category } = aemData;
  const { algoliaAttrMap, roundTilesCategory, tiles = [] } = aemData.roundTiles || {};

  const locale = useSelector( selectLocale );
  const brevilleIndex = useSelector( selectAlgoliaBrevilleIndex );
  const currencySymbol = useSelector( selectCurrencySymbol );

  // todo: when creating parts/accessories plps we wil need to pass from AEM the desired itemGroupID (most likely ['SP', 'AC']) <- spare parts & accessories
  const itemGroupIDList = ['FG'];
  // filter string configuration for provided itemGroupIDs
  const itemGroupIDFilters = itemGroupIDList.map( ( id ) => `itemGroupID:"${ id }"` ).join( ' AND ' );

  /** @type {'and' | 'or'} FILTER_OPERATOR */
  const FILTER_OPERATOR = 'or';

  const FACET_MENU = {
    FEATURES: `${ category }FeatureFilter`,
    PRICE: 'retailPrice',
    SORT: 'sort',
    FILTER: 'filter'
  };

  const ALGOLIA_SORT = [
    { value: brevilleIndex, label: 'Relevance' },
    { value: `${ brevilleIndex }_price_desc`, label: 'Price: High to Low' },
    { value: `${ brevilleIndex }_price_asc`, label: 'Price: Low to High' }
  ];

  function toggleFacet( facet ) {
    return ( facet !== showFacet ? setShowFacet( facet ) : setShowFacet( null ) );
  }

  const commonAlgoliConfig = {
    // facets:['productCategory', ...ALGOLIA_FACETS],
    // distinct: true, // attributesForDistinct is set for index?
    // facetingAfterDistinct:true,
    hitsPerPage: 1000, // 1000 is the maximum
    facetingAfterDistinct: true // this will deduplicate the filter count
  };

  function handleClose( ) {
    toggleFacet( showFacet );
  }

  // sort the refinementList and flag whether to show/hide the filter
  function transformFeatureFilterItems( items ) {
    // hide facet if there are none available
    setShowFeatureFilter( items.length !== 0 );
    // capitalize the labels
    const formatedItems = items.map( ( item ) => ( { ...item, label: capitalize( item.label ) } ) );
    // return sorted list of items
    return orderBy( formatedItems, 'label', 'asc' );
  }

  return (
    <>
      <ComparisonBanner locale={ locale } category={ category } />
      <div className='plp-container'>

        <InstantSearch
          indexName={ algoliaService.brevilleIndex }
          searchClient={ algoliaService.client }
        >
          <Configure
            // filter via category and finished good
            filters={ `primaryWebCategory:"${ category }"${ itemGroupIDList ? ` AND ${ itemGroupIDFilters }` : '' }` }
            { ...commonAlgoliConfig }
          />

          { category === roundTilesCategory &&
          <RoundFilterRefinementList
            attribute={ algoliaAttrMap }
            tileList={ tiles }
            operator={ FILTER_OPERATOR }
          /> }

          <MobilePlpHeader
            showFacet={ showFacet }
            showFeatureFilter={ showFeatureFilter }
            toggleFacet={ toggleFacet }
            facetMenu={ FACET_MENU }
            title={ categoryTitle || category }
            transformFeatureFilterItems={ transformFeatureFilterItems }
            sortList={ ALGOLIA_SORT }
            currencySymbol={ currencySymbol }
            filterOperator={ FILTER_OPERATOR }
          />
          <DesktopPlpHeader
            showFacet={ showFacet }
            showFeatureFilter={ showFeatureFilter }
            toggleFacet={ toggleFacet }
            facetMenu={ FACET_MENU }
            title={ categoryTitle || category }
            transformFeatureFilterItems={ transformFeatureFilterItems }
            close={ handleClose }
            sortList={ ALGOLIA_SORT }
            currencySymbol={ currencySymbol }
            filterOperator={ FILTER_OPERATOR }
          />

          <div className='cmp-reactplp__list'>
            <Hits hitComponent={ PlpHit } />
          </div>
        </InstantSearch>
      </div>
    </>
  );
};

PlpLandingView.defaultProps = {
  productCategory: 'All Products',
  rootPlp: false,
  categories: []
};

PlpLandingView.propTypes = {
  productCategory: string,
  rootPlp: bool,
  categories: array
};
