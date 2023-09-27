import React from 'react';
import { object, string, bool } from 'prop-types';
import { ProductTile } from './ProductTile';
import { normalizeBrevilleHit } from 'xps-utils/algolia';
import { useSelector } from 'react-redux';
import { selectLocale, selectSiteBaseUrl } from 'library/store/global/selector';

/**
 * util component for algolia hit data to be passed to product tile component
 * @param {object} props props
 * @param {object} props.hit hit
 * @param {boolean} [props.showVariants] showVariants
 * @returns {React.ReactElement}
 */
export const AlgoliaProductTile = ( { hit: rawhit, showVariants = true } ) => {
  const locale = useSelector( selectLocale );
  const siteBaseUrl = useSelector( selectSiteBaseUrl );
  const hit = normalizeBrevilleHit( rawhit, locale );

  const url = `${ siteBaseUrl }${ hit.pdpUri }`;

  return (
    <ProductTile
      data={ hit }
      sku={ hit.objectID }
      title={ hit.WEB_PRODUCT_NAME }
      description={ hit.productCallout }
      imgSrc={ hit.tile_image }
      price={ hit.retailPrice }
      pdpUrl={ url }
      variantSkus={ hit.variant_codes.map( ( v ) => v.sku ) }
      variantImageSrc={ hit.variant_colors }
      isHorizontalDisplay={ false }
      showVariants={ showVariants }
      showRatings={ hit.itemGroupID === 'FG' }
    />
  );
};

AlgoliaProductTile.propTypes = {
  hit: object,
  locale: string,
  showVariants: bool,
  showRatings: bool
};
