import { createApiActions } from 'xps-utils/redux-utility/api';
import actionCreator from '@breville-utils/redux-utility/createAction';
import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAIL,
    SET_LOADING
} from './action-types';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;
export const setLoading = actionCreator( SET_LOADING, 'isLoading' );

export default apiActions;
