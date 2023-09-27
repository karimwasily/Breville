import React, { useState } from 'react';
import SubscriptionNoProduct from '../mybreville/components/subscription-no-product';
import { selectMySubscriptions, selectGeneralAemData } from 'library/store/mybreville/selector';
import { useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import SubscriptionList from './components/subscription-list';
import { SUBSCRIPTION_STATUS } from '../constants';
import { ActionModal } from 'xps-react/core';
import queryString from 'query-string';

const MySubscriptions = () => {

  const { t } = useTranslation();
  const mySubscriptions = useSelector( selectMySubscriptions );
  const [showRedirectBeanzSubModal, setShowRedirectBeanzSubModal] = useState( false ),
    [beanzEditUrl, setBeanzEditUrl] = useState( '' ),
    generalAemData = useSelector( selectGeneralAemData ),
    beanzUrl = generalAemData?.rootBeanzUrl;


  const activeSubscriptions = [];
  const pausedSubscriptions = [];
  const activePausedSubscriptions = [];
  const cancelledsubscriptions = [];

  if ( mySubscriptions?.length ){
    mySubscriptions?.map( ( subscription )=>{
      if ( subscription?.status?.toUpperCase() === SUBSCRIPTION_STATUS.active.toUpperCase() ){
        activeSubscriptions.push( subscription );
        activePausedSubscriptions.push( subscription );
      }
      else if ( subscription?.status?.toUpperCase() === SUBSCRIPTION_STATUS.paused.toUpperCase() ) {
        pausedSubscriptions.push( subscription );
        activePausedSubscriptions.push( subscription );
      }
      else if ( subscription?.status?.toUpperCase() === SUBSCRIPTION_STATUS.cancelled.toUpperCase() ) {
        cancelledsubscriptions.push( subscription );
      }
    } );
  }

  // Sorted Subscriptions in descending order by date
  let sortedActiveSubscriptions = [];
  if ( activeSubscriptions?.length > 0 ){
    sortedActiveSubscriptions = [].concat( activeSubscriptions ).sort( ( a, b ) => ( a?.nextdeliverydate < b?.nextdeliverydate ? 1 : -1 ) );
  }
  let sortedPausedSubscriptions = [];
  if ( pausedSubscriptions?.length > 0 ){
    sortedPausedSubscriptions = [].concat( pausedSubscriptions ).sort( ( a, b ) => ( a?.nextdeliverydate < b?.nextdeliverydate ? 1 : -1 ) );
  }
  let sortedCancelledsubscriptions = [];
  if ( cancelledsubscriptions?.length > 0 ){
    sortedCancelledsubscriptions = [].concat( cancelledsubscriptions ).sort( ( a, b ) => ( a?.nextdeliverydate < b?.nextdeliverydate ? 1 : -1 ) );
  }

  const checkForActiveSubscriptions = ( activePausedSubscriptions && activePausedSubscriptions.length > 0 );

  function onBeanzSubscriptionEdit( subscriptionData ) {
    const { standingorderid: subscriptionId } = subscriptionData;

    if ( subscriptionId && beanzUrl ) {
      const redirUrl = queryString.stringifyUrl( {
        url: [beanzUrl, 'purchases.html'].join( '/' ),
        query: {
          standing_order_id: subscriptionId
        },
        fragmentIdentifier: 'subscriptions'
      } );
      setBeanzEditUrl( redirUrl );
      setShowRedirectBeanzSubModal( true );
    }
  }

  function hideBeanzRedirectModal() {
    setShowRedirectBeanzSubModal( false );
  }

  function doBeanzRedirectModal() {
    if ( !beanzEditUrl ) {
      console.log( 'Missing configuration for beanz URL' );
      return;
    }
    // Using window.open for new window
    window.open( beanzEditUrl, '_blank', 'noopener noreferrer' );
  }

  return (
    <div className='mybreville__my_subscriptions'>
      { checkForActiveSubscriptions ? '' :
      <p className='no-subscriptions'>{ t( 'eh-label-no-subscriptions' ) }</p>
      }
      <p className='subscription-strip'>{ t( 'eh-label-current-subscriptions' ) }
        <span className='subscription-count'>{ activePausedSubscriptions?.length }</span>
      </p>
      {
      checkForActiveSubscriptions ?
        <div>
          <SubscriptionList subscriptions={ sortedActiveSubscriptions } onBeanzSubscriptionEdit={ onBeanzSubscriptionEdit } />
          <SubscriptionList subscriptions={ sortedPausedSubscriptions } onBeanzSubscriptionEdit={ onBeanzSubscriptionEdit } />
        </div>
       :
        <div>
          <SubscriptionNoProduct />
        </div>
      }
      <p className='subscription-strip'>{ t( 'eh-label-past-subscriptions' ) }
        <span className='cancel-subscription-count'>{ cancelledsubscriptions?.length }</span>
      </p>
      <SubscriptionList subscriptions={ sortedCancelledsubscriptions } onBeanzSubscriptionEdit={ onBeanzSubscriptionEdit } />

      <ActionModal isModalOpen= { showRedirectBeanzSubModal }
        title={ t( 'eh-button-subscriptions-edit' ) }
        cancelText={ t( 'eh-button-cancel' ) }
        onCancel={ hideBeanzRedirectModal }
        onModalClosed={ hideBeanzRedirectModal }
        ctaText={ t( 'eh-edit-on-urlname', { urlname: 'Beanz' } ) }
        onCta={ doBeanzRedirectModal }
      >
        <Trans i18nKey='eh-redirect-manage-subscription'
          values={{
              urlname: 'Beanz.com'
            }}
          components={ [(
              // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a key={ 1 } className='external-link' href={ beanzUrl } target='_blank' rel='noopener noreferrer' />
            )] }
        />
      </ActionModal>
    </div>
  );
};

MySubscriptions.propTypes = {

};

export default MySubscriptions;
