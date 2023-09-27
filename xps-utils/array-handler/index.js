
/**
 * utility to sort an array based on key
 * @param {array} array Collection
 * @param {string} key specify the key based on that you want to sort an array
 * @param {string} sortBy order 'asc | desc', default 'asc'
 * @returns {array} sorted array
 */

export const sortedArray = ( array, key, sortBy ) => {
    if ( Array.isArray( array ) && array.length > 0 ) {
      if ( sortBy === 'desc' ) {
        return array.sort( ( a, b ) => b[key] - a[key] );
      }
      return array.sort( ( a, b ) => a[key] - b[key] );
    } return array;
  };
  