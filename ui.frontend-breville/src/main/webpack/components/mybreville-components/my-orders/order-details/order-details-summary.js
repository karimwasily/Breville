import React, { useState } from 'react';
import { object } from 'prop-types';
import ShowHideHeaderStrip from './components/show-hide-header-strip';
import ShowHideShipping from './components/show-hide-shipping';
import ShowHidePayment from './components/show-hide-payment';
import ShowHideOrderSummary from './components/show-hide-order-summary';

function OrderDetailsSummary( { order } ) {
  const [showSummary, setShowSummary] = useState( false );

  let totalPrice = 0;
  let totalTax = 0;
  const shippingAmount = order?.shippingAmount;
  const grandTotal = order?.OrderGrandTotal;

  order?.Items?.map( ( item, index ) => {
    totalPrice = totalPrice + item.TotalPrice;
    totalTax = totalTax + item.ItemTax;
  } );

  function handleShowHideClick( e ) {
    if ( e?.preventDefault ) {
      e.preventDefault();
    }

    setShowSummary( !showSummary );
  }

  return (
    <div className='order-details-summary'>
      <ShowHideHeaderStrip handleShowHideClick={ handleShowHideClick } showSummary={ showSummary } grandTotal={ grandTotal?.toFixed( 2 ) } />
      { showSummary &&
        <div className='order-details-summary__container'>
          <ShowHideShipping order={ order } />
          <ShowHidePayment order={ order } />
          <ShowHideOrderSummary shippingAmount={ shippingAmount } grandTotal={ grandTotal?.toFixed( 2 ) } totalPrice={ totalPrice?.toFixed( 2 ) } totalTax={ totalTax?.toFixed( 2 ) } />
        </div>
            }
    </div>
  );
}

OrderDetailsSummary.propTypes = {
  order: object
};

export default OrderDetailsSummary;
