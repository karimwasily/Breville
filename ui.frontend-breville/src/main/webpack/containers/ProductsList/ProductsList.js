import React from 'react';
import { object } from 'prop-types';
import { AlgoliaProductTile } from 'components/shared-ui/ProductTile';
import { useAlgolia } from 'xps-utils/algolia';
import { withAem } from 'xps-utils/withAem';
import { useHorizontalSmoothScroll } from 'xps-utils/useHorizontalSmoothScroll/useHorizontalSmoothScroll';
import { AlgoliaCoffeeProductTile } from 'components/shared-ui/CoffeeProductTile/AlgoliaCoffeeProductTile';

/**
 * Algolia Products Banner
 * AEM config expects a list of 'ids' to be passed (which are Algolia objectIDs)
 * @param {{ aemData: {
 * indexName: string,
 * objectIDList: string[],
 * searchQuery: string,
 * limit: number
 * }}} props props
 * @returns {React.ReactElement}
 */
const ProductsList = ( { aemData } ) => {
  const [ hits, isLoading, error ] = useAlgolia( aemData );
  const scrollRef = useHorizontalSmoothScroll();

  return (
    <>
      { isLoading && <span>Loading...</span> }
      { error && <span>Error occurred</span> }
      { hits.length > 0 && (
        <>
          <ul ref={ scrollRef } className='list'>
            { hits.map( ( hit, idx ) => (
              <li key={ hit.objectID } className='item'>
                { aemData.tileTitles && (
                <p className='item-title'>{ aemData.tileTitles[idx] }</p>
                ) }
                { aemData.useCoffeeProductTile ? (
                  <AlgoliaCoffeeProductTile hit={ hit } />
                ) : (
                  <AlgoliaProductTile hit={ hit } />
                ) }
              </li>
            ) ) }
          </ul>
        </>
      ) }
    </>
  );

};

ProductsList.propTypes = {
  aemData: object
};

export default withAem( ProductsList );
