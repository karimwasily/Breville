
/**
 * US Price round to nearest 5 cents
 * @param {number} amount price amount
 * @returns {string} display price rounded to nearest 5c
 */
export const roundPriceUS = ( amount ) => ( Math.round( amount * 10 ) / 10 ).toFixed( 2 );