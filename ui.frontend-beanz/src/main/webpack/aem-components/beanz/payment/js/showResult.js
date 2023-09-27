import { showErrorModal } from '../../errormodal/js/errormodal';
import { analyticsData } from 'xps-utils/analytics';
const analytics = analyticsData();

export function handlePaymentResponse( response, pageObjUrl, tncCheckbox, makePaymentElem, getPaymentMethod ) {
  const isAuthorized = response.resultCode === 'Authorised';
  if ( isAuthorized ) {
    analytics.updateConfirmationData( {
      info: {
        transactionId: '',
        paymentMethod: response?.additionalData?.paymentMethod ? response?.additionalData?.paymentMethod : 'Paypal',
        status: 'confirmed'
      }
    } );
    analytics.updateCheckoutLocalStorage();
    window.location.href = `${ pageObjUrl.getAttribute( 'data-confirmationpage' ) }.html`;
  }
  else {
    showErrorModal( '.error-checkout-payment' );
    if ( tncCheckbox ) tncCheckbox.checked = false;
    if ( makePaymentElem ) makePaymentElem.classList.add( 'disabled' );
    if ( getPaymentMethod ) getPaymentMethod();
  }
}