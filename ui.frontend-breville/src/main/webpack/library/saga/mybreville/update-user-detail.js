import { call, select, put } from 'redux-saga/effects';
import { pageLoading } from 'library/store/ui/actions';
import { updateUserDetailService } from 'library/store/mybreville/service-request';
import { selectUserId, selectUserDetail } from 'library/store/mybreville/selector';
import { setUserDetail, setError } from 'library/store/mybreville/actions';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
export function* updateDetail( action = {} ) {
  const { payload: { data: { firstName, lastName, phone }, successCallback, failCallback } } = action;
  const data = {
    FirstName: firstName,
    LastName: lastName,
    Phone: phone
  };

  try {
    yield put( pageLoading( true ) );

    const userId = yield select( selectUserId );
    const userDetail = yield select( selectUserDetail );

    yield call( updateUserDetailService, {
      url: userId,
      data
    } );

    yield put( setUserDetail( { ...userDetail, ...data } ) );
    yield put( setError( false ) );
    yield put( pageLoading( false ) );

    if ( successCallback && typeof successCallback === 'function' ) {
      successCallback();
    }
  }
  catch ( error ) {
    console.error( 'Update user detail', error );
    yield put( setError( true ) );
    yield put( pageLoading( false ) );

    /**
     * Run failCallback if it's provided by the action creator
     */
    if ( failCallback && typeof failCallback === 'function' ) {
      failCallback( error );
    }
  }
}

export default updateDetail;