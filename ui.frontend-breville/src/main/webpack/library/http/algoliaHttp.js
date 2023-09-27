
import { getAEMGlobalConfig } from 'xps-utils/aemGlobalConfig';
import { algoliaService } from 'xps-utils/algolia';

const { algoliabrevilleindex, algoliabeanzindex } = getAEMGlobalConfig();

const CACHE_KEY = 'ASP';
const cacheMap = new Map();

// These fields will come from AEM
const masterClassesSearch = 'en_US';

export const AlgoliaHttp = {

  /**
   * Helper to fetch beanz and breville products
   * @param {string?} itemNumber Product Number to search for the hit
   * @param {object?} requestConfig Algolia's RequestOptions
   * @returns {object} Found algolia hit
   */
  searchProductByNumber: async ( itemNumber, requestConfig = {} ) => {
    const cKey = [CACHE_KEY, 'SKU', itemNumber].join( '-' );
    if ( cacheMap.has( cKey ) ) {
      return cacheMap.get( cKey );
    }
    else {
      let matchingHit = null;
      const beanzSearchResult = await algoliaService.searchBeanzIndex( itemNumber, requestConfig );
      if ( beanzSearchResult?.hits?.length ) {
        matchingHit = beanzSearchResult.hits.find( ( hit ) => hit.objectID.toLowerCase() === itemNumber.toLowerCase() );
        // Please remove this when fixed by SFDC
        if ( matchingHit ) {
          matchingHit.itemGroupID = 'MR';
        }

      }
      else {
        const brevilleSearchResult = await algoliaService.searchBrevilleIndex( itemNumber, requestConfig );
        if ( brevilleSearchResult?.hits?.length ) {
          matchingHit = brevilleSearchResult.hits.find( ( hit ) => hit.objectID.toLowerCase() === itemNumber.toLowerCase() );
        }
      }
      if ( matchingHit ) {
        cacheMap.set( cKey, matchingHit );
        return matchingHit;
      }
      return matchingHit;
    }
  },

  /**
   * Helper to fetch beanz and breville products
   * @param {string[]} objectIds Product Number to search for the hit
   * @param {object?} requestConfig Algolia's RequestOptions
   * @returns {array} Algoliat hits per object ids
   */
  getHitByObjectIds: ( objectIds ) => {
    if ( !objectIds || !objectIds.length ) return null;

    const cKey = [CACHE_KEY, 'SKUS', ...objectIds].join( '-' );
    if ( cacheMap.has( cKey ) ) {
      return cacheMap.get( cKey );
    }
    else {
      /**
       * Retrieve several objects across several indices
       * @see https://www.algolia.com/doc/api-reference/api-methods/get-objects/#retrieve-several-objects-across-several-indices
       */
      const attributesToRetrieve = ['cart_image', 'productName', 'color_en_US', 'color_swatch', 'itemGroupID', 'Our_Roasters', 'objectID', 'primaryWebCategory', 'parentItemID'],
        algoliaRequests = objectIds.map( ( objectID ) => {
          const objectIDInitial = objectID[0];

          /**
           * if ObjectID starts with 'MBZ' or 'DISCOVERY',
           * It's beanz!
           */
          if ( /^MBZ|DISCOVERY/i.test( objectID ) ) {
            return {
              indexName: algoliabeanzindex,
              objectID,
              attributesToRetrieve
            };
          }
          else {
            return {
              indexName: algoliabrevilleindex,
              objectID,
              attributesToRetrieve
            };
          }
        } );

      const hitsArrPromise = algoliaService.client.multipleGetObjects( algoliaRequests ).then( ( res ) => {
        const hits = res?.results || [];

        for ( let i = 0, len = algoliaRequests?.length; i < len; i++ ) {
          const reqOpt = algoliaRequests[i],
            isBeanz = reqOpt.indexName === algoliabeanzindex;

          if ( isBeanz && hits[i] ) {
            hits[i].itemGroupID = 'MR';
          }
        }

        return hits;
      } );

      cacheMap.set( cKey, hitsArrPromise );
      return hitsArrPromise;
    }
  },
  getMasterclassesData: async ( ) => {
    const masterclassesIndex = await algoliaService.initIndex( 'Masterclasses' ).search( masterClassesSearch )
    .catch( ( err ) => {
      console.error( err.message );
      return null;
    } );

    let resultsMasterClasses = null;
    if ( Array.isArray( masterclassesIndex?.hits ) && masterclassesIndex?.hits.length ) {
      resultsMasterClasses = masterclassesIndex?.hits;
    }
    return resultsMasterClasses;
  }
};