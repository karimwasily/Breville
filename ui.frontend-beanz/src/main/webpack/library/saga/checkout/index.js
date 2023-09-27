import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_ACTIVE_CART, UPDATE_ACTIVE_CART, GET_CART_VERSION } from 'library/store/checkout/action-types';
import { fetchSuccess, fetchFail, setLoading, setCartEmpty, setUpdatedCart } from 'library/store/checkout/actions';
import { updateCartRequest, setShippingMethodRequest, getActiveCartRequest, getCartVersionRequest } from 'library/store/checkout/service-request';
import {
  shippingAddressAnalyticsUpdate,
  shippingMethodSetAnalyticsUpdate,
  shippingMethodRecalculateAnalyticsUpdate,
  updateCartAnalyticsData
} from '../../../components/checkout/analytics-update';

import { configuration } from 'xps-utils/configuration';
const configurationData = configuration();


export function* getActiveCart( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const response = yield call( getActiveCartRequest, { variables: payload.params.variables } );
    if ( response.data?.me?.activeCart ) {
      localStorage.setItem( 'cartversion', response.data?.me?.activeCart?.version );
      yield put( setCartEmpty( false ) );
      updateCartAnalyticsData( response.data?.me?.activeCart );
    }
    else {
      yield put( setCartEmpty ( true ) );
    }
    yield put( fetchSuccess( response ) );
  }
  catch ( error ) {
    yield put( setLoading( false ) );
    yield put( fetchFail( error ) );
  }
}

export function* getCartVersion( { payload } ) {
  try {
    const response = yield call( getCartVersionRequest, { variables: payload.params.variables } );
    localStorage.setItem( 'cartversion', response.data?.me?.carts?.results[0].version );
  }
  catch ( error ) {
    yield put( fetchFail( error ) );
  }
}

export function* updateCartSatate( { payload } ) {
  try {
    yield put( setLoading( true ) );
    let response = yield call( updateCartRequest, { variables: payload.params.variables } );
    localStorage.setItem( 'cartversion', response.data.updateMyCart.version );
    shippingAddressAnalyticsUpdate( response );

    response = yield call( setShippingMethodRequest, {
      variables: {
        actions: { setShippingMethod: { shippingMethod: { id: configurationData.shippingMethodId } } },
        id: payload.params.variables.id,
        version: response.data.updateMyCart.version,
        locale: payload.params.variables.locale
      } } );
    localStorage.setItem( 'cartversion', response.data.updateMyCart.version );
    localStorage.removeItem( 'orderID' );
    shippingMethodSetAnalyticsUpdate( response );


    response = yield call( setShippingMethodRequest, {
      variables: {
        actions: [{ recalculate: { updateProductData: true } }],
        id: payload.params.variables.id,
        version: response.data.updateMyCart.version,
        locale: payload.params.variables.locale
      }
    } );
    localStorage.setItem( 'cartversion', response.data.updateMyCart.version );
    yield put( setUpdatedCart( response ) );
    shippingMethodRecalculateAnalyticsUpdate( response );
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
  yield takeEvery( GET_ACTIVE_CART, getActiveCart );
  yield takeEvery( UPDATE_ACTIVE_CART, updateCartSatate );
  yield takeEvery( GET_CART_VERSION, getCartVersion );
}

export default watchSaga;