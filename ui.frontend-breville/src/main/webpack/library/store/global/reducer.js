import createReducer from 'xps-utils/redux-utility/createReducer';
import { getAEMGlobalConfig } from 'xps-utils/aemGlobalConfig';
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
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

// * add global aem config on mount to redux state
const aemConfig = getAEMGlobalConfig();

const globalInitialState = {
  comparisonList: [],
  isComparing: false,
  aemConfig
};

export const initialState = createInitialState( globalInitialState );

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
    [SET_LOADING]: ['isLoading'],
    [COMPARISON_TOGGLE]: comparisonToggle,
    [COMPARISON_CLOSE_BANNER]: comparisonCloseBanner,
    [COMPARISON_ADD]: comparisonAdd,
    [COMPARISON_REMOVE]: comparisonRemove
  },
  initialState
);


export default reducer;

function comparisonToggle( state ) {
  return {
    ...state,
    isComparing: !state.isComparing
  };
}

function comparisonCloseBanner( state ) {
  return {
    ...state,
    isComparing: false
  };
}

function comparisonAdd( state, payload ) {
  return {
    ...state,
    comparisonList: [...state.comparisonList, payload]
  };
}

function comparisonRemove( state, payload ) {
  console.log( { state, payload } );
  const updatedList = state.comparisonList.filter(
    ( item ) => item.objectID !== payload.key );

  return {
    ...state,
    comparisonList: updatedList
  };
}