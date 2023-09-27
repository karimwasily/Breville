import createReducer from '@breville-utils/redux-utility/createReducer';
import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAIL,
    SET_LOADING
} from './action-types';
import { createInitialState, createApiActionMap } from '@breville-utils/redux-utility/api';
export const initialState = createInitialState();

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
    {
        ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
        [SET_LOADING]: [ 'isLoading' ]
    },
    initialState
);

export default reducer;
