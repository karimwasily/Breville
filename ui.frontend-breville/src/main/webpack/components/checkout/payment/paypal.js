import React, { useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { makePaypalPayment, submitDetails } from 'library/store/payment/actions';
import { useDispatch, useSelector } from 'react-redux';
import '@adyen/adyen-web/dist/adyen.css';

export default ( { onNext, stepIndex } )=>{
  const dispatch = useDispatch();

  const response = useSelector( ( state ) =>{
    return state;
  } );

  function handleSubmit( state, component ){
    const payload = {
      data: state.data,
      component: component
    };
    dispatch( makePaypalPayment( { ...payload, onSuccess: () => onNext( stepIndex ) } ) );
  }

  function handleCancel( data, component ){
    component.setStatus( 'ready' );
  }

  function handleError( error, component ){
    component.setStatus( 'ready' );
  }

  function handleAdditionalDetails( state, component ) {
    const payload = {
      data: JSON.stringify( state.data ),
      paymentId: response.payment.results.id
    };
    dispatch( submitDetails( { ...payload, onSuccess: () => onNext( stepIndex ) } ) );
  }

  useEffect( ()=>{
    const configuration = {
      locale: 'en_US',
      environment: 'test', // live environment - https://docs.adyen.com/online-payments/components-web#testing-your-integration.
      clientKey: 'test_HYU6BYDF4BCZ3PUGTSO77MTXQUY67KG6',
      showPayButton: true,
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      onError: handleError,
      onAdditionalDetails: handleAdditionalDetails
    };

    const checkout = new AdyenCheckout( configuration );
    const card = checkout.create( 'paypal', {
      hasHolderName: true,
      holderNameRequired: true
    } ).mount( '#paypal-container' );
    window.test = card;
  }, [] );
  return ( <div id='paypal-container'></div> );
};