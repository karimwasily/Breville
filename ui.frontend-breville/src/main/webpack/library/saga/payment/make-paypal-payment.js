import { call, select, put, takeEvery } from 'redux-saga/effects';
import { serviceRequest, getPaymentVersion } from 'library/store/payment/service-request';
import { selectTotalGrossAmt, selectBillingAddress } from 'library/store/cart/selector';
import { selectPaymentId } from 'library/store/payment/selector';
import { setPaypalAuthorized } from 'library/store/payment/actions';
import { fetchData as fetchCart } from '../cart';
import { pageLoading } from 'library/store/ui/actions';
import get from 'lodash.get';
import { v4 as uuidv4 } from 'uuid';

export function* makePaypalPayment( payload ) {
  try {
    const { payload: { onSuccess } = {} } = payload;
    const centAmount = yield select( selectTotalGrossAmt );
    const billingAddress = yield select( selectBillingAddress );
    const paymentId = yield select( selectPaymentId );
    const { email } = billingAddress;
    const type = payload.payload.data.paymentMethod.type;
    const subtype = payload.payload.data.paymentMethod.subtype;
    const paymentVersion = yield call( getPaymentVersion, { variables: { id: paymentId } } );

    const data = {
      version: paymentVersion.data.me.payment.version,
      actions: [
        {
          action: 'setCustomField',
          name: 'makePaymentRequest',
          value: `{"amount": {"currency": "USD","value": ${ centAmount }},"paymentMethod": {"type": "${ type }","subtype": "${ subtype }"},"shopperEmail": "${ email }"}`
        }
      ]
    };

    const response = yield call( serviceRequest, { url: paymentId, data } );
    if ( response ) {
      const paymentResponse = JSON.parse( response?.custom?.fields?.makePaymentResponse );
      if ( paymentResponse.action ) {
        payload.payload.component.handleAction( paymentResponse.action );
      }
      else {
        yield call( submitDetails, { payload: { params: response, onSuccess } } );
      }
    }
  }
  catch ( e ) {
    console.error( e );
  }
}

export function* submitDetails( responseData ) {
  const { payload: { onSuccess } } = responseData;
  try {
    const paymentId = yield select( selectPaymentId );
    const paymentVersion = yield call( getPaymentVersion, { variables: { id: paymentId } } );
    const data = {
      version: paymentVersion.data.me.payment.version,
      actions: [
        {
          action: 'setCustomField',
          name: 'submitAdditionalPaymentDetailsRequest',
          value: responseData.payload.data
        }
      ]
    };

    onSuccess();
    yield put( pageLoading( true ) );
    const response = yield call( serviceRequest, { url: paymentId, data } );
    yield call( fetchCart );
    const rawResponse = get( response, 'custom.fields.submitAdditionalPaymentDetailsResponse', '' );
    const parsed = JSON.parse( rawResponse ) || {};
    const isAuthorized = parsed.resultCode === 'Authorised';
    yield put( setPaypalAuthorized( isAuthorized ) );
    yield put( pageLoading( false ) );
  }
  catch ( e ){
    console.error( e );
  }
}