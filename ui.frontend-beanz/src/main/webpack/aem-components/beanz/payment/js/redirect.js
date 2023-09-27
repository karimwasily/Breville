import request from 'api/request';
import { handlePaymentResponse } from './showResult';

export async function redirectResult() {
  const paymentID = localStorage.getItem( 'paymentID' );
  if ( paymentID ) {
    const urlParams = new URLSearchParams( window.location.search );
    const redirectParam = urlParams.get( 'redirectResult' );
    if ( redirectParam ) {
      const OrderConfirmationUrl = document.querySelector( '#checkoutComponent' );
      const paymentVersion = await request.post( 'GetPaymentVersion', {
        variables: { id: paymentID }
      } );

      const detailsObj = {
        details: {
          redirectResult: redirectParam
        }
      };
      await request.post( 'Payment', {
        url: paymentID,
        data: {
          version: paymentVersion.data.me.payment.version,
          actions: [
            {
              action: 'setCustomField',
              name: 'submitAdditionalPaymentDetailsRequest',
              value: JSON.stringify( detailsObj )
            }
          ]
        }
      } )
      .then( ( response ) => {
        const responseData = JSON.parse ( response?.custom?.fields?.submitAdditionalPaymentDetailsResponse ) || {};
        handlePaymentResponse( responseData, OrderConfirmationUrl, '', '', '' );
      } );
    }
  }
}
