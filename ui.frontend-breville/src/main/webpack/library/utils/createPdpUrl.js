const format = ( str ) => str.toLowerCase().replace( /\s/g, '-' );

/**
 * create a url based on current location, product category, and sku
 * @deprecated currently pulling in pdpUri directly from the algolia record
 * @param {string} category primaryWebCategory of the product
 * @param {string} parentSKU objectID parent product identification
 * @param {string} sku objectID product identification
 * @param {string} itemGroupID finished good, spare part, accessory (FG, SP, AC)
 * @param {string} siteRootPath site root path
 * @returns {string} pdp url
 */
export const createPdpUrl = ( category, parentSKU, sku, itemGroupID, siteRootPath ) => {
  if ( ( !category && !itemGroupID ) || ( !parentSKU && !sku ) || !siteRootPath ) return null;

  // product > products/<category>/<sku>.html
  // parts/accessories > parts-accessories/<parts|accessories>/<sku>.html
  let categoryURL;

  switch ( itemGroupID ) {
    case 'FG':
      categoryURL = `/products/${ format( category ) }/`;
      break;
    case 'SP':
      categoryURL = `/parts-accessories/parts/`;
      break;
    case 'AC':
      categoryURL = `/parts-accessories/accessories/`;
      break;
    default:
      categoryURL = null;
  }

  if ( !categoryURL ) return null;

  const pdp = `${ format( parentSKU || sku ) }.html`;

  const url = `${ siteRootPath }${ categoryURL }${ pdp }`;

  return url;
};
