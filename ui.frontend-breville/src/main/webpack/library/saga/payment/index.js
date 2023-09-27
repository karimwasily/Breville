import { call, select, put, takeEvery } from 'redux-saga/effects';
import { FETCH_REQUEST, MAKE_CREDITCARD_PAYMENT, PLACE_ORDER, MAKE_AFFIRM_PAYMENT, MAKE_PAYPAL_PAYMENT, SUBMIT_DETAILS } from 'library/store/payment/action-types';
import { serviceRequest, createOrderService } from 'library/store/payment/service-request';
import { fetchSuccess, fetchFail } from 'library/store/payment/actions';
import { selectLocale, selectCurrencyCode, selectCountry } from 'library/store/global/selector';
import { selectTotalGrossAmt, selectIsFetched, selectStandardItemGrossAmt, selectSubscriptionItemGrossAmt } from 'library/store/cart/selector';
import { selectPaymentId } from 'library/store/payment/selector';
import waitForCondition from 'xps-utils/wait-for-condition';
import { normalizeByName } from 'xps-utils/normalize';
import { storeInstance } from 'library/store';
import { makePayment } from './make-payment';
import { placeOrder } from './place-order';
import { makeAffirmPayment } from './affirm';
import { makePaypalPayment, submitDetails } from './make-paypal-payment';
import get from 'lodash.get';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @returns {*}
 */
export function* fetchData( action ) {

  try {
    const actionMap = {
      affirm: {
        storageKey: 'affirmVersion',
        selector: selectStandardItemGrossAmt
      },
      default: {
        storageKey: 'paymentVersion',
        selector: selectTotalGrossAmt
      },
      subscription: {
        storageKey: 'paymentVersion',
        selector: selectSubscriptionItemGrossAmt
      }
    };

    const { payload: { params = 'default' } = {} } = action;
    const { storageKey, selector } = actionMap[params];
    const cartID = localStorage.getItem( 'cartID' );
    if ( !cartID ) return;
    yield call( waitForCondition, ()=>selectIsFetched( storeInstance.getState() ) );
    const locale = yield select( selectLocale );
    const currencyCode = yield select( selectCurrencyCode );
    const country = yield select( selectCountry );
    const centAmount = yield select( selector );

    const data = {
      amountPlanned: {
        currencyCode: currencyCode,
        centAmount
      },
      paymentMethodInfo: {
        paymentInterface: 'ctp-adyen-integration'
      },
      custom: {
        type: {
          typeId: 'type',
          key: 'ctp-adyen-integration-web-components-payment-type'
        },
        fields: {
          cartIdReference: cartID,
          getPaymentMethodsRequest: `{"countryCode": "${ country }","shopperLocale": "${ locale }"}`

        }
      }
    };

    const response = yield call( serviceRequest, { data } );
    const { id, version } = response;
    localStorage.setItem( storageKey, version );
    localStorage.setItem( `${ storageKey }Id`, id );

    if ( action === 'affirm' ) return null; // NOTE: If affirm we don't want to overwrite id in store

    const responseRaw = get( response, 'custom.fields.getPaymentMethodsResponse', '{}' );
    const responseParsed = JSON.parse( responseRaw ) || {};
    const normalizedPaymentMethods = normalizeByName( responseParsed.paymentMethods || [] );
    yield put( fetchSuccess( { id, paymentMethods: normalizedPaymentMethods, responseParsed } ) );
  }
  catch ( error ) {
    console.error( error );
    yield put( fetchFail( error ) );
  }
}

/**
 * WATCHERS
 */

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
export function* watchSaga() {
  yield takeEvery( FETCH_REQUEST, fetchData );
  yield takeEvery( MAKE_CREDITCARD_PAYMENT, makePayment );
  yield takeEvery( MAKE_PAYPAL_PAYMENT, makePaypalPayment );
  yield takeEvery( MAKE_AFFIRM_PAYMENT, makeAffirmPayment );
  yield takeEvery( PLACE_ORDER, placeOrder );
  yield takeEvery( SUBMIT_DETAILS, submitDetails );
}

export default watchSaga;
