import createReducer from 'xps-utils/redux-utility/createReducer';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, IS_LOADING, WRONG_PROMO, ADD_PRODUCT, CART_EMPTY, AUTH_USERNAME } from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

export const initialState = createInitialState();

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    [IS_LOADING]: ['isLoading'],
    [CART_EMPTY]: ['cartEmpty'],
    [WRONG_PROMO]: ['wrongPromo'],
    [AUTH_USERNAME]: ['authUserName'],
    [ADD_PRODUCT]: ( state, payload ) => {
      const oldProductDetail = state.productDetail;
      return {
        ...state,
        productDetail: { ...oldProductDetail, ...payload.productDetail }
      };
    },
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL )
  },
  initialState,
);

export default reducer;
