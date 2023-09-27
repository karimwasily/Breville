import { COLOR_SWATCH_PATH } from 'library/constants';

export const formatSwatchSrc = ( colorData ) => `${ COLOR_SWATCH_PATH + colorData?.en?.toLowerCase().replace( /\s/g, '_' ) }.jpg`;

/**
   * normalize ct variant data to create product swatch
   * @param {array} variants ct product variants
   * @param {string} locale 'en-US'
   * @returns {{sku: string, color: string, src: string}[]} array of normalized swatch variants
   */
export const formatSwatchVariants = ( variants, locale ) => {
  const COLOR_ATTR = 'COLOUR_TRANSLATION';
  function getColor( variant ) {
    return variant.attributesRaw.find( ( attr ) => attr.name === COLOR_ATTR )?.value;
  }

  // only get variants which have a color
  const swatchVariants = variants.filter( ( v ) => v.attributesRaw.some( ( attr ) => attr.name === COLOR_ATTR ) ).map( ( v ) => {
    // get sku
    const sku = v.sku;
    // get color
    const colorData = getColor( v );
    // locale specific color description
    const colorLabel = colorData[locale];
    // * get aem color asset based on en-US label
    const src = formatSwatchSrc( colorData );

    return { sku, color: colorLabel, src };
  } );

  return swatchVariants;
};
