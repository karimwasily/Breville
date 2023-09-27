import request from 'library/api/request';

/**
 * Execute request for this service
 * @param {Object} options request options
 * @returns {Promise} response promise
 */
const getUserDetailService = ( options = {} ) => request.get( 'getUserDetail', options );
const getUserOrdersService = ( options = {} ) => request.get( 'getUserOrders', options );
const getSubscriptionService = ( options = {} ) => request.get( 'getUserSubscriptions', options );
const updateUserDetailService = ( options = {} ) => request.patch( 'updateUserDetail', options );
const resetUserPasswordService = ( options = {} ) => request.post( 'resetUserPassword', options );
const addNewAddressService = ( options = {} ) => request.post( 'addNewAddress', options );
const updateAddressService = ( options = {} ) => request.patch( 'updateAddress', options );
const deleteAddressService = ( options = {} ) => request.del( 'deleteAddress', options );
const editSubscriptionAddressService = ( options = {} ) => request.post( 'editSubscriptionAddress', options );
const getSubscriptionPauseDatesService = ( options = {} ) => request.get( 'getPausedSubscriptionDates', options );
const pauseASubscriptionService = ( options = {} ) => request.post( 'pauseASubscription', options );
const cancelASubscriptionService = ( options = {} ) => request.post( 'cancelASubscription', options );
const getUserProducts = ( options = {} ) => request.get( 'getUserProducts', options );
const toggleHideProduct = ( options = {} ) => request.patch( 'setHideProduct', options );

export {
  getUserDetailService,
  getUserOrdersService,
  getSubscriptionService,
  updateUserDetailService,
  addNewAddressService,
  updateAddressService,
  deleteAddressService,
  resetUserPasswordService,
  editSubscriptionAddressService,
  getSubscriptionPauseDatesService,
  pauseASubscriptionService,
  toggleHideProduct,
  cancelASubscriptionService,
  getUserProducts
};