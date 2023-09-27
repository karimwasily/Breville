import request from 'library/api/request';
/**
 * Execute request for this service
 * @param {Object} options request options
 * @param {String} locale current locale
 * @returns {Promise} response promise
 */
export const serviceRequest = ( options ) => request.post( 'payment', options );
export const getPaymentVersion = ( options ) => request.post( 'GetPaymentVersion', options );
export const createOrderService = ( options ) => request.post( 'createOrder', options );

export default {
  serviceRequest,
  getPaymentVersion
};