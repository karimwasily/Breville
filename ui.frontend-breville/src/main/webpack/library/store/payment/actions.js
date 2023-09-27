import { createApiActions } from 'xps-utils/redux-utility/api';
import actionCreator from 'xps-utils/redux-utility/createAction';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  MAKE_CREDITCARD_PAYMENT,
  MAKE_PAYPAL_PAYMENT,
  SUBMIT_DETAILS,
  MAKE_AFFIRM_PAYMENT,
  SET_ACTIVE_PAYMENT,
  SET_PAYMENT_DETAIL,
  SET_CARD_INFO,
  SET_MASKED_CARD_DETAILS,
  PLACE_ORDER,
  SET_CARD_AUTHORIZED,
  SET_PAYPAL_AUTHORIZED
} from './action-types';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const makeCreditCartPayment = actionCreator( MAKE_CREDITCARD_PAYMENT );
export const makePaypalPayment = actionCreator( MAKE_PAYPAL_PAYMENT );
export const submitDetails = actionCreator( SUBMIT_DETAILS );
export const makeAffirmPayment = actionCreator( MAKE_AFFIRM_PAYMENT );
export const setActivePayment = actionCreator( SET_ACTIVE_PAYMENT, 'activePayment' );
export const setPaymentDetail = actionCreator( SET_PAYMENT_DETAIL, 'paymentDetail' );
export const setCardInfo = actionCreator( SET_CARD_INFO, 'cardInfo' );
export const setMaskedCardDetails = actionCreator( SET_MASKED_CARD_DETAILS, 'maskedCardDetails' );
export const placeOrder = actionCreator( PLACE_ORDER );
export const setCardAuthorized = actionCreator( SET_CARD_AUTHORIZED, 'cardAuthorized' );
export const setPaypalAuthorized = actionCreator( SET_PAYPAL_AUTHORIZED, 'paypalAuthorized' );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export default apiActions;
