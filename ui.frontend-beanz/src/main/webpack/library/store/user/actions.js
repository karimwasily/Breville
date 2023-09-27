import { createApiActions } from 'xps-utils/redux-utility/api';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, GET_USER, IS_LOADING, UPDATE_USER_SHIPPING_ADDRESS, ADD_ALTERNATE_SHIPPING_ADDRESS,
    UPDATE_ALTERNATE_SHIPPING_ADDRESS, SET_DEFAULT_SHIPPING_ADDRESS } from './action-types';
import actionCreator from 'xps-utils/redux-utility/createAction';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const setLoading = actionCreator( IS_LOADING, 'isLoading' );
export const fetchUser = actionCreator( GET_USER );
export const updateUserShippingAddress = actionCreator( UPDATE_USER_SHIPPING_ADDRESS, 'params' );
export const addAlternateShippingAddress = actionCreator( ADD_ALTERNATE_SHIPPING_ADDRESS, 'params' );
export const updateAlternateShippingAddress = actionCreator( UPDATE_ALTERNATE_SHIPPING_ADDRESS, 'params' );
export const setDefaultShippingAddress = actionCreator( SET_DEFAULT_SHIPPING_ADDRESS, 'params' );



export const { fetchRequest, fetchSuccess, fetchFail } = apiActions;

export default apiActions;