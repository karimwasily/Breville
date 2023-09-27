import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdyenCheckout from '@adyen/adyen-web';
import { setPaymentDetail, setCardInfo } from 'library/store/payment/actions';
import { setCurIndex, setIsValid, setIsDirty, setData } from 'library/store/checkout/actions';
import { selectPaymentId, selectResponseParsed } from 'library/store/payment/selector';
import { selectBeanzFormattedGrossPrice } from 'library/store/cart/selector';
import { selectTotalGrossFormatted } from 'library/store/cart/selector';
import '@adyen/adyen-web/dist/adyen.css';

export default ( { stepIndex, containerId = 'credit-cart-contaner', hidePaymentInfo } )=>{

  const dispatch = useDispatch();
  const paymentMethods = useSelector( selectResponseParsed );
  const totalAmount = useSelector( selectTotalGrossFormatted );
  const totalGrossAmount = useSelector( selectBeanzFormattedGrossPrice );
  function handleSubmit( data ){
    dispatch( setPaymentDetail( { submitCreditCard: true, ...data } ) );
  }

  function handleChange( data ){
    dispatch( setPaymentDetail( { submitCreditCard: true, ...data } ) );
    if ( data.isValid ){
      dispatch( setIsValid( true, stepIndex ) );
    }
  }

  function handleBrandChange( cardData ){
    dispatch( setCardInfo( cardData ) );
  }

  useEffect( ()=>{

    const configuration = {
      locale: 'en_US',
      environment: 'test', // live environment - https://docs.adyen.com/online-payments/components-web#testing-your-integration.
      clientKey: 'test_HYU6BYDF4BCZ3PUGTSO77MTXQUY67KG6',
      showPayButton: false,
      setStatusAutomatically: false,
      paymentMethodsResponse: paymentMethods,
      onSubmit: handleSubmit,
      onChange: handleChange
    };
    const checkout = new AdyenCheckout( configuration );
    const card = checkout.create( 'card', {
      hasHolderName: true,
      holderNameRequired: true,
      positionHolderNameOnTop: true,
      onBrand: handleBrandChange
    } ).mount( `#${ containerId }` );
    window.card = card;
  }, [paymentMethods] );
  return (
    <div id={ containerId } className='credit-card-container'>
      { !hidePaymentInfo && <p>You will be charged { totalAmount } now and { totalGrossAmount } for each subsequent Beanz order.</p> }
    </div>
  );
};