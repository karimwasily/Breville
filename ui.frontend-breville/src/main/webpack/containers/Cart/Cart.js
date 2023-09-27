import React from 'react';
import { Grid, Row, Col } from 'xps-react/core';
import Summary from 'components/Cart/OrderSummary';
import CartHeader from 'components/Cart/CartHeader';

import PayWithWidget from 'components/Cart/PayWithWidget';
import HelpfulAccessCard from 'components/shared-ui/HelpfulAccessCard';
import { CartProductWidget } from 'components/cart-product-widget';
import MessageBox from 'xps-react/core/MessageBox';
import { ScrollToTop } from 'xps-react/core/scroll-to-top';

const Cart = () => {

  function RemoveItems(){
    alert( 'Item removed' );
  }

  return (
    <div className='cart'>
      <ScrollToTop />
      <Grid>
        <Row noGutters= { true }>
          <Col lg='12'>
            <CartHeader />
          </Col>
        </Row>
        <Row noGutters={ true }>
          <Col lg='8' xs='12'>
            <div className='mb-30'>
              { /* <MessageBox
                className='danger'
                label='Item(s) in your cart or no longer available.'
                action= { <a href='' className='message-box__link' onClick={ RemoveItems }><b>Remove unavailable items.</b></a> }
              /> */ }
            </div>
            <CartProductWidget />
            { /* <HelpfulAccessCard /> */ }
          </Col>
          <Col lg='4' xs='12'>
            <div className='cart__summary'>
              <Summary />
              <PayWithWidget />
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );

};

export default Cart;
