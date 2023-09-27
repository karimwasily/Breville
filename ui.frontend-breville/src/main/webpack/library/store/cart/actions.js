
import { createApiActions } from 'xps-utils/redux-utility/api';
import actionCreator from 'xps-utils/redux-utility/createAction';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  UPDATE_QUANTITY,
  ADD_PROMOCODE,
  REMOVE_PROMOCODE,
  DISCOUNT_CODES,
  REMOVE_PRODUCT,
  REMOVE_BUNDLE,
  ADD_COVERAGE_SUMMARY,
  ADD_WARRANTY_DETAIL,
  CREATE_NEW_CART,
  WAIT,
  ORDER_DETAIL,
  FETCH_WARRANTY
} from './action-types';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const updateQuantity = actionCreator( UPDATE_QUANTITY );
export const addPromoCode = actionCreator( ADD_PROMOCODE );
export const removePromoCode = actionCreator( REMOVE_PROMOCODE );
export const addDiscountCodes = actionCreator ( DISCOUNT_CODES, 'dicountCodes' );
export const removeProduct = actionCreator( REMOVE_PRODUCT );
export const removeBundle = actionCreator( REMOVE_BUNDLE );
export const createNewCart = actionCreator( CREATE_NEW_CART );
export const setOrderDetail = actionCreator( ORDER_DETAIL, 'orderDetail' );
export const setWait = actionCreator( WAIT, 'wait' );
export const addCoverageSummary = actionCreator( ADD_COVERAGE_SUMMARY, 'coverageSummary' );
export const addWarrantyDetail = actionCreator( ADD_WARRANTY_DETAIL, 'warrantyDetail' );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export const fetchWarranty = actionCreator( FETCH_WARRANTY );


export default apiActions;
