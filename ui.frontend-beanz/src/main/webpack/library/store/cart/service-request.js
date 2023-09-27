import request from 'library/api/request';

/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */
export const serviceRequest = ( options ) => request.post( 'GoToCartService', options );
export const deletRequest = ( options ) => request.post( 'deleteLineItemfromCart', options );
export const updateRequest = ( options ) => request.post( 'UpdateCart', options );
export const addPromoRequest = ( options ) => request.post( 'applyPromoCodeService', options );
export const removePromoRequest = ( options ) => request.post( 'removePromoCodeService', options );
export const getProductDataRequest = ( options ) => request.post( 'GetProductbySkuService', options );
export const mergeCartRequest = ( options ) => request.post( 'mergeCart', options );

export default serviceRequest;