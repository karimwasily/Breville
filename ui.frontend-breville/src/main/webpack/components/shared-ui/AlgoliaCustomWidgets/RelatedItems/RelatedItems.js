import React from 'react';
import { object, number, string, oneOfType, instanceOf } from 'prop-types';
import { InstantSearch, ExperimentalConfigureRelatedItems, Index, Hits, Configure } from 'react-instantsearch-dom';
import { withAem } from 'xps-utils/withAem';
import { algoliaService } from 'xps-utils/algolia';
import { ProductTile } from 'components/shared-ui/ProductTile';

const hitComponent = ( { hit } ) => {
  return <ProductTile
    data={ hit }
    sku={ hit.objectID }
    title={ hit.parentItemName || hit.productName }
    description={ hit.parentItemCallout || hit.parentItemDescription }
    imgSrc={ hit.tile }
    price={ hit.retailPrice }
    variantSkus={ hit['variant-codes'] }
    variantColors={ hit['variant-colors'] }
  />;
};

// todo: remove mock at some point, this is here to support if aemData or props are not provided
const mockAemData = {
  objectID: 'BES860XL',
  length: 3
};

/**
 * Related Items Algolia Widget
 * @param {{ aemData: object, objectID: string, length: number }} props - props
 * @returns {React.ReactElement}
 */
const RelatedItems = ( { aemData: providedAemData = {}, objectID: providedObjectID = null, length: providedLength = 3 } ) => {
  const aemData = { ...mockAemData, ...providedAemData };
  const objectID = aemData.objectID || providedObjectID;
  const length = aemData.length || providedLength;

  if ( !objectID ) return null;

  return (
    <div className='related-items'>
      <InstantSearch
        searchClient={ algoliaService.client }
        indexName={ algoliaService.brevilleIndex }
      >
        <Configure hitsPerPage={ length } />
        <Index indexName={ algoliaService.brevilleIndex }>
          <ExperimentalConfigureRelatedItems
            hit={{ objectID }}
            matchingPatterns={{
              // todo: when data is ready, decide on config object
            // brand: { score: 1 },
            // categories: { score: 2 }
            RetailPrice: { score: 1 },
            PrimaryWebCategory: { score: 2 }
          }}
          />
          <Hits hitComponent={ hitComponent } />
        </Index>
      </InstantSearch>
    </div>
  );
};

RelatedItems.defaultProps = {
  aemData: {},
  objectID: null,
  length: 3
};

RelatedItems.propTypes = {
  aemData: object,
  objectID: oneOfType( [string, instanceOf( null )] ),
  length: number
};

export default withAem( RelatedItems );