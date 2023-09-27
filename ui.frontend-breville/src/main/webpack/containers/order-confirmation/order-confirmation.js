import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Row, Col } from 'xps-react/core';
import Summary from 'components/Cart/OrderSummary';
import { fetchRequest } from 'library/store/cart/actions';
import Hr from 'components/shared-ui/Hr';
import { WhatHappensNext } from 'components/order-confirmation/what-happens-next';
import { Shipping } from 'components/order-confirmation/shipping';
import { BeanzPayment } from 'components/order-confirmation/beanz-payment';
import { selectLineItems } from 'library/store/cart/selector';
import { selectLineItemsCount } from 'library/store/cart/selector';
import { selectShippingAddress } from 'library/store/cart/selector';
import { selectOrderDetail } from 'library/store/cart/selector';
import { CartProductWidget } from 'components/cart-product-widget';
import { ScrollToTop } from 'xps-react/core/scroll-to-top';

// todo - move to redux
const data = {
  products: [ {
    id: '1',
    name: 'The Bambino Plus',
    price: 499.95,
    imageThb: 'https://publish-p30002-e99017.adobeaemcloud.com/content/breville/language-masters/en/coffee-landing-page/_jcr_content/root/container/container/container_1619175835/teaser_copy_1350094821.coreimg.png/1619411538910/frame-372.png',
    imageMed: 'image-med.jpg',
    imageLrg: 'image-large.jpg',
    quantity: 1,
    defaultWarranty: {},
    availableWarranties: {},
    freeAccessories: [ {} ],
    accessories: [ {} ]
  }
    /*    {
        id: '2',
        name: 'Smart Grinder Pro',
        price: 199.99,
        imageThb: 'https://publish-p30002-e99017.adobeaemcloud.com/content/breville/language-masters/en/coffee-landing-page/_jcr_content/root/container/container/container_1619175835/teaser_copy_1350094821.coreimg.png/1619411538910/frame-372.png',
        imageMed: 'image-med.jpg',
        imageLrg: 'image-large.jpg',
        quantity: 2,
        defaultWarranty: {},
        availableWarranties: {},
        freeAccessories: [{}],
        accessories: [{}]
    }
    */],
  helpfulAccessories: [ {} ],
  isLogged: false
};


const OrderConfirmation = () => {
  // NOTE: Use this data to display in DOM
  const lineItems = useSelector( selectLineItems );
  const itemCount = useSelector( selectLineItemsCount );
  const { parent = {} } = lineItems;
  const isDynamicBundle = Object.keys( parent ).some ( ( key ) => parent[key].isDynamicBundle );
  const isBundle = Object.keys( parent ).some ( ( key ) => parent[key].isBundle );
  const shippingAddress = useSelector( selectShippingAddress );
  const { orderNumber, createdAt } = useSelector( selectOrderDetail );
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const date = new Date( createdAt );
  const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch( fetchRequest() );
  }, [] );

  const { isLogged } = data;

  const history = useHistory();

  if ( itemCount === 0 ) {
    history.push( '/cart' );
  }

  localStorage.removeItem( 'promocode' );

  return (
    <div className='order-confirmation mb-60'>
      <ScrollToTop />
      <div className='order-confirmation__header my-40'>
        <h2 className='order-confirmation__header-title'>Thank You for Your Order!</h2>
        <p className='order-confirmation__header-notification'>
          An email confirmation is on its way to { shippingAddress.email }
        </p>
        <p className='order-confirmation__order-info'>
          <p className='order-confirmation__order-info-item'>Order Number: <strong>{ orderNumber }</strong></p>
          <p className='order-confirmation__order-info-item'>Order Placed: <strong>{ monthNames[date.getMonth()] } { date.getDate() }, { date.getFullYear() }</strong></p>
        </p>
      </div>
      <Grid className='cart__grid'>
        <Row noGutters={ true }>
          <Col lg='8' xs='12'>
            <div className='cart__table'>
              { itemCount > 0 && <WhatHappensNext isBundle = { isBundle } isDynamicBundle = { isDynamicBundle } isLogged = { isLogged } /> }
              <h3 className='order-confirmation__title'>Your Order</h3>
              <CartProductWidget readonly />
              <Hr className='order-confirmation__bottom-line' />
            </div>
          </Col>
          <Col lg='4' xs='12'>
            { itemCount > 0 && <WhatHappensNext isBundle = { isBundle } isDynamicBundle = { isDynamicBundle } isLogged = { isLogged } /> }
            <h3 className='order-confirmation__title--hidden'>Summary</h3>
            <div className='cart__summary'>
              <Summary readonly />
              <Shipping />
              { isDynamicBundle &&
                <BeanzPayment />
              }
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );

};

OrderConfirmation.displayName = 'OrderConfirmation';

export default OrderConfirmation;
