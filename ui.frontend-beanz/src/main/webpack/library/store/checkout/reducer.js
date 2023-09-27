import createReducer from 'xps-utils/redux-utility/createReducer';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  IS_LOADING,
  ACTIVE_CART_EMPTY,
  GET_UPDATED_CART
} from './action-types';

import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

export const initialState = createInitialState();

export const reducer = createReducer(
  {
    [IS_LOADING]: ['isLoading'],
    [ACTIVE_CART_EMPTY]: ['cartEmpty'],
    [GET_UPDATED_CART]: ['updatedCart'],
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL )
  },
  initialState,
);

export default reducer;
