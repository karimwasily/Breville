/**
 * helper function to remove product trademarks
 * @param {string} text 
 * @returns {string}
 */
export const removeTrademarks = (text) => text.replace( /(™|®)/g, '' );