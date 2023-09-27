import algoliasearch from 'algoliasearch'
import { kebabToSnakeCase } from '../format';

/**
 * algoliaService 
 * 
 * acts as the wrapper to for setup of all creds and indexes with option to manually use others. 
 * It will on setup also consume locale. 
 * This will act as a single configured algoliasearch client and reduce the friction of requiring additional creds at each implementation point.
 * 
 * one time algoliaService.setup() in App.js
 * 
 * to add a new index update the constructure and 'getIndexName' helper
 */
class AlgoliaService {
  constructor() {
    if ( !AlgoliaService._instance ) {
      AlgoliaService._instance = this;

    }
    return AlgoliaService._instance;
  }

/**
 * setup the algolia search client
 * to be initialised on mount with api credentials
 * you can use the client method to directly interface with it
 * @param {string} appID - algolia app id
 * @param {string} searchApiKey  - algolia public search api key
 * @param {string} brevilleIndex  - breville algolia index 
 * @param {string} beanzIndex  - beanz algolia index 
 * @param {string} locale  - locale region (en-US) 
 * @returns {void}
 */
  setup(appID, searchApiKey, brevilleIndex, beanzIndex, locale) {
    this.appID = appID
    this.searchApiKey = searchApiKey
    this.client = algoliasearch(appID, searchApiKey)
    this.brevilleIndex = brevilleIndex
    this.beanzIndex = beanzIndex
    this.locale = locale
  }

/**
 * init algolia index
 * @param {{indexName?: Indexes | string}} indexName - existing or new algolia index name
 * @returns {object} algolia index
 */
  initIndex(indexName) {
    return this.client.initIndex(this.getIndexName(indexName)) 
  }

/**
 * init breville index
 * @returns {object} algolia index
 */
  initBrevilleIndex() {
    return this.client.initIndex(this.brevilleIndex) 
  }

/**
 * init beanz index
 * @returns {object} algolia index
 */
  initBeanzIndex() {
    return this.client.initIndex(this.beanzIndex) 
  }

  /**
   * search the breville algolia index
   * @param {string?} query Query
   * @param {object?} requestConfig Algolia's RequestOptions
   * @returns {Promise} algolia hits response
   */
  async searchBrevilleIndex( query = '', requestConfig = {} ) {
    return this.initBrevilleIndex().search( query, requestConfig )
  }

  /**
   * search the beanz algolia index
   * @param {string?} query Query
   * @param {object?} requestConfig Algolia's RequestOptions
   * @returns {Promise} algolia hits response
   */
  async searchBeanzIndex( query = '', requestConfig = {} ) {
    return this.initBeanzIndex().search( query, requestConfig )
  }

  /**
   * get breville objects
   * @param {string[]?} objectIDList list of object IDs
   * @param {object?} requestConfig Algolia's RequestOptions
   * @returns {Promise} algolia hits response
   */
  async getBrevilleObjects( objectIDList = [], requestConfig = {} ) {
    return this.initBrevilleIndex().getObjects( objectIDList, requestConfig )
  }

  /**
   * get beanz objects
   * @param {string[]?} objectIDList list of object IDs
   * @param {object?} requestConfig Algolia's RequestOptions
   * @returns {Promise} algolia hits response
   */
  async getBeanzObjects( objectIDList = [], requestConfig = {} ) {
    return this.initBeanzIndex().getObjects( objectIDList, requestConfig )
  }

/**
 * Algolia API call to get hits via objectID array
 * @param {{indexName?: 'breville' | 'beanz' | string, objectIDList: array}} args
 * @returns {Promise}
 */
  async getObjectIDs({
    indexName = 'breville',
    objectIDList,
  }) {
    return this.initIndex(this.getIndexName(indexName)).getObjects(objectIDList)
  }

/**
 * return values of a particular algolia facet
 * @param {string} facet facet name
 * @param {indexName?: 'breville' | 'beanz' | string} indexName algolia index
 * @returns {Promise}
 */
  async getFacetValues(facet, indexName = 'breville') {
    return this.initIndex(this.getIndexName(indexName))
    .search('', {
      facets: [facet]
    }).then(data => {
      return data.facets[facet]
    })
  }

  /**
   * return long term beanz products based on brand
   * @param {string} vendorID vendor coffee brand id
   * @see https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/
   * @returns {Promise}
   */
   async getBeanzBrandLongTermProducts(vendorID, algoliaConfig = {}) {
    return this.initBeanzIndex().search( '', {
      facetFilters: [`vendorNumber:${ vendorID }`, `WEB_TERM_${ kebabToSnakeCase( this.locale ) }:Long`],
      offset: 0,
      length: 3,
      ...algoliaConfig
    } )
  }

  /**
   * internal helper to grab correct brand index
   * @param {'breville' | 'beanz' | string} indexName algolia index brand to use existing or new
   * @returns 
   */
  getIndexName(indexName) {
    switch(indexName.toLowerCase()) {
      case 'breville': 
        return this.brevilleIndex
      case 'beanz':
        return this.beanzIndex
      default: 
        return indexName
    }
  }

}

export default new AlgoliaService();