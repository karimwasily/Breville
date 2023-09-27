import actionCreator from 'xps-utils/redux-utility/createAction';
import { createApiActions } from 'xps-utils/redux-utility/api';

import {
    FETCH_REQUEST, 
    FETCH_SUCCESS, 
    FETCH_FAIL,
    CHECKOUT_DATA,
    CUR_INDEX,
    IS_VALID,
    IS_DIRTY,
    UPDATE_CART_ADDRESS,
    GET_SHIPPING_METHODS,
    SET_SHIPPING_METHODS,
    CHECKOUT_LOADING
} from './action-types';

export const setCheckoutData = actionCreator(CHECKOUT_DATA, 'data');
export const setCurIndex = actionCreator(CUR_INDEX, 'curIndex');
export const setIsValid = actionCreator(IS_VALID, 'valid', 'index');
export const setIsDirty = actionCreator(IS_DIRTY, 'dirty', 'index');
export const setCheckoutLoading = actionCreator(CHECKOUT_LOADING, 'checkoutLoading');
export const updateCartAddress = actionCreator( UPDATE_CART_ADDRESS );
export const getShippingMethods = actionCreator( GET_SHIPPING_METHODS );
export const setShippingMethods = actionCreator( SET_SHIPPING_METHODS, 'shippingMethods' );

export const apiActions = createApiActions(FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL);
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export default apiActions;
