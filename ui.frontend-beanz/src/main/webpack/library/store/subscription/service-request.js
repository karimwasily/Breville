import request from 'library/api/request';

/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */

export const viewSubscriptionRequest = ( options ) => request.get('viewSubscriptionService', options);
export const pauseNextdatesRequest = ( options ) => request.get('pauseNextdatesService', options);
export const pauseSubscriptionRequest = (options) => request.post('pauseSubscriptionService', options);
export const resumeSubscriptionRequest = (options) => request.post('resumeSubscriptionService', options);
export const cancelSubscriptionRequest = (options) => request.post('cancelSubscriptionService', options);
export const viewOrderRequest = (options) => request.get('viewOrderService', options);
// export default serviceRequest
