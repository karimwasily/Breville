import request from 'library/api/request';
/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */

export const updateAddressRequest = ( options ) => request.post( 'updateCartAddress', options );

export const getShippingMethodsRequest = ( options ) => request.post( 'getShippingMethods', options );
