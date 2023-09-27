import React, { useRef, useState } from 'react';
import { InstantSearch, Hits, Configure } from 'react-instantsearch-dom';
import { withAem } from 'xps-utils/withAem';
import { algoliaService } from 'xps-utils/algolia';

import { AlgoliaProductTile } from 'components/shared-ui/ProductTile';
import Button from 'components/shared-ui/button';
import { CustomStatsHits } from 'components/shared-ui/AlgoliaCustomWidgets';
import { removeTrademarks } from 'xps-utils/removeTrademarks';

const defaultAlgoliaConfig = {
  distinct: 0, // deduplication disabled
  offset: 0, // start position of results
  length: 3 // number of results to show
};

/**
 * Search Results Page component
 * @params {{aemData: object}} props props
 * @returns {React.ReactElement}
 */
const SearchResults = ( { aemData } ) => {
  // prioritise aem algolia config and fallback to default algolia config
  const algoliaConfig = aemData?.algoliaConfig ? { ...defaultAlgoliaConfig, ...aemData.algoliaConfig } : defaultAlgoliaConfig;

  const machineConfig = {
    ...algoliaConfig,
    filters: 'itemGroupID:"FG"'
  };
  const partsAccessoriesConfig = {
    ...algoliaConfig,
    filters: 'itemGroupID:"AC" OR itemGroupID:"SP"'
  };

  const searchQuery = getQueryFromSearchParams();
  const normalizedSearchQuery = removeTrademarks( searchQuery );

  // if no search query provided then go home
  if ( !normalizedSearchQuery || normalizedSearchQuery === '' ) return null;

  return (
    <div className='search-results'>
      <div className='search-results__inner'>

        <InstantSearch
          indexName={ algoliaService.brevilleIndex }
          searchClient={ algoliaService.client }
        >
          <Configure { ...algoliaConfig } query={ normalizedSearchQuery } />
          <h3 className='search-results__title'><CustomStatsHits /> search results for "<span className='search-results__query'>{ searchQuery }</span>"</h3>
        </InstantSearch>

        { /* Products */ }
        <ResultSection
          indexName={ algoliaService.brevilleIndex }
          searchClient={ algoliaService.client }
          config={ machineConfig }
          query={ normalizedSearchQuery }
          title='Products'
          btnLabel='See All'
        />

        { /* Parts & Accesories */ }
        <ResultSection
          indexName={ algoliaService.brevilleIndex }
          searchClient={ algoliaService.client }
          config={ partsAccessoriesConfig }
          query={ normalizedSearchQuery }
          title='Parts & Accessories'
          btnLabel='See All'
        />

      </div>
    </div>
  );
};

const ResultSection = ( { indexName, searchClient, config, query, title, btnLabel } ) => {
  const [hitCount, setHitCount] = useState( 0 );
  const [displayLimit, setDisplayLimit] = useState( config.length || 3 );

  // allow user to see all available results
  function btnClick() {
    setDisplayLimit( 99 );
  }

  function handleNbHits( nbHits ) {
    setHitCount( nbHits );
  }

  return (
    <InstantSearch indexName={ indexName } searchClient={ searchClient } >
      <Configure { ...config } length={ displayLimit } query={ query } />
      <CustomStatsHits hide={ true } handleNbHits={ handleNbHits } />

      { hitCount > 0 && (
      <>
        <h2 className='search-results__subtitle'>{ title }{ ' ' }<CustomStatsHits withBrackets={ true } className='search-results__subtitle-count' /></h2>
        <div className='search-results__results'>
          <Hits hitComponent={ HitComponent } />
        </div>

        { ( hitCount > config.length ) && ( displayLimit <= config.length ) && (
          <div className='search-results__btn-wrapper'>
            <Button
              className='search-results__btn'
              textType='bold'
              icon='arrow-right'
              size='large'
              colorScheme='purple'
              onClick={ btnClick }
            >{ btnLabel }</Button>
          </div>
        ) }
      </>
    ) }

    </InstantSearch>
  );
};


// based on result directly link to search results page with query param
// @example https://www.breville.com/us/en/Search/SearchResult.html?q=the+Barista+Pro%E2%84%A2
const HitComponent = ( { hit } ) => (
  <div className='search-dropdown__item'>
    <AlgoliaProductTile hit={ hit } showVariants={ false } />
  </div>
);

function getQueryFromSearchParams() {
  const params = ( new URL( document.location ) ).searchParams;
  const query = params.get( 'q' );
  return query;
}

export default withAem( SearchResults );