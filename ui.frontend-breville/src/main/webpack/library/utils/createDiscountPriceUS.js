// todo: this is temporary
/**
 * temp util to calc rough discount price for US region
 * @param {number} retailPrice eg: 16.5
 * @param {number} discountPercentage eg: 20 = 20%
 * @returns {string} 13.20
 */
export function calcDiscountPriceUS( retailPrice, discountPercentage ) {
  const discount = retailPrice * ( ( 100 - discountPercentage ) / 100 );
  return ( Math.round( discount * 10 ) / 10 ).toFixed( 2 );
}