import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_USER, UPDATE_USER_SHIPPING_ADDRESS,ADD_ALTERNATE_SHIPPING_ADDRESS, UPDATE_ALTERNATE_SHIPPING_ADDRESS, SET_DEFAULT_SHIPPING_ADDRESS } from 'library/store/user/action-types';
import { fetchSuccess, fetchFail, setLoading, fetchUser } from 'library/store/user/actions';
import { getAccountDetailsRequest, updateAccountAddressRequest, addAlternateShippingAddressService, updateAlternateShippingAddressService,
   setDefaultShippingAddressService } from 'library/store/user/service-request';

/**
 * Fetches logedId user data and publishes the successful result, or an error
 */

export function* fetchLogedInUserData() {
  try {
    yield put( setLoading( true ) );
    const response = yield call( getAccountDetailsRequest );
    yield put( fetchSuccess( response ) );
    yield put( setLoading( false ) );
  }
  catch ( error ) {
    yield put( setLoading( false ) );
    yield put( fetchFail( error ) );
  }
}

export function* updateUserShippingAddress( { payload } ) {
  try {
    yield put( setLoading( true ) );

    yield call( updateAccountAddressRequest, payload.params );
    yield put( setLoading( false ) );
  }
  catch ( error ) {
    yield put( setLoading( false ) );
    yield put( fetchFail( error ) );
  }
}

export function* addAlternateShippingAddress( { payload } ) {
  try {

    yield put( setLoading( true ) );
    yield call( addAlternateShippingAddressService, payload.params );
    yield put( setLoading( false ) );
    yield put( fetchUser() );

  }
  catch ( error ) {
    yield put( setLoading( false ) );
    yield put( fetchFail( error ) );
  }
}


export function* updateAlternateShippingAddress( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( updateAlternateShippingAddressService, payload.params );

    yield put( setLoading( false ) );
  }
  catch ( error ) {
    yield put( setLoading( false ) );
    yield put( fetchFail( error ) );
  }
}

export function* setDefaultShippingAddress( { payload } ) {
  try {

    yield put( setLoading( true ) );
    yield call( setDefaultShippingAddressService, payload.params );
    yield put( setLoading( false ) );
    yield put( fetchUser() );

  }
  catch ( error ) {
    yield put( setLoading( false ) );
    yield put( fetchFail( error ) );
  }
}

/**
 * WATCHERS
 */

export function* watchSaga() {
  yield takeEvery( GET_USER, fetchLogedInUserData );
  yield takeEvery( UPDATE_USER_SHIPPING_ADDRESS, updateUserShippingAddress );
  yield takeEvery( ADD_ALTERNATE_SHIPPING_ADDRESS, addAlternateShippingAddress );
  yield takeEvery( UPDATE_ALTERNATE_SHIPPING_ADDRESS, updateAlternateShippingAddress );
  yield takeEvery( SET_DEFAULT_SHIPPING_ADDRESS, setDefaultShippingAddress );


  

}

export default watchSaga;
