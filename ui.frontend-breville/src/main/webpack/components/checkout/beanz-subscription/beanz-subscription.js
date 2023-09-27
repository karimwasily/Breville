import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { any, string, number, func } from 'prop-types';
import Button from 'xps-react/core/button';
import SubscriptionSummary from 'components/Cart/SubscriptionSummary';
import { BEANZ_SUBSCRIPTION_BTN_ID } from 'components/checkout/constants';
import { selectIsValid } from 'library/store/checkout/selector';
import { selectBeanzSubscription } from 'library/store/cart/selector';
import CardSummary from '../payment/credit-card/card-summary';
import CreditCard from '../payment/credit-card';
import { useDispatch } from 'react-redux';
import { setCurIndex, setIsValid, setIsDirty } from 'library/store/checkout/actions';
import { fetchRequest } from 'library/store/payment/actions';

const BeanzSubscription = ( { isOpen, index, onNext } ) => {

  const nextLabel = 'Next: Review Order';
  const dispatch = useDispatch();
  const isPaymentValid = useSelector( selectIsValid );
  const subscriptionData = useSelector( selectBeanzSubscription );
  const { variant: { images = [] } = {}, name, discounted, price, totalPrice, originalTotalPrice, quantity, id } = subscriptionData;

  function onSubmit( data ) {
    onNext( index );
  }

  useEffect( () => {
    if ( isOpen ) {
      dispatch( setCurIndex( index ) );
      dispatch( fetchRequest( 'subscription' ) );
    }
  }, [isOpen] );

  if ( !isOpen ) {
    return <CardSummary />;
  }

  return (
    <div className='form' style={{ position: 'relative' }}>
      <div className='cmp-beanz-subscription'>
        <div className='cmp-beanz-subscription__description'>
          <p>Since you are using Affirm to finance your machine, you must pay for your Beanz Trial Subscription separately with a credit card. Your card will be charged per shipment.</p>
          <p>You are committing to a trial subscription of 12 bags of beans, when your trial subscription ends, a regular Beanz subscription will begin. Manage or cancel your subscription any time on Beanz.com.</p>
        </div>
        <SubscriptionSummary
          teaser
          title='Beanz Trial Subscription - 20% off'
          thumbnail={ images[0]?.url }
          imageAlt={ name }
          coffee={ name }
          quantity={ `12 Bags Total, ${ quantity } bags (First Shipment)` }
          oldPrice={ price }
          newPrice={ discounted }
          readonly
          productId={ id }
        />
        <div className='cmp-beanz-subscription__creditcard-wrapper display-flex flex-center py-40'>
          <CreditCard containerId='beanz-subscription' stepIndex={ index } hidePaymentInfo />
        </div>
        <Button
          className='form-button mt-20'
          id={ BEANZ_SUBSCRIPTION_BTN_ID }
          disabled={ !isPaymentValid[index] }
          onClick={ onSubmit }
        >{ nextLabel }</Button>
      </div>
    </div>
  );
};

BeanzSubscription.propTypes = {
  isOpen: any,
  index: number,
  nextLabel: string,
  onNext: func
};

export default BeanzSubscription;
