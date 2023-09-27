import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_REQUEST, VIEW_SUBSCRIPTION, PAUSE_NEXTDATES, PAUSE_SUBSCRIPTION, RESUME_SUBSCRIPTION, CANCEL_SUBSCRIPTION, VIEW_ORDER } from 'library/store/subscription/action-types';
import { fetchSuccess, fetchFail, setLoading } from 'library/store/subscription/actions';
import { serviceRequest, viewSubscriptionRequest, pauseNextdatesRequest, pauseSubscriptionRequest, resumeSubscriptionRequest, cancelSubscriptionRequest, viewOrderRequest } from 'library/store/subscription/service-request';
import userSchema from 'library/schema/users';
import get from 'lodash.get';

let token_id = localStorage.getItem('access_token');


/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 */
export function* fetchSubscriptionList( action ) {
  try {
    // your logics here
    yield put( setLoading( true ) );
    const response = yield call( viewSubscriptionRequest);
    yield put( fetchSuccess( response ) );
    yield put( setLoading( false ) );
  }
  catch ( error ) {
    yield put( fetchFail( error ) );
  }
}


/**
 * Pause Next dates API Call
 */
export function* getPauseNextDates (action) {
  try {
    yield put(setLoading( true ) );
    const response = yield call (pauseNextdatesRequest, {
      params: {
        standing_order_id: action.payload.standing_order_id,
      }
    });
    yield put (fetchSuccess( response ) );
    yield put (setLoading( false ) );
  }
  catch(error ) {
    yield put( fetchFail( error ) );
  }
}


/*******
 * Update Pause Subscription
 */
export function* updatePauseSubscription(action) {
  try {
    yield put(setLoading( true ) );
    const response = yield call (pauseSubscriptionRequest, {
      data: {
        iteration_number: action.payload.iteration_number.iteration_number,
        pausedate: action.payload.iteration_number.pausedate,
        resume_subscription: action.payload.iteration_number.resume_subscription,
        standing_order_id: action.payload.iteration_number.standing_order_id
      }
    });
    if(response) {
      const viewResponse = yield call( fetchSubscriptionList );
      yield put (fetchSuccess( viewResponse ) );
      yield put (setLoading( false ) );
    } else {
      yield put( fetchFail( error ) );
    }
  }
  catch(error) {
    yield put( fetchFail( error ) );
  }
}

/****
 * Cancel Subscription
 */

 export function* updateCancelSubscription(action) {
  try {
    yield put(setLoading( true ) );
    const response = yield call (cancelSubscriptionRequest, {
      data: {
        standing_order_action: action.payload.standing_order_action.standing_order_action,
        standing_order_id: action.payload.standing_order_action.standing_order_id,
      }
    });
    if(response) {
      const viewResponse = yield call( fetchSubscriptionList );
      yield put (fetchSuccess( viewResponse ) );
      yield put (setLoading( false ) );
    } else {
      yield put( fetchFail( error ) );
    }
  } catch(error) {
      yield put( fetchFail( error ) );
  }
}

/********
 * Resume Subscription
 */
export function* updateResumeSubscription(action) {
  try {
    yield put(setLoading( true ) );
    const response = yield call (pauseSubscriptionRequest, {
      data: {
        iteration_number: action.payload.iteration_number.iteration_number,
        pausedate: action.payload.iteration_number.pausedate,
        resume_subscription: action.payload.iteration_number.resume_subscription,
        standing_order_id: action.payload.iteration_number.standing_order_id
      }
    });
    if(response) {
      const viewResponse = yield call( fetchSubscriptionList );
      yield put (fetchSuccess( viewResponse ) );
      yield put (setLoading( false ) );
    } else {
      yield put( fetchFail( error ) );
    }
  }
  catch(error) {
    yield put( fetchFail( error ) );
  }
}

export function* fetchOrderList(action) {
  try {
    // your logics here
    yield put(setLoading(true));
    const response = yield call(viewOrderRequest);
    yield put(fetchSuccess(response));
    yield put(setLoading(false));
  }
  catch (error) {
    yield put(fetchFail(error));
  }
}




/**
 * WATCHERS
 */

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
export function* watchSaga() {
  yield takeEvery( VIEW_SUBSCRIPTION, fetchSubscriptionList );
  yield takeEvery( PAUSE_NEXTDATES, getPauseNextDates );
  yield takeEvery(PAUSE_SUBSCRIPTION, updatePauseSubscription );
  yield takeEvery(RESUME_SUBSCRIPTION, updateResumeSubscription );
  yield takeEvery(CANCEL_SUBSCRIPTION, updateCancelSubscription );
  yield takeEvery(VIEW_ORDER, fetchOrderList );

}

export default watchSaga;
