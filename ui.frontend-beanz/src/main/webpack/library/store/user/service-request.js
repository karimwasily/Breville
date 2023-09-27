import request from 'library/api/request';

/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */

export const getAccountDetailsRequest = ( options ) => request.get( 'getAccountDetailsService', options );
export const updateAccountAddressRequest = ( options ) => request.patch( 'updateAccountAddressService', options );
export const addAlternateShippingAddressService = ( options ) => request.post( 'addAlternateShippingAddressService', options );
export const updateAlternateShippingAddressService = ( options ) => request.post( 'updateAlternateShippingAddressService', options );
export const setDefaultShippingAddressService = ( options ) => request.patch( 'setDefaultShippingAddressService', options );