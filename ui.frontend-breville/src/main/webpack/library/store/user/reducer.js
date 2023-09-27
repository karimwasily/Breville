import createReducer from 'xps-utils/redux-utility/createReducer';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  NAME
} from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';
export const initialState = createInitialState();

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
    [NAME]: ['name']
  },
  { ...initialState, name: '' }
);

export default reducer;
