import request from 'library/api/request';
import { cartQuery } from 'library/schema/cart';
/**
 * Execute request for this service
 * @param {Object} options request options
 * @param {String} locale current locale
 * @returns {Promise} response promise
 */
export const serviceRequest = ( options = {}, locale ) => request.post( 'getCart', { query: cartQuery( locale ), ...options } );
export const removeProductRequest = ( options = {} ) => request.post( 'removeLineItem', options );
export const removeBundleRequest = ( options = {} ) => request.post( 'removeBundleItem', options );
export const updateQuantityRequest = ( options = {} ) => request.post( 'updateQuantity', options );
export const addPromoCodeRequest = ( options = {} ) => request.post( 'addPromoCode', options );
export const removePromoCodeRequest = ( options = {} ) => request.post( 'removePromoCode', options );
export const fetchWarrantyService = ( options = {} ) => request.post( 'getProducts', options );
export const createNewCartRequest = ( options = {} ) => request.post( 'addBundleItem', options );

export default serviceRequest;