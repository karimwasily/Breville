import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'xps-react/core/button';
import { Link } from 'react-router-dom';
import { getAlgoliaProductsMeta } from '../helpers';

const OrderSummary = ( { order } ) => {
  const { t } = useTranslation();

  // Sorted items in descended based on the item total price
  const sortedOrderItems = [].concat( order?.Items ).sort( ( a, b ) => ( a.TotalPrice < b.TotalPrice ? 1 : -1 ) );
  const [orderItems, setOrderItems] = useState( sortedOrderItems );

  // Algolia logic For fetching item images
  useEffect( () => {
    // Needed mounted to prevent memory leakage
    let mounted = true;

    getAlgoliaProductsMeta( sortedOrderItems ).then( ( newSortedOrderItems ) => {
      if ( mounted ) {
        setOrderItems( newSortedOrderItems );
      }
    } );

    return () =>{
      mounted = false;
    };
  }, [order] );

  // End Algolia logic

  // Please replace dummy track number with the dynamically coming track number
  const dummyTrackingNumber = '12345';
  const totalPrice = order?.OrderGrandTotal?.toFixed( 2 );
  const MAX_IMAGES = 3;
  const imagesToHide = sortedOrderItems.length - MAX_IMAGES;
  const multipleItemCheck = sortedOrderItems.length > 1;

  return (
    <div className='my-orders__order-summary'>
      <div className='my-order'>
        <div className={ multipleItemCheck ? 'order-detail' : 'order-detail-single' }>
          { orderItems?.slice( 0, MAX_IMAGES ).map( ( item, index ) =>
            <img key={ index } className={ multipleItemCheck ? 'order-image' : 'order-single-image' } src={ item?.Meta?.orderImages } alt={ item?.ItemDescription } ></img>
          ) }
          { imagesToHide > 0 ?
            <Link to={ `/my-orders/${ order.OrderNumber }` } className='images-button'>+{ imagesToHide }</Link> : '' }
          <div>
            { !multipleItemCheck ? <p className='order-name'>{ sortedOrderItems[0].ItemDescription } </p> : '' }
            { !multipleItemCheck && sortedOrderItems[0]?.IsSubscriptionItem ?
              <p className='order-name'>
                { t( 'eh-text-subscription' ) }
                <span className='subscription-icon' />
              </p>
              : '' }
          </div>
        </div>
        <div className='order-tracking-number'>
          <p className='tracking-number'><span className='label-font-weight-bold'>{ t( 'eh-label-tracking-number' ) }: </span></p>
          <p className='tracking-number'>{ dummyTrackingNumber }</p>
        </div>
      </div>
      <div className='order-total'>
        <div className='cmp-button'>
          <Button
            disabled={ false }
            children={ t( 'eh-button-view-details' ) }
            href={ `/my-orders/${ order.OrderNumber }` }
          />
        </div>
        <div className='cmp-text'>
          <p className='text'>{ t( 'eh-label-order-total' ) }:
            <span className='label-font-weight-bold'>  { t( 'eh-label-dollar-sign' ) + totalPrice }</span></p>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  order: object
};

export default OrderSummary;