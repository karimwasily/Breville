import React from 'react';
import { object, string, func, bool, number } from 'prop-types';
import { CoffeeProductTile } from './CoffeeProductTile';
import { normalizeBeanzHit } from 'xps-utils/algolia';
import { useSelector } from 'react-redux';
import { selectLocale } from 'library/store/global/selector';

/**
 * util component for algolia hit data to be passed to coffee product tile component
 * @params {{hit: object, showSelect?: boolean, onSelect: func, isSelected?: boolean}} props props
 * @returns {React.ReactElement}
 */
export const AlgoliaCoffeeProductTile = ( { hit: rawHit, showSelect = false, onSelect, isSelected = false, discountPercentage, currencySymbol } ) => {
  const locale = useSelector( selectLocale );
  const hit = normalizeBeanzHit( rawHit, locale );

  return (
    <CoffeeProductTile
      hit={ hit }
      sku={ hit.itemNumber }
      title={ hit.productName }
      brand={ hit?.vendorName?.trim() || hit.Our_Roasters }
      roast={ hit.WEB_ROASTLEVEL || hit.The_Roast }
      flavour={ hit.WEB_FLAVOURNOTES || hit.Coffee_Flavors }
      imgSrc={ hit.tile_image }
      imgAlt={ hit.imgAlt }
      price={ hit.retailPriceMap }
      displayPrice={ hit.displayPrice }
      showSelect={ showSelect }
      onSelect={ onSelect }
      isSelected={ isSelected }
      discountPercentage={ discountPercentage }
      currencySymbol={ currencySymbol }
    />
  );
};

AlgoliaCoffeeProductTile.propTypes = {
  hit: object,
  locale: string,
  showSelect: bool,
  onSelect: func,
  isSelected: bool,
  discountPercentage: number,
  currencySymbol: string
};