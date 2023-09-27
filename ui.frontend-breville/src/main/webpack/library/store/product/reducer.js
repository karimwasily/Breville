import createReducer from 'xps-utils/redux-utility/createReducer';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, SET_PRODUCT_PARENT, SET_PRODUCT_VARIANT, SET_VARIANTS } from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

const productInitialState = {
  productParent: null,
  productVariant: null,
  variants: []
};

export const initialState = createInitialState( productInitialState );

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
    [SET_PRODUCT_PARENT]: ['productParent'],
    [SET_VARIANTS]: ['variants'],
    [SET_PRODUCT_VARIANT]: ['productVariant']
  },
  initialState,
);

export default reducer;
