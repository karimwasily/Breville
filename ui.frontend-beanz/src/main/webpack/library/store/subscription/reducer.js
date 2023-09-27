import createReducer from 'xps-utils/redux-utility/createReducer';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, IS_LOADING, VIEW_SUBSCRIPTION, RESUME_SUBSCRIPTION, CANCEL_SUBSCRIPTION, PAUSE_SUBSCRIPTION, PAUSE_NEXTDATES, UPDATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION_ADDRESS, VIEW_ORDER } from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

export const initialState = createInitialState();

//create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details

const initalState = {
  list: {},
  nextDates: {},
}

const pauseNextDates = (state) => {
  const nextDates = { ...state.data.NextOrders }
  return nextDates;
}

const viewSubscription = (state) => {
  const list = { ...state.data };
  return list;
}

export const reducer = createReducer(
  {
    [IS_LOADING]: ['isLoading'],
    [VIEW_SUBSCRIPTION]: ['viewSubscription'],
    [PAUSE_NEXTDATES]: ['pauseNextDates'],
    [CANCEL_SUBSCRIPTION]: ['cancelSubscription'],
    [PAUSE_SUBSCRIPTION]: ['pauseSubscription'],
    [RESUME_SUBSCRIPTION]: ['resumeSubscription'],
    [VIEW_ORDER]: ['viewOrder'],
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL )
  },
  initialState,
);


export default reducer;
