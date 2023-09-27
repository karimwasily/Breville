import request from 'library/api/request';

/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */
export const serviceRequest = ( options ) => options;

/**
 * submit notify me sales force
 * @param {object} variables variables
 * @param {string} variables.AX_Item_Number ax item number
 * @param {string} variables.firstName first name
 * @param {string} variables.lastName last name
 * @param {string} variables.email email
 * @param {string} variables.PDPUrl pdp url
 * @param {string} variables.language language
 * @param {boolean} variables.SubscribeToNewsletter subscribe to newsletter
 * @param {string} variables.region region
 * @param {object?} options request options
 * @returns {*}
 */
export const submitNotifyMeSalesForce = ( variables, options = {} ) =>
  request.post( 'salesforce', { data: { request: { ...variables } } } );
