
import { call, select, put, takeEvery } from 'redux-saga/effects';
import { selectStandardItemGrossAmt, selectBillingAddress, selectShippingAddress, selectStandardItemPayload } from 'library/store/cart/selector';
import { selectCountry, selectCurrencyCode, selectWebChannel } from 'library/store/global/selector';
import { selectRedirectResult } from 'library/store/ui/selectors';
import { serviceRequest } from 'library/store/payment/service-request';
import { fetchData as fetchPaymentMethods } from './index';
import get from 'lodash.get';
import { pageLoading } from 'library/store/ui/actions';

function getAddressPayload( address ){

  const {
    city,
    country,
    state: stateOrProvince,
    postalCode,
    streetName: street,
    additionalStreetInfo: houseNumberOrName
  } = address;

  return {
    city,
    country,
    houseNumberOrName,
    postalCode,
    stateOrProvince,
    street
  };

}

export function* makeAffirmPayment( actions ) {

  try {
    yield put( pageLoading( true ) );
    yield call( fetchPaymentMethods, { payload: { params: 'affirm' } } );

    const { payload: { onSuccess } = {} } = actions;
    const countryCode = yield select( selectCountry );
    const currency = yield select( selectCurrencyCode );
    const lineItems = yield select( selectStandardItemPayload );
    const channel = yield select( selectWebChannel );
    const paymentID = localStorage.getItem( 'affirmVersionId' );
    const version = localStorage.getItem( 'affirmVersion' );
    const cartReferenceNum = localStorage.getItem( 'cartID' );
    const shopperReferenceVal = `${ new Date().getTime() }${ cartReferenceNum }`;
    const totalAmount = yield select( selectStandardItemGrossAmt );
    const billingAddress = yield select( selectBillingAddress );
    const shippingAddress = yield select( selectShippingAddress );

    const { firstName, lastName, phone, email } = billingAddress;

    const actionsValue = {
      amount: {
        currency,
        value: totalAmount
      },
      billingAddress: getAddressPayload( billingAddress ),
      channel: 'Web',
      countryCode,
      deliveryAddress: getAddressPayload( shippingAddress ),
      lineItems,
      merchantAccount: 'BrevilleECOM',
      paymentMethod: {
        type: 'affirm'
      },
      reference: cartReferenceNum,
      returnUrl: window.location.href,
      shopperEmail: email,
      shopperName: {
        firstName,
        lastName
      },
      shopperReference: shopperReferenceVal,
      telephoneNumber: phone
    };
    const data = {
      version: Number( version ),
      actions: [
        {
          action: 'setCustomField',
          name: 'makePaymentRequest',
          value: JSON.stringify( actionsValue )
        }
      ]
    };

    const response = yield call( serviceRequest, { url: paymentID, data } );
    const paymentResonse = JSON.parse( get( response, 'custom.fields.makePaymentResponse', '' ) ) || {};

    if ( paymentResonse.action )onSuccess( paymentResonse.action );
    yield put( pageLoading( false ) );
  }
  catch ( error ){
    yield put( pageLoading( false ) );
    console.error( error );
  }
}

/**
 * This method is responsible for submitting additional detail
 * @returns {*}
 */
export function* confirmAffirmPayment(){

  try {
    const paymentID = localStorage.getItem( 'affirmVersionId' );
    const version = localStorage.getItem( 'affirmVersion' );
    const redirectResult = yield select( selectRedirectResult );

    if ( !redirectResult ) return null;

    const detailsObj = { details: { redirectResult } };

    const data = {
      version: 9,
      actions: [
        {
          action: 'setCustomField',
          name: 'submitAdditionalPaymentDetailsRequest',
          value: JSON.stringify( detailsObj )
        }
      ]
    };
    const response = yield call( serviceRequest, { url: paymentID, data } );
  }
  catch ( error ){
    console.error( error );
  }

}