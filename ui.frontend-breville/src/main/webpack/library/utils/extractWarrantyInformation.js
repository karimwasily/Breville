/** Transform the warranty-reference data into the input of fetchWarrantyList
 * @param {Array<Array<{name: string, value: {typeId: string, id: string}}>>} warrantyArray the array containing warranty of each variant
 * @returns {Object<string, {channel: string}>} */
const transformWarrantyInfo = ( warrantyArray ) => {
  const result = {};

  warrantyArray.forEach( ( warranty ) => {
    const productId = warranty.find( ( item ) => item.name === 'associated-product' )?.value[0]?.id;
    const channelId = warranty.find( ( item ) => item.name === 'channel' )?.value?.id;

    if ( productId && channelId ) {
      result[productId] = { channel: channelId };
    }
  } );

  return result;
};

/** Extract warranty information from fetchProductParent response
 * @param {Array<Array<{name: string, value: Array}>>} attributesRaw the raw attributes of the parent product
 * @returns {Object<string, {channel: string}>} */
export function extractWarrantyInformation( attributesRaw = [] ) {
  const result = attributesRaw
  .map( ( attrList ) => {
    return attrList.find( ( attr ) => attr.name === 'warranty-reference' );
  } )
  .filter( Boolean )// Filter out the attributesRaw without warranty-reference attribute
  .map( ( attr ) => attr.value ) // Transform [{name: 'warranty-reference', value: Object}] into [Object]
  .map( transformWarrantyInfo ); // Transform [Object] into [{productId: {channel: channelId}}]

  return result && result.length
    ? result.reduce( ( acc, current ) => new Object( { ...acc, ...current } ) ) // Flatten the array into a single dictionary
    : {};
}