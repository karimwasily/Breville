import { useEffect, useRef, useState } from 'react';
import { algoliaService } from 'xps-utils/algolia';

// remove null values from object
const normalize = ( data ) =>
  Object.entries( data ).reduce( ( result, current ) => {
    const [key, val] = current;
    if ( val ) result[key] = val;
    return result;
  }, {} );

/**
 * @typedef {object} algoliaConfig
 * @property {string?} indexName
 * @property {string[]?} objectIDList
 * @property {string?} searchQuery
 * @property {number?} limit
 */

/**
 * Hook to return algolia hits based on passed config
 * @param {algoliaConfig} config - algolia config
 * @returns {array} hits
 */
export const useAlgolia = ( config ) => {
  const intializedRef = useRef( false );
  const [hits, setHits] = useState( [] );
  const [isLoading, setIsLoading] = useState( false );
  const [error, setError] = useState( null );

  const handleLoadingAndErrors = (algoliaPromise) => {
    setIsLoading( true );
    algoliaPromise().catch( ( err ) => {
      console.error( err );
      setError( err );
    } )
    .finally( () => {
      setIsLoading( false );
    } );
  }

  // * 3 different fetch calls which hand back 'results' or 'hits'
  useEffect( () => {
    // if config is null or an empty object do not initialize
    if ( config === null || Object.keys( config ).length === 0 ) return;
    // if we have already initiliazed then we are done
    if ( intializedRef.current ) return;

    intializedRef.current = true;
    const normalizedConfig = normalize( config );

    const numOfIds = normalizedConfig.objectIDList?.length;

    if ( numOfIds > 0 && !config?.categorySearch ) {
      // if SKUs are provided then get them
      handleLoadingAndErrors(async () => {
        const { indexName, objectIDList } = normalizedConfig
        return algoliaService.initIndex(indexName || 'breville').getObjects( objectIDList )
        .then( ( res ) => {
          setHits( res.results.filter( Boolean ) );
        } )
    })

    } else if ( config?.categorySearch ) {
      // get the category of the first sku
      const {facetName, facetValue} = config.categorySearch
      const sku = config.objectIDList[0]
      // get products of a category minus the current product
      const filtersString = `${facetName}:${facetValue.toUpperCase()} AND NOT objectID:${sku}`

      handleLoadingAndErrors(async () => {
        return algoliaService.searchBrevilleIndex('', {
          filters: filtersString,
          offset: 0,
          length: config?.limit || 3
        }).then( (res) => {
          setHits( res.hits.filter( Boolean ) );
        })
      })
    }
    else {
      // otherwise get all results via indexName and limit provided
      handleLoadingAndErrors(async () => {
        const { indexName, limit } = normalizedConfig
        return algoliaService.initIndex(indexName).search('', { length: limit, offset: 0 })
            .then( ( res ) => {
              setHits( res.hits.filter( Boolean ) );
            } )
        })
    }
  }, [config] );

  return [hits, isLoading, error];
};
