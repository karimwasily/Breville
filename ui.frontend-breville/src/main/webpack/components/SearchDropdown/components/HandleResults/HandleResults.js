import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

const Results = ( { searchState, searchResults, children, noResultsComponent, charStart } ) => {
  // don't provide results on empty query or if query length is less than specified minimum number of characters (charStart)
  if ( !searchState.query || searchState?.query === '' || searchState?.query.length < charStart ) return [];

  // if we have results then show
  if ( searchResults?.nbHits !== 0 ) return children;

  // msg when no available results
  return noResultsComponent( searchState.query ) || ( <p>No results have been found for "{ searchState.query }"</p> );
};


export const HandleResults = connectStateResults( Results );