import { createApiActions } from 'xps-utils/redux-utility/api';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, IS_LOADING, VIEW_SUBSCRIPTION, CANCEL_SUBSCRIPTION, PAUSE_SUBSCRIPTION, PAUSE_NEXTDATES, RESUME_SUBSCRIPTION, UPDATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION_ADDRESS, VIEW_ORDER } from './action-types';
import actionCreator from 'xps-utils/redux-utility/createAction';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );

export const viewSubscription = actionCreator(VIEW_SUBSCRIPTION, 'headers');
export const pauseNextdates = actionCreator( PAUSE_NEXTDATES, 'standing_order_id');
export const pauseSubscription = actionCreator( PAUSE_SUBSCRIPTION, 'iteration_number', 'pausedate', 'resume_subscription', 'standing_order_id' );
export const cancelSubscription = actionCreator( CANCEL_SUBSCRIPTION, 'standing_order_action', 'standing_order_id');
export const resumeSubscription = actionCreator( RESUME_SUBSCRIPTION, 'iteration_number', 'pausedate', 'resume_subscription', 'standing_order_id' );
export const updateSubscriptionAddress = actionCreator( UPDATE_SUBSCRIPTION_ADDRESS, 'params' );
export const viewOrder = actionCreator(VIEW_ORDER, 'headers');
export const setLoading = actionCreator( IS_LOADING, 'isLoading' );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export default apiActions;
