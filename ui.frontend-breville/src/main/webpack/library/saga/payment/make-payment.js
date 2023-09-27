import { call, select, put } from 'redux-saga/effects';
import { serviceRequest } from 'library/store/payment/service-request';
import { selectTotalGrossAmt, selectBillingAddress, selectSubscriptionItemGrossAmt } from 'library/store/cart/selector';
import { selectPaymentId, selectPaymentDetail } from 'library/store/payment/selector';
import { selectRedirectResult } from 'library/store/ui/selectors';
import { setCardAuthorized, setMaskedCardDetails } from 'library/store/payment/actions';
import { fetchData as fetchCart } from '../cart';
import { pageLoading } from 'library/store/ui/actions';
import get from 'lodash.get';

export function* makePayment(){

  try {
    const paymentDetail = yield select( selectPaymentDetail );
    const redirectResult = yield select( selectRedirectResult );
    const {
      submitCreditCard,
      isValid,
      data: {
        paymentMethod: {
          encryptedCardNumber,
          encryptedExpiryMonth,
          encryptedExpiryYear,
          encryptedSecurityCode
        } = {}
      } = {} } = paymentDetail;

    if ( !submitCreditCard || !isValid ) return null;
    const centAmount = yield select( selectTotalGrossAmt );
    const subscriptionGross = yield select( selectSubscriptionItemGrossAmt );
    const billingAddress = yield select( selectBillingAddress );
    const paymentId = yield select( selectPaymentId );
    const referenceID = localStorage.getItem( 'cartID' );
    const { email } = billingAddress;
    const shopperReference = `${ new Date().getTime() }${ email }`;
    const paymentVersion = localStorage.getItem( 'paymentVersion' );

    const finalAmount = redirectResult ? subscriptionGross : centAmount;

    const data = {
      version: parseInt( paymentVersion ),
      additionalData: {
        allow3DS2: true
      },
      actions: [
        {
          action: 'setCustomField',
          name: 'makePaymentRequest',
          value: `{
                "amount": {"currency": "USD","value": ${ finalAmount }},
                "reference": "${ referenceID }",
                "paymentMethod": {"type": "scheme","encryptedCardNumber": "${ encryptedCardNumber }","encryptedExpiryMonth": "${ encryptedExpiryMonth }","encryptedExpiryYear": "${ encryptedExpiryYear }","encryptedSecurityCode": "${ encryptedSecurityCode }"},
                "returnUrl": "https://www.breville.com","merchantAccount": "BrevilleECOM","shopperReference": "${ shopperReference }","shopperEmail": "${ email }",
                "recurring": {"contract": "RECURRING"},
                "additionalData": {"authorisationType": "PreAuth"}
            }`
        }
      ]
    };

    const response = yield call( serviceRequest, { url: paymentId, data } );
    yield call( fetchCart );
    yield put( pageLoading( true ) );
    const rawResponse = get( response, 'custom.fields.makePaymentResponse', '' );
    const maskedCardDetailsRawResponse = get( response, 'custom.fields.maskedCardDetails', '' );
    const parsed = JSON.parse( rawResponse ) || {};
    const maskedCardDetailsParsed = JSON.parse ( maskedCardDetailsRawResponse ) || {};
    const isAuthorized = parsed.resultCode === 'Authorised';
    yield put( setCardAuthorized( isAuthorized ) );
    yield put ( setMaskedCardDetails( maskedCardDetailsParsed ) );
  }
  catch ( e ){
    console.error( e );
  }
}