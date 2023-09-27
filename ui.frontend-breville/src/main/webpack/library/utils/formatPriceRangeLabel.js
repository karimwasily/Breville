import { displayPrice } from 'xps-utils/format';

/**
 * create format label for retailPrice current refinement item
 * @param {object} item algolia current refinement item
 * @param {string?} currencySymbol '$'
 * @returns {string} '$200 - $500'
 */
export const formatPriceRangeLabel = ( item, currencySymbol = '$' ) => {
  const { currentRefinement: { min, max } } = item;
  return `${ displayPrice( min, currencySymbol ) } - ${ displayPrice( max, currencySymbol ) }`;
};


