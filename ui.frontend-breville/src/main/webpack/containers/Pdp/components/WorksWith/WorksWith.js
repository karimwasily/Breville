import React from 'react';
import { string } from 'prop-types';
import { algoliaService } from 'xps-utils/algolia';
import { useTranslation } from 'react-i18next';
import { AlgoliaCarouselWidget } from '../AlgoliaCarouselWidget';

/**
 * Works With Algolia Carousel Component
 * Presents all finished goods which can use the current spare part or accessory
 * logic is to call the objectId via the search query field,
 * requires filtering out the sp/ac product in question
 * additionally allowing the fields 'relatedAccessories' and 'relatedSpareParts' to be searchable from algolia config
 * @param {{parentSKU: string, itemGroupID: string}} props props
 * @returns {React.ReactElement}
 */
export const WorksWith = ( { parentSKU, itemGroupID } ) => {
  const { t } = useTranslation();

  const algoliaConfig = {
    // algolia service to fetch all products from finished goods and not the current accessory/spare part
    filters: `itemGroupID:"FG" AND NOT objectID:"${ parentSKU }"`,
    distinct: 1
  };

  async function algoliaFetchRequest() {
    return algoliaService.searchBrevilleIndex( parentSKU, algoliaConfig );
  }

  if ( ( itemGroupID !== 'AC' ) && ( itemGroupID !== 'SP' ) ) return null;

  return (
    <AlgoliaCarouselWidget title={ t( 'pdp-worksWith' ) } fetchRequest={ algoliaFetchRequest } />
  );

};

WorksWith.propTypes = {
  parentSKU: string.isRequired,
  itemGroupID: string.isRequired
};
