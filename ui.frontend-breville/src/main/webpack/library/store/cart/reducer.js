import createReducer from 'xps-utils/redux-utility/createReducer';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, ADD_COVERAGE_SUMMARY, ADD_WARRANTY_DETAIL, WAIT, ORDER_DETAIL, DISCOUNT_CODES } from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

export const initialState = createInitialState();

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
    [ADD_COVERAGE_SUMMARY]: ['coverageSummary'],
    [ADD_WARRANTY_DETAIL]: ['warrantyDetail'],
    [WAIT]: ['wait'],
    [ORDER_DETAIL]: ['orderDetail'],
    [DISCOUNT_CODES]: ['discountCodes']
  },
  initialState,
);

export default reducer;
