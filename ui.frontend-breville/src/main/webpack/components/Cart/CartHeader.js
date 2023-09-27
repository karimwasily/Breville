import React from 'react';

const CartHeader = () =>
  <div className='cart-header'>
    <span className='cart-header__item'>
      <a href='#' className='cart-header__link'>Continue Shopping</a>
    </span>
    <h2 className='cart-header__item cart-header__title'>Your Cart</h2>
    <span className='cart-header__item cart-header__spacer'>&nbsp;</span>
  </div>;

export default CartHeader;
