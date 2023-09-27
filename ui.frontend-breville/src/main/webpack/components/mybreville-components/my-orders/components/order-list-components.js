import React from 'react';
import { array } from 'prop-types';
import OrderSummary from './order-summary';
import OrderStrip from './order-strip';

const OrderListComponents = ( { orders } ) => {

  const listOrders = orders?.map( ( order, index ) => {
    return (
      <div data-testid='order-list-components' key={ index }>
        <OrderStrip
          orderNumber={ order?.OrderNumber }
          orderDate={ order?.OrderCreatedDate }
          orderStatus={ order?.OrderStatus }
        />
        <OrderSummary order={ order } />
      </div>
    );
  } );

  return listOrders;
};

OrderListComponents.defaultProps = {
  orders: []
};

OrderListComponents.propTypes = {
  orders: array
};

export default OrderListComponents;