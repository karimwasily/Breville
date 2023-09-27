import { ALGOLIA_AVAILABLE_WEB_STATUS } from 'library/constants';

/**
 * helper to filter algolia hits for only visible
 * @param {object | array} response either the response or the algolia hits
 * @returns {array} filtered hits based on specified webStatus
 */
export const filterVisibleAlgoliaHits = ( response ) => {
  let hits = [];
  if ( Array.isArray( response ) ) {
    hits = response;
  }
  else if ( Array.isArray( response.hits ) ) {
    hits = response.hits;
  }
  else if ( Array.isArray( response.results ) ) {
    hits = response.results;
  }
  else {
    throw 'no hits found';
  }

  return hits.filter( ( hit ) => ALGOLIA_AVAILABLE_WEB_STATUS.some( ( status ) => hit.webStatus.toLowerCase() === status.toLocaleLowerCase() ) );
};