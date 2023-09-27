import React from 'react';
import OrdersList from './components/orders-list';
import OrderSummaryEmpty from './components/order-summary-empty';
import { useSelector } from 'react-redux';
import { selectOrders } from 'library/store/mybreville/selector';

const MyOrders = () => {
  const orders = useSelector( selectOrders );

  return orders && orders.length ? (
    <OrdersList orders={ orders } />
  ) : (
    <OrderSummaryEmpty />
  );
};

MyOrders.propTypes = {};

export default MyOrders;
