import { takeEvery } from 'redux-saga/effects';
import {
  FETCH_REQUEST,
  UPDATE_USER_DETAIL,
  RESET_USER_PASSWORD,
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  EDIT_SUBSCRIPTION_ADDRESS,
  FETCH_PAUSE_SUBSCRIPTION_DATE,
  PAUSE_A_SUBSCRIPTION,
  TOGGLE_HIDE_PRODUCT,
  CANCEL_A_SUBSCRIPTION,
  FETCH_PRODUCT_REQUEST
} from 'library/store/mybreville/action-types';

import updateDetail from './update-user-detail';
import { fetchData, fetchProductData } from './fetch-data';
import resetUserPassword from './reset-user-password';
import { addNewAddress, updateAddress, deleteAddress } from './addresses-saga';
import { editSubscriptionAddress, getPausedSubsriptionDates, pauseASubsriptionDates, cancelASubsriptions } from './subscriptions-saga';

import { setHideProduct } from './set-hide-product';

/**
 * WATCHERS
 */

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
export function* watchSaga() {
  yield takeEvery( FETCH_REQUEST, fetchData );
  yield takeEvery( UPDATE_USER_DETAIL, updateDetail );
  yield takeEvery( RESET_USER_PASSWORD, resetUserPassword );
  yield takeEvery( ADD_USER_ADDRESS, addNewAddress );
  yield takeEvery( UPDATE_USER_ADDRESS, updateAddress );
  yield takeEvery( DELETE_USER_ADDRESS, deleteAddress );
  yield takeEvery( EDIT_SUBSCRIPTION_ADDRESS, editSubscriptionAddress );
  yield takeEvery( FETCH_PAUSE_SUBSCRIPTION_DATE, getPausedSubsriptionDates );
  yield takeEvery( PAUSE_A_SUBSCRIPTION, pauseASubsriptionDates );
  yield takeEvery( TOGGLE_HIDE_PRODUCT, setHideProduct );
  yield takeEvery( CANCEL_A_SUBSCRIPTION, cancelASubsriptions );
  yield takeEvery( FETCH_PRODUCT_REQUEST, fetchProductData );
}

export default watchSaga;
