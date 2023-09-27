import createReducer from 'xps-utils/redux-utility/createReducer';
import {
  CHANGE_MODAL_WINDOW,
  CHANGE_TOAST,
  PAGE_LOADING
} from './action-types';
import queryString from 'query-string';

export const initialState = {
  modalState: {},
  pageLoading: false,
  toastState: {},
  region: 'en-US',
  parsedQuery: queryString.parse( location.search )
};

export const selectModal = ( state, action ) => {

  const { key, value } = action;
  const stateData = state.modalState;
  const currentValue = stateData[key];
  const combined = { modalState: { ...stateData, [key]: { ...currentValue, ...value } } };

  return {
    ...state,
    ...combined
  };

};

export const reducer = createReducer(
  {
    [CHANGE_TOAST]: ['toastState'],
    [CHANGE_MODAL_WINDOW]: selectModal,
    [PAGE_LOADING]: ['pageLoading']
  },
  initialState
);

export default reducer;
