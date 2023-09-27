import React, { useRef } from 'react';
import { InstantSearch, Configure, connectHits } from 'react-instantsearch-dom';
import { withAem } from 'xps-utils/withAem';
import { algoliaService, normalizeBrevilleHit } from 'xps-utils/algolia';

import { HandleResults, RunSearch } from './components';
import { createSearchResultPageURL } from './utils/createSearchResultPageURL';
import { selectSiteRootPath, selectLocale } from 'library/store/global/selector';
import { useSelector } from 'react-redux';


const defaultAlgoliaConfig = {
  distinct: 1, // deduplication enabled
  offset: 0, // start position of results
  length: 5 // number of results to show
};

/**
 * Search Dropdown component
 * @params {{aemData: object}} props props
 * @returns {React.ReactElement}
 */
const SearchDropdown = ( { aemData } ) => {
  const algoliaFirstQuery = useRef( true );
  // prioritise aem algolia config and fallback to default algolia config
  const algoliaConfig = aemData?.algoliaConfig ? { ...defaultAlgoliaConfig, ...aemData.algoliaConfig } : defaultAlgoliaConfig;

  const siteRootPath = useSelector( selectSiteRootPath );
  const locale = useSelector( selectLocale );

  function NoResultsMsg( query ) {
    return ( <p>No results for <span className='search-dropdown__query'>"{ query }"</span></p> );
  }

  function handleSearchSubmit( query ) {
    window.location.href = createSearchResultPageURL( query, siteRootPath );
  }

  /**
   * modified searchclient to avoid firing algolia query on mount since this component leaves in the header for all pages
   * @see https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/react/#detecting-empty-search-requests
   */
  const searchClient = {
    search( requests ) {
      if ( algoliaFirstQuery.current === true ) {
        algoliaFirstQuery.current = false;
        return;
      }
      return algoliaService.client.search( requests );
    }
  };

  return (
    <div className='search-dropdown'>
      <InstantSearch
        indexName={ algoliaService.brevilleIndex }
        searchClient={ searchClient }
      >
        <Configure { ...algoliaConfig } />
        <RunSearch placeholder={ aemData?.searchPlaceholder } charStart={ aemData?.charStart } onSubmit={ handleSearchSubmit } />
        <div className='search-dropdown__results'>
          <HandleResults noResultsComponent={ NoResultsMsg } charStart={ aemData?.charStart }>
            { connectHits( ( { hits } ) => hits.map( ( hit ) => <HitComponent key={ hit.objectID } hit={ hit } locale={ locale } siteRootPath={ siteRootPath } /> ) )() }
          </HandleResults>
        </div>
      </InstantSearch>
    </div>
  );
};

// based on result directly link to search results page with query param
// @example https://www.breville.com/us/en/Search/SearchResult.html?q=the+Barista+Pro%E2%84%A2
const HitComponent = ( { hit, locale, siteRootPath } ) => {
  const normalizedHit = normalizeBrevilleHit( hit, locale );

  return (
    <div className='search-dropdown__item'>
      <p><a href={ createSearchResultPageURL( normalizedHit.WEB_PRODUCT_NAME, siteRootPath ) }>{ normalizedHit.WEB_PRODUCT_NAME }</a></p>
    </div>
  );
};

export default withAem( SearchDropdown );