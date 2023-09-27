import React from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from 'xps-utils/format';
import { useTranslation } from 'react-i18next';
import { selectMasterClasses, selectMySubscriptions, selectOrders, selectUserProducts } from 'library/store/mybreville/selector';
import MyProduct from './components/my-product';
import OrderComponent from './components/order-component';
import NoProductComponent from './components/no-product-component';
import Subscription from './components/subscription';
import { tutorialData } from './mock-data';
import { ORDER_GROUP_ID, DAYS_REQUIRED } from '../constants';
import { daysDeltaToToday } from './helper';
import MyMasterclassesEmpty from './components/my-masterclasses-empty';
import NoOrderComponent from './components/no-order-component';
import { orderBy } from 'lodash';

const frequencyLabel = ( quantity, msg, interval, unit ) => {
  return `${ quantity } ${ msg } ${ interval || '' } ${ String( unit ).toLowerCase() || '' }`;
};

const MyBreville = () => {
  const { t } = useTranslation();
  const masterClassesData = useSelector( selectMasterClasses );
  const orders = useSelector( selectOrders );
  const mySubscriptions = useSelector( selectMySubscriptions );
  const myProducts = useSelector( selectUserProducts );
  // Todo: Post MVP please use this variable to populate masterclasses data as ordering of masterclasses is done based on this
  const myMasterClassesData = '';

  // join the items field for all playlists of tutorial items. Will be moved to saga once APi is avail
  const { items = [] } = tutorialData;
  const joinedTutorialData = items.reduce( ( prev, current ) => prev.concat( current?.items ), [] );

  const subscriptionDataWithOrderDetails = Array.isArray( mySubscriptions ) && mySubscriptions?.length && orderBy( mySubscriptions
  ?.filter( ( subscription ) => String( subscription?.status ).toUpperCase() !== t( 'eh-status-cancelled' ).toUpperCase() )
  ?.map( ( subscription ) => {
    const frequencyDetails = subscription?.plandetails?.find( ( item )=>Boolean( item.selected ) );
    const meta = subscription?.Meta;
    const { unit, interval } = frequencyDetails || {};
    if ( meta?.orderItemGroupId === ORDER_GROUP_ID ){
      let itemFrequency = '';
      if ( frequencyDetails && subscription?.quantity ){
        itemFrequency = subscription?.quantity > 1 ? frequencyLabel( subscription?.quantity, t( 'eh-subscription-frequency-bags-every' ), interval, unit ) : frequencyLabel( subscription?.quantity, t( 'eh-subscription-frequency-bag-every' ), interval, unit );
      }
      return {
        ...subscription,
        ...meta,
        itemFrequency,
        itemName: t( 'eh-subscription-title-beanz-subscription' ),
        status: capitalize( subscription.status ),
        isBeanzProduct: meta?.orderItemGroupId === ORDER_GROUP_ID
      };
    }
    else {
      let itemFrequency = '';
      if ( frequencyDetails && subscription?.quantity ){
        itemFrequency = subscription?.quantity > 1 ? frequencyLabel( subscription?.quantity, t( 'eh-subscription-frequency-boxs-every' ), interval, unit ) : frequencyLabel( subscription?.quantity, t( 'eh-subscription-frequency-box-every' ), interval, unit );
      }
      return {
        ...subscription,
        ...meta,
        itemFrequency,
        itemName: meta?.orderImagesName,
        status: capitalize( subscription.status ),
        isBeanzProduct: meta?.orderItemGroupId === ORDER_GROUP_ID
      };
    }
  } ), ['status', 'nextdeliverydate'], ['asc', 'asc'] ) || [];

  const orderDate = Array.isArray( orders ) && orders.length > 0 &&
  orders.sort( ( a, b )=> Date.parse( b.OrderCreatedDate ) - Date.parse( a.OrderCreatedDate ) )[0]?.OrderCreatedDate;
  const displayRecentOrder = Math.round( daysDeltaToToday( orderDate ) ) <= DAYS_REQUIRED;
  const OrdersComponent = () =>{
    switch ( displayRecentOrder ){
      case true: return <OrderComponent orders={ orders } />;
      case false: return <NoOrderComponent />;
      default: return '';
    }
  };

  return (
    <div className='mybreville'>
      { displayRecentOrder ?
        <div className='my-breville-2-column'>
          <OrdersComponent />
          <MyMasterclassesEmpty />
        </div>
      : myMasterClassesData && myMasterClassesData.length &&
        <div className='my-breville-2-column hide-order'>
          <MyMasterclassesEmpty />
          <OrdersComponent />
        </div>
      }
      { ( subscriptionDataWithOrderDetails && !!subscriptionDataWithOrderDetails.length ) &&
        <Subscription subscriptionDataWithOrderDetails={ subscriptionDataWithOrderDetails } />
      }
      { myProducts?.length ?
        <MyProduct productList={ myProducts } tutorialData={ joinedTutorialData } masterClassesData={ masterClassesData } />
      :
        <NoProductComponent tutorialData={ joinedTutorialData } masterClassesData={ masterClassesData } />
      }
      { !subscriptionDataWithOrderDetails || !subscriptionDataWithOrderDetails.length &&
        <Subscription />
      }
      { ( !displayRecentOrder && !myMasterClassesData.length ) &&
      <div className='my-breville-2-column'>
        <MyMasterclassesEmpty />
        <OrdersComponent />
      </div>
      }
    </div>
  );
};

export default MyBreville;