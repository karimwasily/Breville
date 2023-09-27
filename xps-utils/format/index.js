
/**
 * utility to convert kebab-case to snake_case
 * @param {string} str string to convert
 * @returns {string} formatted string
 */
export const kebabToSnakeCase = (str) => {
  return str.replace(/-/g, '_')
}

/**
 * utility to capitalize a string
 * @param {string} str string to convert
 * @returns {string} formatted string
 */
export const capitalize = ( str ) => str.split( ' ' ).map( ( t ) => t[0].toUpperCase() + t.slice( 1 ).toLowerCase() )
.join( ' ' );


/**
 * utility to add the comma as a separator i.e: 1234.00 will be changed to 1,234.00
 * @param {string} value always converting to string then applying the regex
 * @returns {string} formatted string
 */

export const commaSeparatedNumber = ( value ) => {
  const regEx = /\B(?=(\d{3})+(?!\d))/g;
  return String( value ).replace( regEx, ',' );
};

/**
 * format price for display
 * @param {number} value (1200.99)
 * @param {string} currencySymbol ($)
 * @param {boolean?} showDecimals whether to round the value
 * @returns 
 */
export const displayPrice = (value, currencySymbol, showDecimals = true) => {
  return `${currencySymbol}${commaSeparatedNumber(showDecimals ? value : Math.round(value))}`
}