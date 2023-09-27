import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { selectOrderById } from 'library/store/mybreville/selector';
import OrderStrip from '../components/order-strip';
import OrderDetailsSummary from './order-details-summary';
import ShipmentDetails from './shipment-details';

const OrderDetails = ( props ) => {
  const orderIdParam = props?.match?.params?.orderId || '',
    history = useHistory(),
    order = useSelector( selectOrderById( orderIdParam ) );

  /**
   * Handles if user provides orderId in the URL param, but the order does not exist
   */
  useEffect( () => {
    if ( orderIdParam && !order ) {
      history.push( '/my-orders' );
    }
  }, [] );

  return order ? (
    <div className='OrderDetails'>
      <OrderStrip
        orderNumber={ order.OrderNumber }
        orderDate={ order.OrderCreatedDate }
        orderStatus={ order.OrderStatus }
      />
      <OrderDetailsSummary order={ order } />
      <ShipmentDetails order={ order } />
    </div>
  ) : ( <div></div> );
};

OrderDetails.propTypes = {

};

export default withRouter( OrderDetails );
