import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import ItemDetails from './item-details';
import DiscountedItem from './components/discounted-item';
import { getAlgoliaProductsMeta } from '../helpers';

const ShipmentDetails = ( { order } ) => {
  const { t } = useTranslation();
  const [shipment, setShipment] = useState( order );

  // Algolia logic For fetching item images
  useEffect( () => {
    // Needed mounted to prevent memory leakage
    let mounted = true;
    const sortedOrderItems = [].concat( order?.Items ).sort( ( a, b ) => ( a.TotalPrice < b.TotalPrice ? 1 : -1 ) );

    getAlgoliaProductsMeta( sortedOrderItems ).then( ( newSortedOrderItems ) => {
      if ( mounted ) {
        const clonedOrder = Object.assign( {}, order );
        clonedOrder.Items = newSortedOrderItems;
        setShipment( clonedOrder );
      }
    } );

    return () =>{
      mounted = false;
    };
  }, [order] );

  const shipppedItems = shipment?.Items.filter( ( orderItem ) => orderItem?.ItemStatus?.toUpperCase() === t( 'eh-label-shipment-status-shipped' ).toUpperCase() );
  const processingItems = shipment?.Items.filter( ( orderItem ) => orderItem?.ItemStatus?.toUpperCase() === t( 'eh-label-shipment-status-processing' ).toUpperCase() );

  const shippedItemsList = shipppedItems?.map( ( item, idx ) =>{
    // These values will be coming dynamically but we need orderItemGroupId === 'MR' Meta field check to pass them
    let coffeeName = '';
    let isCoffee = false;
    if ( item?.Meta?.orderItemGroupId === 'MR' ){
      isCoffee = true;
      coffeeName = `${ item?.VendorName || '' } ${ item?.ItemDescription || '' }`;
    }

    if ( item.Discount > 0 ){
      return ( <DiscountedItem key={ idx } image={ item?.Meta?.orderImages } name={ item?.ItemDescription } discountPercentage={ item.DiscountPercentage } price={ item.TotalPrice } discountPrice={ item.Discount } coffeeName={ coffeeName } isSubscription={ item?.IsSubscriptionItem } isCoffee={ isCoffee } quantity={ item?.Quantity } /> );
    }
    else {
      return ( <ItemDetails item={ item } key={ idx } isCoffee={ isCoffee } /> );
    }
  } );

  const processingItemsList = processingItems?.map( ( item, idx ) =>{
    // These values will be coming dynamically but we need orderItemGroupId === 'MR' from Meta field check to pass them
    let coffeeName = '';
    let isCoffee = false;
    if ( item?.Meta?.orderItemGroupId === 'MR' ){
      isCoffee = true;
      coffeeName = `${ item?.VendorName || '' } ${ item?.ItemDescription || '' }`;
    }

    if ( item.Discount > 0 ){
      return ( <DiscountedItem key={ idx } image={ item?.Meta?.orderImages } name={ item?.ItemDescription } discountPercentage={ item.DiscountPercentage } price={ item.TotalPrice } discountPrice={ item.Discount } coffeeName={ coffeeName } isSubscription={ item?.IsSubscriptionItem } isCoffee={ isCoffee } quantity={ item?.Quantity } /> );
    }
    else {
      return ( <ItemDetails item={ item } key={ idx } isCoffee={ isCoffee } /> );
    }
  } );

  return (
    <div>
      {
       shipppedItems.length > 0 ?
         <div className='order-details-shipment'>
           <div className='order-details-shipment-strip'>
             <div className='shipment-count'>
               <p >{ t( 'eh-order-details-shipment-details-shipment' ) }</p>
               <p >{ t( 'eh-label-shipment-1' ) }</p>
               <p >{ t( 'eh-order-details-shipment-details-of' ) }</p>
               { processingItems.length > 0 ?
                 <p >{ t( 'eh-label-shipment-2' ) }
                 </p>
                 :
                 <p >{ t( 'eh-label-shipment-1' ) }
                 </p>
               }
             </div>
             <div className='shipment-status'>
               <p><span className='label-font-weight-bold'>{ t( 'eh-label-order-status' ) }: </span><span className='label-font-weight-bold-green'> { t( 'eh-label-shipment-status-shipped' ) } </span></p>
             </div>
           </div>
           { shippedItemsList }
         </div>
         : ''
      }
      { processingItems.length > 0 ?
        <div className='order-details-shipment'>
          <div className='order-details-shipment-strip'>
            <div className='shipment-count'>
              <p >{ t( 'eh-order-details-shipment-details-shipment' ) }</p>
              { shipppedItems.length > 0 ? <p >{ t( 'eh-label-shipment-2' ) }</p> : <p >{ t( 'eh-label-shipment-1' ) }</p>
              }
              <p >{ t( 'eh-order-details-shipment-details-of' ) }</p>
              {
                shipppedItems.length > 0 ? <p >{ t( 'eh-label-shipment-2' ) }</p> : <p >{ t( 'eh-label-shipment-1' ) }</p>
              }
            </div>
            <div className='shipment-status'>
              <p><span className='label-font-weight-bold'>{ t( 'eh-label-order-status' ) }: </span><span className='label-font-weight-bold-orange'> { t( 'eh-label-shipment-status-processing' ) } </span></p>
            </div>
          </div>
          { processingItemsList }
        </div>
       : ''
      }
      <div className='order-total'>
        <p className='price'>{ t( 'eh-order-details-heading-order-total' ) }: <span className='value'>{ t( 'eh-label-dollar-sign' ) }{ order?.OrderGrandTotal?.toFixed( 2 ) }</span></p>
      </div>
    </div>
  );
};

ShipmentDetails.propTypes = {
  order: object.isRequired
};

export default ShipmentDetails;