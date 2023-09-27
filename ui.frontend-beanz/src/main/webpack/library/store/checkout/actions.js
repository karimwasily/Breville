import { createApiActions } from 'xps-utils/redux-utility/api';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  IS_LOADING,
  ACTIVE_CART_EMPTY,
  GET_ACTIVE_CART,
  UPDATE_ACTIVE_CART,
  GET_UPDATED_CART,
  GET_CART_VERSION
} from './action-types';

import actionCreator from 'xps-utils/redux-utility/createAction';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const setLoading = actionCreator( IS_LOADING, 'isLoading' );
export const setCartEmpty = actionCreator( ACTIVE_CART_EMPTY, 'cartEmpty' );
export const getActiveCart = actionCreator( GET_ACTIVE_CART, 'params' );
export const updateActiveCart = actionCreator( UPDATE_ACTIVE_CART, 'params' );
export const setUpdatedCart = actionCreator( GET_UPDATED_CART, 'updatedCart' );
export const getCartVersion = actionCreator( GET_CART_VERSION, 'params' );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export default apiActions;