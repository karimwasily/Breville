import { addHelperAttributesToVariant, getVariants } from 'library/utils/normalize';

/**
 * update finished goods array response with custom fields
 * - custom field for locale specific variants
 * - custom field for variant local specific display price
 * @param {array} products array of ct parent products
 * @param {{webchannel: string, locale: string}} config ct web channel id
 * @returns {array} updated finished goods ct data
 */
export function updateWithLocaleVariantsAttr( products, { webchannel, locale } ) {
  return products.map( ( product ) => {

    // filter for customer facing variants
    const localeVariants = getVariants( product.masterData.current.allVariants, webchannel );

    // add helper attrs
    localeVariants.forEach( ( variant ) => addHelperAttributesToVariant( { variant, webchannel, locale } ) );

    // dynamically add _localeVariants field
    product.masterData.current._localeVariants = localeVariants;

    return product;
  } );

}