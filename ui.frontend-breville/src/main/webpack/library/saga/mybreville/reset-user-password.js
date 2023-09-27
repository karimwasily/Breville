import { call, select, put } from 'redux-saga/effects';
import { pageLoading } from 'library/store/ui/actions';
import { setError } from 'library/store/mybreville/actions';
import { resetUserPasswordService } from 'library/store/mybreville/service-request';
import { selectUserDetail } from 'library/store/mybreville/selector';
import fetchData from './fetch-data';
import { getAEMGlobalConfig } from 'xps-utils/aemGlobalConfig';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
export function* resetUserPassword( action = {} ) {

  const { payload: { successCallback, failCallback } } = action;

  try {
    yield put( pageLoading( true ) );
    const userDetail = yield select( selectUserDetail );
    const userEmail = userDetail?.PersonEmail;
    const { auth0ClientId } = getAEMGlobalConfig();
    yield call( resetUserPasswordService, {
      url: 'dbconnections/change_password',
      data: {
        client_id: auth0ClientId,
        connection: 'Salesforce',
        email: userEmail
      }
    } );
    yield put( pageLoading( false ) );

    if ( successCallback && typeof successCallback === 'function' ) {
      successCallback();
    }
  }
  catch ( error ) {
    console.error( 'mybreville saga', error );
    yield put( setError( true ) );
    yield put( pageLoading( false ) );
    if ( failCallback && typeof failCallback === 'function' ) {
      failCallback();
    }
  }
}

export default resetUserPassword;