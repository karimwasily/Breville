import { COLOR_SWATCH_PATH } from 'library/constants';

/**
 * get image path with image name
 * @param {{colorSwatchName: string}}
 * @returns {string} path of colorswatch with image name
 */

export const getColorSwatchImage = ( colorSwatchName ) => {
  const formatColorNameAsImageName = `${ colorSwatchName.replace( / /g, '_' ).toLowerCase() }.jpg`; // formatting image name from color swatch name
  return `${ COLOR_SWATCH_PATH + formatColorNameAsImageName }`;
};