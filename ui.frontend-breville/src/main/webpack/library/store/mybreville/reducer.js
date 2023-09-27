import createReducer from 'xps-utils/redux-utility/createReducer';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_LOADING,
  SET_ERROR,
  SET_AEM_DATA,
  SET_USER_DETAIL,
  SET_USER_ORDERS,
  SET_NOTIFICATION_TEXT,
  SET_MASTER_CLASSES,
  SET_MY_SUBSCRIPTIONS,
  SET_PAUSE_SUBSCRIPTION_DATE,
  SET_USER_PRODUCTS
} from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

const mybrevilleInitialState = {
  aemData: {},
  userDetail: {},
  userOrders: [],
  notifcationText: '',
  masterClasses: [],
  mySubscriptions: [],
  pausedDates: [],
  userProducts: []
};

export const initialState = createInitialState( mybrevilleInitialState );

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
    [SET_LOADING]: ['isLoading'],
    [SET_ERROR]: ['errorFlag'],
    [SET_AEM_DATA]: ['aemData'],
    [SET_USER_DETAIL]: ['userDetail'],
    [SET_USER_ORDERS]: ['userOrders'],
    [SET_NOTIFICATION_TEXT]: ['notifcationText'],
    [SET_MASTER_CLASSES]: ['masterClasses'],
    [SET_MY_SUBSCRIPTIONS]: ['mySubscriptions'],
    [SET_PAUSE_SUBSCRIPTION_DATE]: ['pausedDates'],
    [SET_USER_PRODUCTS]: ['userProducts']
  },
  initialState
);

export default reducer;
