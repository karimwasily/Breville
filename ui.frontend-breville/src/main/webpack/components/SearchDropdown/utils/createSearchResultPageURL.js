/**
 * create a search results page url with product as query param
 * @param {string} product parent product name
 * @param {string} siteRootPath aem config of site root path url
 * @returns {string} search result page url including search param
 * @example https://www.breville.com/us/en/Search/SearchResult.html?q=the+Barista+Pro%E2%84%A2
 */
export const createSearchResultPageURL = ( product, siteRootPath ) => {
  // todo: internationalisation for 'search' keyword?
  const searchPage = '/Search/SearchResult.html';

  // create param
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append( 'q', product );
  const params = `?${ urlSearchParams.toString() }`;

  // create url
  const url = `${ siteRootPath }${ searchPage }${ params }`;

  return url;
};
