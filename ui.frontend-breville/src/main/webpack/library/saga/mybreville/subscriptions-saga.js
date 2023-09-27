import { call, select, put } from 'redux-saga/effects';
import { pageLoading } from 'library/store/ui/actions';
import { editSubscriptionAddressService, getSubscriptionPauseDatesService, pauseASubscriptionService, cancelASubscriptionService } from 'library/store/mybreville/service-request';
import { selectUserId, selectMySubscriptions } from 'library/store/mybreville/selector';
import { setSubscriptionNextValues, setError } from 'library/store/mybreville/actions';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */

export function* editSubscriptionAddress( action = {} ) {
  // This needs to be completed
  const { payload: { firstName, address1 } } = action;
  const data = {
    firstName: firstName,
    streetName: address1
  };

  try {
    yield put( pageLoading( true ) );

    yield call( editSubscriptionAddressService, {
      data
    } );

    yield put( pageLoading( false ) );
  }
  catch ( error ) {
    console.error( 'mybreville saga', error );
    yield put( setError( true ) );
    yield put( pageLoading( false ) );
  }
}

export function* getPausedSubsriptionDates( action = {} ) {
  const { payload: { standingOrderId } } = action;

  try {
    yield put( pageLoading( true ) );

    const nextPauseResponse = yield call( getSubscriptionPauseDatesService, {
      params: {
        standing_order_id: standingOrderId
      }
    } );

    yield put( setSubscriptionNextValues( nextPauseResponse?.data ) );
    yield put( pageLoading( false ) );
  }
  catch ( error ) {
    console.error( 'mybreville saga', error );
    yield put( setError( true ) );
    yield put( pageLoading( false ) );
  }
}

export function* pauseASubsriptionDates( action = {} ) {
  const { payload: { standingOrderId, iterationNumber, pauseDate, successCallback } } = action;

  try {
    yield put( pageLoading( true ) );

    const allSusbscriptions = yield select( selectMySubscriptions );
    const pauseSubscriptionFound = allSusbscriptions?.find( ( obj ) => {
      return obj.standingorderid === standingOrderId;
    } );
    const pauseResponse = yield call( pauseASubscriptionService, {
      data: {
        standing_order_id: `${ standingOrderId }`,
        iteration_number: iterationNumber,
        pausedate: pauseDate,
        resume_subscription: 'false'
      }
    } );
    if ( pauseResponse && pauseSubscriptionFound ) {
      pauseSubscriptionFound.nextdeliverydate = pauseResponse.NEXT_DROP_DATE;
      pauseSubscriptionFound.status = pauseResponse.STATUS;
    }
    yield put( pageLoading( false ) );
    if ( successCallback && typeof successCallback === 'function' ) {
      successCallback( {
        pauseSubscriptionFound
      } );
    }
  }
  catch ( error ) {
    console.error( 'mybreville saga', error );
    yield put( setError( true ) );
    yield put( pageLoading( false ) );
  }
}

export function* cancelASubsriptions( action = {} ) {
  const { payload: { standingOrderId, successCallback } } = action;

  try {
    yield put( pageLoading( true ) );

    const allSusbscriptions = yield select( selectMySubscriptions );
    const subscriptionData = allSusbscriptions?.find( ( obj ) => obj.standingorderid === standingOrderId ) || {};
    const cancelResponse = yield call( cancelASubscriptionService, {
      data: {
        standing_order_id: `${ standingOrderId }`,
        standing_order_action: 'Cancelled'
      }
    } );
    if ( cancelResponse && !!Object.keys( subscriptionData ).length ) {
      subscriptionData.status = cancelResponse.STATUS;
    }
    yield put( pageLoading( false ) );
    if ( successCallback && typeof successCallback === 'function' ) {
      successCallback( subscriptionData );
    }
  }
  catch ( error ) {
    console.error( 'mybreville saga', error );
    yield put( setError( true ) );
    yield put( pageLoading( false ) );
  }
}


export default editSubscriptionAddress;