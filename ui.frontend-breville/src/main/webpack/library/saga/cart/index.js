import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_REQUEST, UPDATE_QUANTITY, ADD_PROMOCODE, REMOVE_PROMOCODE, REMOVE_PRODUCT, CREATE_NEW_CART, FETCH_WARRANTY } from 'library/store/cart/action-types';
import { fetchSuccess, fetchFail, addCoverageSummary } from 'library/store/cart/actions';
import { pageLoading } from 'library/store/ui/actions';
import { selectLocale, selectMulberryConfig } from 'library/store/global/selector';
import serviceRequest from 'library/store/cart/service-request';
import { nomralizeCart } from './helper';
import { removeProduct } from './remove-product';
import { updateCartQuantity } from './update-quantity';
import { addPromoCode, removePromoCode } from './promocode';
import { fetchWarrantyList } from './warranty';
import { createNewCart } from './create-new-cart';
import get from 'lodash.get';
import { mapCommerceToolsToAddress } from 'components/checkout/utility.js';
import { setCheckoutData, setCheckoutLoading } from 'library/store/checkout/actions';

export function* intializeMulberry(){

  try {
    const { publicToken, coverageKey } = yield select( selectMulberryConfig );

    yield window.mulberry.core.init( { publicToken } );
    const coverage = yield mulberry.core.getCoverageDetails( coverageKey );
    window.mulberry.faq.init( {
      useOverlay: true,
      coverage
    } );
    yield put( addCoverageSummary( coverage ) );
  }
  catch ( e ){
    console.error( 'Error while initializing mulberry', e );
  }

}

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
export function* fetchData() {
  try {
    // start page loading
    yield put( pageLoading( true ) );
    //
    // graphql call to get cart
    const region = yield select( selectLocale );
    const response = yield call( serviceRequest, { variables: { locale: region } } ) || {};
    response.region = region;
    const normalizedResponse = nomralizeCart( response );

    // Map address to array
    const { shippingAddress = {}, billingAddress = {} } = normalizedResponse;
    const addressArr = {};

    if ( shippingAddress && billingAddress ) {
      addressArr[1] = mapCommerceToolsToAddress( shippingAddress );
      addressArr[2] = mapCommerceToolsToAddress( billingAddress );

      // set checkout state
      yield put( setCheckoutData( { address: addressArr } ) );
      yield put( setCheckoutLoading( false ) );
    }

    // Set cart state
    yield put( fetchSuccess( normalizedResponse ) );
    //
    // turn off page loading
    yield put( pageLoading( false ) );
    const warrantyMap = get( normalizedResponse, 'lineItems.warrantyMap' );
    yield call( fetchWarrantyList, warrantyMap );
  }
  catch ( error ) {
    console.error( 'cart saga', error );
    yield put( fetchFail( error ) );
    yield put( pageLoading( false ) );
  }
}

export function* initializeCart(){
  yield fork( intializeMulberry );
  yield fork( fetchData );
}

// * helper to dispatch fetch warranty from non cart pages
export function* fetchWarrantyListWrap( { payload } ) {
  try {
    yield call( fetchWarrantyList, payload );
  }
  catch ( e ) {
    console.error( e );
  }
}

/**
 * WATCHERS
 */

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
export function* watchSaga() {
  yield takeEvery( FETCH_REQUEST, initializeCart );
  yield takeEvery( UPDATE_QUANTITY, updateCartQuantity );
  yield takeEvery( ADD_PROMOCODE, addPromoCode );
  yield takeEvery( REMOVE_PROMOCODE, removePromoCode );
  yield takeEvery( REMOVE_PRODUCT, removeProduct );
  yield takeEvery( CREATE_NEW_CART, createNewCart );
  yield takeEvery( FETCH_WARRANTY, fetchWarrantyListWrap );
}

export default watchSaga;
