import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Row, Col } from 'xps-react/core';
import { selectLineItemsCount } from 'library/store/cart/selector';

const CartTableHeader = () => {

  const itemCount = useSelector( selectLineItemsCount );
  return (
    <Grid className='cart-table-header'>
      <Row noGutters={ true }>
        <Col lg='6' md='6'>
          <div className='cart-table-header__title'>
            { itemCount } Products
          </div>
        </Col>
        <Col lg='2' md='2' smHide>
          <div className='cart-table-header__title'>
            Price
          </div>
        </Col>
        <Col lg='2' md='2' smHide>
          <div className='cart-table-header__title--quantity'>
            Quantity
          </div>
        </Col>
        <Col lg='2' md='2' smHide>
          <div className='cart-table-header__title--total'>
            Total
          </div>
        </Col>
      </Row>
    </Grid> );

};

export default CartTableHeader;
