import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'xps-react/core/button';
import { selectLineItems, selectOrderSummaryPrice } from 'library/store/cart/selector';
import { selectActivePayment } from 'library/store/payment/selector';

import Proptypes from 'prop-types';
import PromoCode from 'components/Cart/promo-code';
import { selectIsValid, selectCurIndex } from 'library/store/checkout/selector';

import { STATIC_LABELS, DYNAMIC_LABELS, DYNAMIC_IDS, STATIC_IDS } from 'components/checkout/constants';
import { PriceSection } from './PriceSection';

export const OrderSummary = ( props ) => {
  const { readonly, type } = props;
  const history = useHistory();

  // Proceed to Checkout
  const curIndex = useSelector( selectCurIndex );
  const isValid = useSelector( selectIsValid );
  const lineItems = useSelector( selectLineItems );
  const orderSummaryPrice = useSelector( selectOrderSummaryPrice );
  const activePayment = useSelector( selectActivePayment );

  const { subTotal, totalGross, taxAmount, shippingAmount, showTotalSection } = orderSummaryPrice;
  const { parent = {}, child = {} } = lineItems;

  const isAffirm = activePayment === 'Affirm';
  const curLabels = isAffirm ? DYNAMIC_LABELS : STATIC_LABELS;
  const curIds = isAffirm ? DYNAMIC_IDS : STATIC_IDS;
  const curId = curIds[curIndex];

  function handleOnNext() {
    const btn = document.getElementById( curId );
    btn.click();
  }

  function handleClick() {
    history.push( '/checkout' );
  }

  const priceList = Object.keys( parent ).map( ( key )=>
    <PriceSection key={ key } data={ parent[key] } childLineItems={ child } /> );

  // <div className='cmp-cart-order-summary__bundle-item'>Training ans support<span className='cmp-cart-order-summary__price'>FREE</span></div>

  return (
    <section className='cmp-cart-order-summary'>
      <h3 className='cmp-cart-order-summary__title'>Order Summary</h3>
      <hr className='my-25' />
      { priceList }
      <hr />
      <div className='cmp-cart-order-summary__subtotal'>Subtotal:<span className='cmp-cart-order-summary__price'><strong>{ subTotal }</strong></span></div>
      { showTotalSection && <div className='cmp-cart-order-summary__subtotal'>Estimated Shipping:<span className='cmp-cart-order-summary__price'>{ shippingAmount }</span></div> }
      { showTotalSection && <div className='cmp-cart-order-summary__subtotal'>Sales Tax: <span className='cmp-cart-order-summary__price'>{ taxAmount }</span></div> }
      <hr />
      <div className='mb-20'>
        <PromoCode />
      </div>
      { showTotalSection &&
        <>
          <div className='cmp-cart-order-summary__total'>
            Order Total:<span className='cmp-cart-order-summary__price'>
              { totalGross }</span>
          </div>
          <hr className='my-25' />
        </>
      }
      { !readonly && ( type === 'CHECKOUT' ) &&
        <Button onClick={ handleOnNext } className='cmp-cart-button' disabled={ !isValid[curIndex] }>
          Next: { curLabels[curIndex] ? curLabels[curIndex + 1] : '' }
        </Button>
      }
      { !readonly && ( type !== 'CHECKOUT' ) &&
      <Button onClick={ handleClick } className='cmp-cart-button'>
        Proceed to Checkout
      </Button>
      }
    </section>
  );

};

OrderSummary.propTypes = {
  readonly: Proptypes.bool
};
export default OrderSummary;
