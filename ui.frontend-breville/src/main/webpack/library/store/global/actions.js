import { createApiActions } from 'xps-utils/redux-utility/api';
import actionCreator from 'xps-utils/redux-utility/createAction';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_LOADING,
  COMPARISON_TOGGLE,
  COMPARISON_CLOSE_BANNER,
  COMPARISON_ADD,
  COMPARISON_REMOVE
} from './action-types';

export const apiActions = createApiActions(
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL
);
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;
export const setLoading = actionCreator( SET_LOADING, 'isLoading' );

// COMPARISON
export const comparisonToggle = actionCreator( COMPARISON_TOGGLE );
export const comparisonClose = actionCreator( COMPARISON_CLOSE_BANNER );
export const comparisonAdd = actionCreator( COMPARISON_ADD );
export const comparisonRemove = actionCreator( COMPARISON_REMOVE );


export default apiActions;
