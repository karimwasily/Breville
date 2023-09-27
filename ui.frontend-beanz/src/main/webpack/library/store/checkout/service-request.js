import request from 'library/api/request';

/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */

export const updateCartRequest = ( options ) => request.post( 'UpdateCart', options );
export const setShippingMethodRequest = ( options ) => request.post( 'setShippingMethod', options );
export const getActiveCartRequest = ( options ) => request.post( 'GoToCartService', options );
export const getCartVersionRequest = ( options ) => request.post( 'GetCartVersionService', options );