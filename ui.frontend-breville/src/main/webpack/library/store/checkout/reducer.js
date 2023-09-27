import createReducer from 'xps-utils/redux-utility/createReducer';
import { createApiActionMap } from 'xps-utils/redux-utility/api';

import {
    CHECKOUT_DATA,
    CUR_INDEX,
    IS_VALID,
    IS_DIRTY,
    FETCH_REQUEST, 
    FETCH_SUCCESS, 
    FETCH_FAIL,
    SET_SHIPPING_METHODS,
    CHECKOUT_LOADING
} from './action-types';

const initialState = {
    curIndex: 0,
    isValid: { 0: false},
    checkoutLoading: true
}

function setCheckoutData(state, params) {
    const mergeData = params.data ? params.data : {};
    return { ...state, ...mergeData}
}

function setIsValid( state, params) {
    const { index, valid } = params;
    const isValid = { ...state.isValid }; 
    isValid[index] = valid; 
    return { ...state, isValid}
}

function setIsDirty( state, params) {
    const { index, dirty } = params;
    const isDirty = { ...state.isDirty }; 
    isDirty[index] = dirty; 
    return { ...state, isDirty}
}

export const reducer = createReducer(
    {
        ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
        [CHECKOUT_LOADING]: ['checkoutLoading'],
        [CHECKOUT_DATA]: setCheckoutData,
        [CUR_INDEX]: ['curIndex'],
        [IS_VALID]: setIsValid,
        [IS_DIRTY]: setIsDirty,
        [SET_SHIPPING_METHODS]: ['shippingMethods'],
    },
    initialState
);

export default reducer;
