import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectSubscriptionById, selectIsError } from 'library/store/mybreville/selector';
import { getSubscriptionFrequency } from '../utility';
import EditSubscriptionForm from './components/edit-subscription-form';
import { setPauseSubscriptionDates, pauseASubscription, setNotificationText } from 'library/store/mybreville/actions';

import SubscriptionBox from '../components/subscription-box';

const EditSubscription = ( props ) => {
  const dispatch = useDispatch();
  const subscriptionIdParam = props?.match?.params?.subscriptionId || '',
    subscription = useSelector( selectSubscriptionById( subscriptionIdParam ) ),
    history = useHistory(),
    { t } = useTranslation(),
    { unit, interval } = getSubscriptionFrequency( subscription ),
    status = subscription?.status?.toLowerCase(),
    frequency = ( interval === '1' ) ? t( `eh-text-frequency-${ unit }-1` ) : [t( 'eh-text-frequency-every' ), interval, t( `eh-text-frequency-${ unit }` )].join( ' ' );
  const isError = useSelector( selectIsError );
  /**
   * Handles if user provides subscriptionId in the URL param, but the subscription does not exist
   */
  useEffect( () => {
    dispatch( setPauseSubscriptionDates( { standingOrderId: subscription?.standingorderid } ) );

    if ( subscriptionIdParam && !subscription ) {
      history.push( '/my-subscriptions' );
    }

  }, [] );
  function onSubscriptionUpdated() {
    history.push( '/my-subscriptions' );
  }

  function handleSubmit( values ) {
    let splitString = [];
    if ( values?.timeframe ){
      splitString = values?.timeframe.split( '+' );
    }
    if ( splitString?.length && values?.timeframe ){
      dispatch( pauseASubscription( {
        standingOrderId: subscription?.standingorderid,
        iterationNumber: splitString[1],
        pauseDate: splitString[0],
        successCallback: onSubscriptionUpdated
      } ) );
    }
    dispatch( setNotificationText( t ( !isError ? 'eh-message-subsciption-edited' : 'eh-message-password-change-failure' ) ) );

  }

  function doCancelEdit() {
    history.push( '/my-subscriptions' );
  }

  return (
    <div className='mybreville__edit_subscription'>
      <div className='mybreville__edit_subscription__page-title'>
        {
          !!status && (
          <span className={ `status-label status--${ status }` }>
            { t( `eh-status-${ status }` ) }
          </span>
          )
        }
      </div>
      <SubscriptionBox className='mybreville__edit_subscription-box' subscription={ subscription } />
      <section>
        <h4 className='cmp-mybreville__section-header'>{ t( 'eh-text-subscription-details' ) }</h4>
        <p>{ t( 'eh-text-subscription-frequency' ) }: { frequency }</p>
      </section>
      <EditSubscriptionForm data={ subscription } onFormCancel={ doCancelEdit } onFormSubmit={ handleSubmit } onSubscriptionUpdated={ onSubscriptionUpdated } />
    </div>
  );
};

EditSubscription.propTypes = {
};

export default withRouter( EditSubscription );
