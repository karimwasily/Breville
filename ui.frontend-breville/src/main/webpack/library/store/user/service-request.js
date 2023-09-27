import request from 'library/api/request';
/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */


export const serviceRequest = ( options ) => request.post( 'getUser', options );

export default serviceRequest;
