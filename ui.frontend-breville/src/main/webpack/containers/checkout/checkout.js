import React, { useState, useEffect } from 'react';
import Summary from 'components/Cart/OrderSummary';
import PayWithWidget from 'components/Cart/PayWithWidget';
import { CartProductWidget } from 'components/cart-product-widget';
import { DropdownMenu } from 'components/shared-ui/dropdown-menu';
import ProductsOrder from 'components/checkout/products-order';
import { Grid, Row, Col } from 'xps-react/core';
import { Accordion, AccordionItem } from 'xps-react/core/accordion';
import MessageBox from 'xps-react/core/MessageBox';
import { ScrollToTop } from 'xps-react/core/scroll-to-top';

import SignIn from 'containers/sign-in';

import { useDispatch, useSelector } from 'react-redux';
import { selectName } from 'library/store/user/selector';
import { selectActivePayment } from 'library/store/payment/selector';
import { selectHasPayments, selectLineItemsCount } from 'library/store/cart/selector';
import { selectRedirectResult } from 'library/store/ui/selectors';

import { setName } from 'library/store/user/actions';
import { STATIC_STEPS, STATIC_LABELS, DYNAMIC_STEPS, DYNAMIC_LABELS } from 'components/checkout/constants';

const Checkout = () => {
  const dispatch = useDispatch();
  const name = useSelector( selectName );
  const hasPayment = useSelector( selectHasPayments );
  const itemCount = useSelector( selectLineItemsCount );
  const isSubscription = true;
  const activePayment = useSelector( selectActivePayment );
  const resultCode = useSelector( selectRedirectResult );

  const curSteps = isSubscription && resultCode ? DYNAMIC_STEPS : STATIC_STEPS;
  const curLabels = isSubscription && resultCode ? DYNAMIC_LABELS : STATIC_LABELS;

  function onSignIn() {
    dispatch( setName( 'John' ) );
  }

  function onSignOut() {
    dispatch( setName( '' ) );
  }

  const SignInLabel = () => (
    <>
      <SignIn onClose={ onSignIn } /> for faster checkout.
    </>
  );

  const SignOutLabel = () => (
    <>
      Not you?&nbsp;<a href='' className='message-box__link' onClick={ onSignOut }>Sign Out</a>
    </>
  );

  let initialIndex = 0;

  if ( hasPayment ) initialIndex = 2;

  return (
    <>
      <div className='checkout mb-40'>
        <ScrollToTop />
        <Grid className='checkout__grid'>
          <Row noGutters={ true }>
            <Col lg={ 8 } xs={ 12 }>
              <div className='checkout__forms'>
                <div className='my-40'>
                  { name ?
                    <MessageBox
                      className='info'
                      label={ <b>Welcome, { name }</b> }
                      action = { <SignOutLabel /> }
                    />
                    :
                    <MessageBox
                      className='info'
                      label={ <b>Have a Breville Account?</b> }
                      action = { <SignInLabel /> }
                    />
                  }
                </div>
                <Accordion initIndex={ initialIndex }>
                  { curSteps.map( ( component, index ) => {
                    return (
                      <AccordionItem key={ index } index={ index } label={ curLabels[index] } >
                        { component }
                      </AccordionItem> );
                  } )
                }
                </Accordion>
              </div>
            </Col>
            <Col lg={ 4 } xs={ 12 }>
              <div className='checkout__summary'>
                <Summary type='CHECKOUT' />
                <DropdownMenu label={ `${ itemCount } Products in your order` }>
                  <ProductsOrder />
                </DropdownMenu>
                <PayWithWidget
                  title='You can pay with'
                  Visa Amex MasterCard Discover ApplePay PayPal PayPalCredit Affirm
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </>
  );
};

Checkout.displayName = 'Checkout';

export default Checkout;
