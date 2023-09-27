import React, { Fragment } from 'react';

export const totalAmount = ( shippingTax, cartTotalPrice ) => {
  return (
    <Fragment>
      <div className='border-bottom-black'>
        <div className='row'>
          <div className='cmp-grid-column-md-8 offset-md-4'>
            <div className='cmp-text__order-item-price-shipping'>
              <ul className='cmp-text__order-item-price-shipping-ul'>
                <li className='cmp-text__order-item-price-shipping-li'>Shipping</li>
                <li className='cmp-text__order-item-price-shipping-li cmp-text__info'>
                  { shippingTax && <h5 className='cmp-text__total-pay-price text-right'>${ ( shippingTax.centAmount / 100 ).toFixed( shippingTax.fractionDigits ) }</h5> }
                </li>
              </ul>
            </div>
            <div className='cmp-text__total-pay'>
              <h4 className='cmp-text__total-pay-label font-h4'>Total to Pay</h4>
              { cartTotalPrice && <h5 className='cmp-text__total-pay-price text-right'>${ ( cartTotalPrice.centAmount / 100 ).toFixed( 2 ) }</h5> }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};