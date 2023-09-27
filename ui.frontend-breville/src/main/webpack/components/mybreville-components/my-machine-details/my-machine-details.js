import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { capitalize } from 'xps-utils/format';
import { tutorialData } from '../mybreville/mock-data'; // using until sfdc data becomes available
import { selectUserProducts, selectMySubscriptions } from 'library/store/mybreville/selector';
import { ORDER_GROUP_ID, TUTORIAL_VIDEO_URL } from '../constants';
import { searchParams } from 'xps-utils/misc';
import { productNameConversion } from 'components/mybreville-components/mybreville/helper';

import MyProductSupport from './components/my-product-support';
import MachineDetails from './components/machine-details';
import MyProductTutorials from './components/my-product-tutorials';
import VideoPlayer from './components/video-player';
import VideoModal from './components/video-modal';


const frequencyLabel = ( quantity, msg, interval, unit ) => {
  return `${ quantity } ${ msg } ${ interval || '' } ${ String( unit ).toLowerCase() || '' }`;
};

const MyMachineDetails = ( ) => {
  const { t } = useTranslation();
  const [productNumber, setProductNumber] = useState( );
  const [openVideoSubModal, setOpenVideoSubModal] = useState( false );
  const [videoSrc, setVideoSrc] = useState( '' );

  function hideVideoSubscriptionModal() {
    setOpenVideoSubModal( false );
  }

  function handleChange( videoId ){
    setOpenVideoSubModal( true );
    setVideoSrc( TUTORIAL_VIDEO_URL.replace( 'videoId', videoId ) );
  }

  function handleEnded(){
    setOpenVideoSubModal( false );
  }


  const history = useHistory();
  const { location } = history;
  const params = searchParams( location.search );
  useEffect( ()=>{
    if ( Object.keys( params ).length ){
      setProductNumber( params?.ProductNumber );
    }
  }, [location] );

  const userProducts = useSelector( selectUserProducts );
  const productDetails = userProducts?.find( ( prod ) => prod.Product_AX_Item_Number__c === productNumber ) || {};
  const mySubscriptions = useSelector( selectMySubscriptions );
  const subscriptionDataWithOrderDetails = Array.isArray( mySubscriptions ) && mySubscriptions?.length && mySubscriptions
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
  } ) || [];
  const isSubscriptions = !!subscriptionDataWithOrderDetails?.length;

  return (
    <div className='my-machine-details-page'>
      <MachineDetails
        productDetails={ productDetails }
        subscriptionDataWithOrderDetails = { subscriptionDataWithOrderDetails }
        isSubscriptions = { isSubscriptions }
      />
      <div className='my-breville-2-column'>
        <MyProductSupport productName={ productDetails?.Item_Description__c && productNameConversion( productDetails?.Item_Description__c, true ) || '' } />
      </div>
      <MyProductTutorials
        tutorialData={ tutorialData }
        handleOpenVideo={ handleChange }
      />
      <VideoModal isModalOpen= { openVideoSubModal }
        onModalClosed={ hideVideoSubscriptionModal }
      >
        <VideoPlayer src={ videoSrc } handleEnded={ handleEnded } ></VideoPlayer>
      </VideoModal>
    </div>
  );
};

MyMachineDetails.propTypes = {};

export default MyMachineDetails;
