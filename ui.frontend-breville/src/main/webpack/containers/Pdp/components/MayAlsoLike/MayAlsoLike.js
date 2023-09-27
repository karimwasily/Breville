import React from 'react';
import { string } from 'prop-types';
import { algoliaService } from 'xps-utils/algolia';
import { useTranslation } from 'react-i18next';
import { AlgoliaCarouselWidget } from '../AlgoliaCarouselWidget';

/**
 * May Also Like Algolia Component
 * Shows all finished goods of the same category of the current product
 * @param {{productCategory: string, itemGroupID: string, parentSKU: string}} props props
 * @returns {React.ReactElement}
 */
export const MayAlsoLike = ( { productCategory, itemGroupID, parentSKU } ) => {
  const { t } = useTranslation();

  const algoliaConfig = {
    // algolia service to fetch all products of the same category minus the current product
    filters: `primaryWebCategory:"${ productCategory }" AND itemGroupID:"${ itemGroupID }" AND NOT objectID:"${ parentSKU }"`,
    distinct: 1
  };

  async function fetchRequest() {
    return algoliaService.searchBrevilleIndex( '', algoliaConfig );
  }

  return (
    <AlgoliaCarouselWidget title={ t( 'pdp-mayAlsoLike' ) } fetchRequest={ fetchRequest } />
  );

};

MayAlsoLike.propTypes = {
  productCategory: string,
  itemGroupID: string,
  parentSKU: string
};
