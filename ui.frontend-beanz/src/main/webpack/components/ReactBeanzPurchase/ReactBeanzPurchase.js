import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// LOADER
import { BeanzSpinner } from '../ReactCart/BeanzSpinner';

// REDUX IMPORTS
import { viewSubscription, viewOrder } from 'library/store/subscription/actions';
import { selectIsLoading, selectSubscriptions, selectOrders } from 'library/store/subscription/selector';

// COMPONENTS
import Orders from './orders.js';
import Subscription from './subscription';
import CoffeeSelection from './coffeeSelection.js';

import { withAem } from 'library/utils/withAem';
import { object } from 'prop-types';

const ReactBeanzPurchase = ( { aemData } ) => {

  const [subscriptionData, setSubscriptionData] = useState();
  const [orderData, setOrderData] = useState();
  const isLoading = useSelector( selectIsLoading );
  const subscriptionSelector = useSelector( selectSubscriptions );
  const orderSelector = useSelector( selectOrders );

  const [toggle, setToggle] = useState( true );
  const dispatch = useDispatch();


  useEffect( ()=>{
    if ( subscriptionSelector.length > 0 ) {
      setSubscriptionData( subscriptionSelector );
    }
    if ( orderSelector.length > 0 ) {
      setOrderData( orderSelector );
    }
  }, [subscriptionSelector, orderSelector] );

  const togglePurchase = ()=> {
    setToggle( true );
    dispatch( viewOrder() );
  };

  const toggleSubscription = ()=> {
    setToggle( false );
    dispatch( viewSubscription() );
  };

  const [url, setUrl] = useState( window.location.href );

  useEffect( () => {
    const lastPart = url.split( '#' ).pop();
    if ( lastPart == 'subscriptions' ) {
      toggleSubscription();
    }

    else {
      togglePurchase();
    }

  }, [url] );

  return (

    <div className='cmp-purchase__root'>
      { isLoading && <BeanzSpinner /> }
      <div className='cmp-container-purchase__header'>
        <h1 className='cmp-text-purchase__header--h1'>{ aemData.purchasesHeading }</h1>
        <ul className='cmp-text-purchase__header--tab-ul'>
          <li className='cmp-text-purchase__header--tab-li'><a href='#orders' className={ `cmp-text-purchase__header--tab-item ${ toggle ? 'active' : '' }` } onClick={ togglePurchase }>{ aemData.ordersHeading }</a></li>
          <li className='cmp-text-purchase__header--tab-li'><a href='#subscriptions' className={ `cmp-text-purchase__header--tab-item ${ toggle ? '' : 'active' }` } onClick={ toggleSubscription }>{ aemData.subscriptionsHeading }</a></li>
        </ul>
      </div>
      {
        toggle ?
        ( orderData?.length > 0 &&
          <Fragment >
            <Orders />
          </Fragment>
          )
        :
        ( subscriptionData?.length > 0 ) && subscriptionData.map( ( subscription, index ) => {
          return (
            <Fragment key={ index } >
              <Subscription 
                subscription={ subscription } 
                aemData={aemData}/>
            </Fragment>
          );
        } )
      }
      <CoffeeSelection
        coffeeselectionheading = { aemData.coffeeSelectionHeading }
        coffeeselectiondescription = { aemData.coffeeSelectionDescription }
        quizheading = { aemData.quizHeading }
        quizdescription = { aemData.quizDescription }
        quizpagelink = { aemData.quizPageLink }
        beanzheading = { aemData.beanzHeading }
        beanzdescription = { aemData.beanzDescription }
        beanzpagelink = { aemData.beanzPageLink }
        beanzimagepath = { aemData.beanzImagePath }
        discoverybeanzheading = { aemData.discoveryBeanzHeading }
        discoverybeanzdescription = { aemData.discoveryBeanzDescription }
        discoverybeanzpagelink = { aemData.discoverybeanzPageLink }
        discoverybeanzimagepath = { aemData.discoveryBeanzImagePath }
        popupbtnlbl = { aemData.popupBtnLbl }
      />
      
    </div>
  );

};

ReactBeanzPurchase.propTypes = {
  aemData: object
};

export default withAem( ReactBeanzPurchase );
