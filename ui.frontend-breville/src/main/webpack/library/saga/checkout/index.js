import { takeEvery } from 'redux-saga/effects';

import { getShippingMethods } from './get-shipping-methods';
import { updateCartAddress } from './update-cart-address';
//
import {  UPDATE_CART_ADDRESS } from 'library/store/checkout/action-types';
import {  GET_SHIPPING_METHODS } from 'library/store/checkout/action-types';


/**
 * WATCHERS
 */

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
export function* watchSaga() {
  yield takeEvery( UPDATE_CART_ADDRESS, updateCartAddress );
  yield takeEvery( GET_SHIPPING_METHODS, getShippingMethods );
}

export default watchSaga;
