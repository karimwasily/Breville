import React from 'react';
import { string } from 'prop-types';
import { algoliaService } from 'xps-utils/algolia';
import { useTranslation } from 'react-i18next';
import { AlgoliaCarouselWidget } from '../AlgoliaCarouselWidget';

/**
 * Related Products Algolia Component
 * Shows all Accesssories and Spare Parts of the current product
 * @param {{productVariantSKU: string, itemGroupID: string}} props props
 * @returns {React.ReactElement}
 */
export const RelatedProducts = ( { productVariantSKU, itemGroupID } ) => {
  const { t } = useTranslation();

  async function fetchRequest() {
    return algoliaService.getBrevilleObjects( [productVariantSKU] )
    .then( ( res ) => {
      const productVariant = res?.results?.[0];

      if ( !productVariant ) throw `no product found with objectId: ${ productVariantSKU }`;

      // get all related parts and accessories
      let relatedSKUs = [];

      const accessorySKUs = productVariant?.relatedAccessories;
      if ( accessorySKUs?.length ) {
        relatedSKUs = [...relatedSKUs, ...accessorySKUs];
      }

      const sparePartsSKUs = productVariant?.relatedSpareParts;
      if ( sparePartsSKUs?.length ) {
        relatedSKUs = [...relatedSKUs, ...sparePartsSKUs];
      }

      if ( relatedSKUs.length === 0 ) throw 'no related parts or accessories found';

      return algoliaService.getBrevilleObjects( relatedSKUs );
    } );
  }

  if ( !productVariantSKU || itemGroupID !== 'FG' ) return null;

  return (
    <AlgoliaCarouselWidget title={ t( 'pdp-relatedProducts' ) } fetchRequest={ fetchRequest } />
  );

};

RelatedProducts.propTypes = {
  productVariantSKU: string,
  itemGroupID: string.isRequired
};