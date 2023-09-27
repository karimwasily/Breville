import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdyenCheckout from '@adyen/adyen-web';
import { makeAffirmPayment } from 'library/store/payment/actions';
import '@adyen/adyen-web/dist/adyen.css';
import Button from 'components/shared-ui/button';

export default () => {

  const dispatch = useDispatch();

  function handleOnSubmit( state, component ) {
    dispatch( makeAffirmPayment( { onSuccess: component.handleAction } ) );
  }

  const configuration = {
    countryCode: 'US',
    locale: 'en_US',
    environment: 'test', // live environment - https://docs.adyen.com/online-payments/components-web#testing-your-integration.
    clientKey: 'test_HYU6BYDF4BCZ3PUGTSO77MTXQUY67KG6',
    showPayButton: false,
    setStatusAutomatically: false
  };

  const checkout = new AdyenCheckout( configuration );

  const affirmDropin = checkout.create( 'affirm', {
    countryCode: 'US', // the country code from the
    // `/paymentMethods` request
    visibility: { // Optional configuration
      personalDetails: 'hidden', // "hidden", // These fields will not appear on the payment form.
      billingAddress: 'hidden', // These fields will appear on the payment form, //readOnly
      // but the shopper can't edit them.
      deliveryAddress: 'hidden' // These fields will appear on the payment form,
      // and the shopper can edit them.
      // This is the default behavior.
    },
    onSubmit: handleOnSubmit
  } );

  function affirmHandleSubmit(){
    affirmDropin.submit();
  }

  useEffect( ()=>{
    affirmDropin.mount( '#affirm-container' );
  }, [] );

  return (
    <div className='affirm-container'>
      <p>Finance your Breville machine purchase with convenient monthly payments!</p>
      <p>NOTE: Affirm can only be used to finance your machine purchase. A credit card will be required to purchase your <b>Beanz Trial Subscription</b> (first coffee shipment) separately, after you setup your Affirm payment.</p>
      <p>You will be taken to the Affirm website to setup your payment plan, and then re-directed back here to finalize your Beanz Trial Subscription.</p>
      <div id='affirm-container'>
        { /* Custom Button Buy with Affirm */ }
        <Button className='adyen-checkout__button' textType='bold' onClick={ affirmHandleSubmit }> Buy with&nbsp;<span className='affirm-svg'></span></Button>
      </div>
    </div>
  );
};

