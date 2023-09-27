import createReducer from 'xps-utils/redux-utility/createReducer';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, IS_LOADING } from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

export const initialState = createInitialState();

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    [IS_LOADING]: ['isLoading'],
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL )
  },
  initialState,
);


export default reducer;
