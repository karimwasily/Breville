import React, { useEffect } from 'react';
import { number, any, func } from 'prop-types';
import { setCurIndex, setIsValid, setIsDirty, setData } from 'library/store/checkout/actions';
import { selectIsValid } from 'library/store/checkout/selector';
import { PAYMENT__BTN_ID } from 'components/checkout/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaymentMethods, selectIsLoading, selectActivePayment } from 'library/store/payment/selector';
import { fetchRequest, setActivePayment } from 'library/store/payment/actions';
import { Accordion, Panel } from 'components/shared-ui/accordion';
import Skeleton from 'xps-react/core/skeleton';
import Affirm from './affirm';
import Paypal from './paypal';
import CreditCard from './credit-card';
import PaymentSummary from './payment-summary';
import CreditCardHeader from './credit-card/credit-card-header';
import AffirmSvg from 'resources/svgs/affirm.svg';
import PaypalSvg from 'resources/svgs/pay-pal-large.svg';

const AffirmHeader = () => (
  <>
    <span>Pay with Affirm</span>
  </>
);

const paymentList = {
  'Credit Card': { Comp: CreditCard, containerId: 'credit-card-container', header: 'Pay with Credit Card', extra: <CreditCardHeader /> },
  Affirm: { Comp: Affirm, header: <AffirmHeader />, extra: <AffirmSvg /> },
  PayPal: { Comp: Paypal, header: 'Pay with Paypal', extra: <PaypalSvg /> }
};

const Payment = ( props ) => {
  const { index, isOpen, onNext } = props;
  const dispatch = useDispatch();
  const paymentMethods = useSelector( selectPaymentMethods );
  const isPaymentValid = useSelector( selectIsValid );
  const activePayment = useSelector( selectActivePayment );
  const isSubscription = true;
  const isLoading = useSelector( selectIsLoading );

  const nextLabel = activePayment === 'Affirm' ? 'Next: Set up Beanz Subscription' : 'Next: Review Order';

  function onClickHandler() {
    // dispatch( setData( { payment: { status: 'successfull' } } ) );
    onNext( index );
  }

  useEffect( () => {
    if ( isOpen ){
      dispatch( setCurIndex( index ) );
      dispatch( fetchRequest() );
    }
  }, [isOpen] );

  function handlePanelChange( current ){
    dispatch( setActivePayment( current ) );
  }


  if ( !isOpen ) {
    return ( <PaymentSummary /> );
  }

  if ( isLoading ) return <Skeleton height={ 100 } count={ 3 } />;

  return (
    <>
      <div className='payment-selection'>
        <h3 className='payment-selection__title'>Payment Method</h3>
        <Accordion onChange={ handlePanelChange }>
          { Object.keys( paymentList ).map( ( each )=>{
          const current = paymentMethods[each];
          if ( !current ) return null;
          const { Comp, header, extra, containerId } = paymentList[each];
          return ( <Panel key={ each } header={ header } showArrow={ false } extra={ extra }>
            <Comp key={ each } paymentData={ current } stepIndex={ index } containerId={ containerId } onNext={ onNext } />
          </Panel> );
        } ) }
        </Accordion>
      </div>
      <button
        className='form-button'
        onClick={ onClickHandler }
        id={ PAYMENT__BTN_ID }
        disabled={ !isPaymentValid[index] }
      >{ nextLabel }</button>
    </>
  );
};

Payment.propTypes = {
  index: number,
  isOpen: any,
  onNext: func
};

export default Payment;
