import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row, Col } from 'xps-react/core';
import { addPromo, setWrongPromoCodeStyle, removePromo, showAuthUserName } from 'library/store/cart/actions';
import { selectIsWrongPromoCode, selectDiscountedCode, selectActiveCart, selectShippingInfo, selectAuthUserName } from 'library/store/cart/selector';

export const CartTotal = ( props ) => {

  const totalCartPrice = ( props.centAmount / 100 ).toFixed( 2 );
  const currency = props.currencyCode;
  const dispatch = useDispatch();
  const wrongPromo = useSelector( selectIsWrongPromoCode );
  const discountedCode = useSelector( selectDiscountedCode );
  const shippingInfo = useSelector( selectShippingInfo );
  const activeCart = useSelector( selectActiveCart );
  let promoCodeID, appliedPromoCode, discountedPrice = 0, shippingCost = 0;
  const [ disablePromoCodeButton, setDisablePromoCodeButton ] = useState( [true] );
  const authUserName = useSelector( selectAuthUserName );
  let auth_username = localStorage.getItem('auth_username');

  if(auth_username && authUserName !== true){
    let LoggedInDivElement = document.createElement('div');
    LoggedInDivElement.className = 'cart-loggedin-username';
    LoggedInDivElement.innerHTML = 'Logged in as';
    let userDataSpanElement = document.createElement('span');
    userDataSpanElement.className = 'cart-loggedin-username-span';
    userDataSpanElement.innerHTML = auth_username + '.';   
    let userLogoutAnchorElement = document.createElement('a');
    userLogoutAnchorElement.className = 'auth-logout';
    userLogoutAnchorElement.innerHTML = 'Logout?';
    userLogoutAnchorElement.addEventListener('click', (e) => {
        document.getElementsByClassName('auth-logout')[0].click();
    });
    LoggedInDivElement.append(userDataSpanElement);
    LoggedInDivElement.append(userLogoutAnchorElement);
    $('.guest-checkout').after(LoggedInDivElement);
    dispatch( showAuthUserName( true ) );
  }

  function applyPromoCode() {
    const promoCode = $( '#promoCode' ).val();
    if(promoCode.trim() === ''){
      dispatch( setWrongPromoCodeStyle( true ) );
    }
    else{
      dispatch( addPromo( promoCode ) );
    }
  }

  function promoTextUpdate(){
    dispatch( setWrongPromoCodeStyle( false ) );
  }

  function removePromoCode(){
    dispatch( removePromo( promoCodeID ) );
  }

  function calculatePerLineItemDiscount(discountOnProductPrice){
    if(discountOnProductPrice.discountedPrice.includedDiscounts?.length > 0){
      const quantity = discountOnProductPrice.quantity;
      const centAmount = discountOnProductPrice.discountedPrice.includedDiscounts[0].discountedAmount.centAmount;
      discountedPrice += ( quantity * centAmount );
    }
  }

  function getDiscountedValue(){
    const noOfProducts = activeCart.lineItems.length;
    for ( let i = 0; i < noOfProducts; i++ ){
      let noOfDiscountsPerProduct = activeCart.lineItems[i].discountedPricePerQuantity.length;
      if(noOfDiscountsPerProduct === 1){
        if ( activeCart.lineItems[i].discountedPricePerQuantity[0] ) {
          calculatePerLineItemDiscount(activeCart.lineItems[i].discountedPricePerQuantity[0])          
        }
      }
      else if(noOfDiscountsPerProduct > 1){
        let discountsArray = activeCart.lineItems[i].discountedPricePerQuantity;
        for(let i = 0; i < noOfDiscountsPerProduct; i++) {
          calculatePerLineItemDiscount(discountsArray[i]);
        }         
      }
    }
    discountedPrice = ( discountedPrice / 100 ).toFixed( 2 );
  }

  if ( discountedCode?.length > 0 ){
    promoCodeID = discountedCode[0].discountCode.id;
    appliedPromoCode = discountedCode[0].discountCode.code;
    $('.guest-checkout').addClass('hidden');
    getDiscountedValue();
  }

  if ( shippingInfo?.price?.centAmount > 0 ){
    shippingCost = ( shippingInfo.price.centAmount / 100 ).toFixed( 2 );
  }

  function handlePromoCodeInputChange(e) {
    let enteredPromo = e.target.value;
    if (!enteredPromo.replace(/\s/g, '').length) {
      $('.promo-addbtn .btn').removeClass('active');
      setDisablePromoCodeButton(true);
    }
    else{
      if(enteredPromo.length > 0){
        $('.promo-addbtn .btn').addClass('active');
        setDisablePromoCodeButton(false);
      }
      else{
        $('.promo-addbtn .btn').removeClass('active');
        setDisablePromoCodeButton(true);
      }
    }    
  }

  return (
    <Grid className = 'order-grand-total nopadding'>
      <div className ='cart-total'>
        <div className ='row cart-total__border'>
          <div className ='col-md-5 offset-md-7'>
          { shippingCost ? <Fragment> 
              <div className='cartwrapper__order-item-price-shipping'>
                <ul className='cartwrapper__order-item-price-shipping--ul cartwrapper__order-item-price-shipping-totalcart'>
                  <li className='cartwrapper__order-item-price-shipping--li'>Shipping</li>
                  <li className='cartwrapper__order-item-price-shipping--li info'>${ shippingCost }</li>
                </ul>
              </div>
            </Fragment> : null }
            <div className ='cartwrapper__order-item-price-shipping'>
              { ( discountedCode?.length > 0 ) && <ul className ='cartwrapper__order-item-price-shipping--ul promo'>
                <li className='cartwrapper__order-item-price-shipping--li'>
                  Promo - <span className='cartwrapper__order-item-price-shipping--li__appliedPromoStyle' >{ appliedPromoCode } </span> (<button className='cartwrapper__order-item-price-shipping--li__removePromoButton' onClick={ removePromoCode }>Remove</button>)
                </li>
                <li className ='cartwrapper__order-item-price-shipping--li cartwrapper__order-item-price-shipping--li__discountAmount'>-${ discountedPrice }</li>
              </ul> }
              <ul className ='cartwrapper__order-item-price-shipping--ul total-cart-price'>
                <li className='cartwrapper__order-item-price-shipping--li'>Cart Total</li>
                <li className ='cartwrapper__order-item-price-shipping--li free'>{ currency ==='USD' ? '$' : currency }{ totalCartPrice }</li>
              </ul>
            </div>
          </div>
        </div>
        { ( !discountedCode?.length > 0 ) && <div className='row'>
          <div className='col-md-5 offset-md-7'>
            <div className='promo-code-wrapper bg-white'>
              <div className='form-field promo-code-container'>
                <div className='promo-input'>
                  <input id='promoCode' onChange={ promoTextUpdate } type='text' autoComplete='off' placeholder='Promo Code' className={ wrongPromo ? 'has-error' : '' } onChange={ handlePromoCodeInputChange }/>
                </div>
              </div>
              <div className='promo-addbtn'>
                <button className='btn btn-primary' onClick={ applyPromoCode } disabled= { disablePromoCodeButton } >Add</button>
              </div>
            </div>
          </div>
          <div className='col-md-5 offset-md-7 promocode-error-message'>
            <div className={ wrongPromo ? 'show' : 'hidden  ' }>
              <span> This code is not valid. Enter a different code </span>
            </div>
          </div>
        </div> }
      </div>
    </Grid>
  );
};