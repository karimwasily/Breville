import { createApiActions } from 'xps-utils/redux-utility/api';
import actionCreator from 'xps-utils/redux-utility/createAction';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_LOADING,
  SET_ERROR,
  SET_AEM_DATA,
  SET_USER_DETAIL,
  SET_USER_ORDERS,
  SET_SELECTED_ADDRESS,
  SET_SELECTED_ORDER,
  UPDATE_USER_DETAIL,
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  RESET_USER_PASSWORD,
  SET_NOTIFICATION_TEXT,
  SET_MASTER_CLASSES,
  SET_MY_SUBSCRIPTIONS,
  EDIT_SUBSCRIPTION_ADDRESS,
  FETCH_PAUSE_SUBSCRIPTION_DATE,
  SET_PAUSE_SUBSCRIPTION_DATE,
  PAUSE_A_SUBSCRIPTION,
  SET_USER_PRODUCTS,
  TOGGLE_HIDE_PRODUCT,
  CANCEL_A_SUBSCRIPTION,
  FETCH_PRODUCT_REQUEST
} from './action-types';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;
export const setLoading = actionCreator( SET_LOADING, 'isLoading' );
export const setError = actionCreator( SET_ERROR, 'errorFlag' );
export const setAemData = actionCreator( SET_AEM_DATA, 'aemData' );
export const setUserDetail = actionCreator( SET_USER_DETAIL, 'userDetail' );
export const setUserOrders = actionCreator( SET_USER_ORDERS, 'userOrders' );
export const setSelectedAddress = actionCreator( SET_SELECTED_ADDRESS, 'selectedAddress' );
export const setSelectedOrder = actionCreator( SET_SELECTED_ORDER, 'selectedOrder' );
export const updateUserDetail = actionCreator( UPDATE_USER_DETAIL );
export const resetUserPassword = actionCreator( RESET_USER_PASSWORD );
export const setNotificationText = actionCreator( SET_NOTIFICATION_TEXT, 'notifcationText' );
export const setMasterClasses = actionCreator( SET_MASTER_CLASSES, 'masterClasses' );
export const setMySubscriptions = actionCreator( SET_MY_SUBSCRIPTIONS, 'mySubscriptions' );
export const editSubscriptionAddress = actionCreator( EDIT_SUBSCRIPTION_ADDRESS );
export const setPauseSubscriptionDates = actionCreator( FETCH_PAUSE_SUBSCRIPTION_DATE );
export const setSubscriptionNextValues = actionCreator( SET_PAUSE_SUBSCRIPTION_DATE, 'pausedDates' );
export const pauseASubscription = actionCreator( PAUSE_A_SUBSCRIPTION );
export const cancelASubscription = actionCreator( CANCEL_A_SUBSCRIPTION );
export const setUserProducts = actionCreator( SET_USER_PRODUCTS, 'userProducts' );
export const toggleHideProduct = actionCreator( TOGGLE_HIDE_PRODUCT );
export const fetchProductRequest = actionCreator( FETCH_PRODUCT_REQUEST );
/**
 * Address actions
 * These actions are watched by redux saga to perform xhr calls
 * @See {@link ../../saga/mybreville/index.js}
 */
export const addUserAddress = actionCreator( ADD_USER_ADDRESS );
export const updateUserAddress = actionCreator( UPDATE_USER_ADDRESS );
export const deleteUserAddress = actionCreator( DELETE_USER_ADDRESS );

export default apiActions;
