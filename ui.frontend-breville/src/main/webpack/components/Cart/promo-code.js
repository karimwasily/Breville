import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'xps-react/core/form';
import Button from 'xps-react/core/button';
import { useForm } from 'react-hook-form';
import { addPromoCode, removePromoCode } from 'library/store/cart/actions';
import { selectDiscountCodes } from 'library/store/cart/selector';
import { selectLineItems } from 'library/store/cart/selector';

export const PromoCode = ( ) => {
  const { register, watch, setValue } = useForm();
  const [showPromoCode, togglePromoCode] = React.useState( false );
  const [promoCodeApplied, applyPromoCode] = React.useState( undefined );
  const watchPromoCode = watch( 'promoCode' );
  const dispatch = useDispatch();
  const discountCodes = useSelector ( selectDiscountCodes );
  const page = window.location.pathname.split( '/' ).pop();

  const { parent = {}, child = {} } = useSelector( selectLineItems );
  let discount = [];
  discount = discount.concat( Object.keys( parent ).map( ( key )=> {
    return parent[key].originalTotalPriceCentAmt.centAmount - parent[key].totalPriceCentAmt;
  }
  ) );
  discount = discount.concat( Object.keys( child ).map( ( key )=> {
    return child[key].totalPrice === 'FREE' ? 0 : child[key].originalTotalPriceCentAmt.centAmount - child[key].totalPriceCentAmt;
  }
  ) );
  const discountValue = discount.reduce( ( a, b ) => a + b, 0 ) / 100;

  function onApply( e ) {
    e.preventDefault();
    dispatch( addPromoCode( { code: watchPromoCode, addCallback } ) );
  }
  function addCallback( response ) {
    if ( response.data.updateMyCart ) {
      applyPromoCode( true );
      localStorage.setItem( 'promocode', watchPromoCode );
    }
    else {
      applyPromoCode( false );
    }
  }

  function unsetPromoCode() {
    dispatch( removePromoCode( { code: discountCodes[0].discountCode.id, removeCallback } ) );
  }
  function removeCallback( response ) {
    applyPromoCode( undefined );
    setValue( 'promoCode', '' );
    localStorage.removeItem( 'promocode' );
  }

  function showPromoInput() {
    togglePromoCode( true );
  }

  return (
    <section className='cmp-cart-order-summary-promo-code'>
      { promoCodeApplied !== true && discountValue === 0 && page === 'cart' &&
        <Button type='link' className='cmp-cart-order-summary-promo-code__link' onClick={ showPromoInput } ><span className='cmp-cart-order-summary-promo-code__link-text' >Add a promo Code</span></Button>
      }
      { showPromoCode && promoCodeApplied !== true &&
      <div className='cmp-cart-order-summary-promo-code__input-wrapper'>
        { /* Mark, please refactor input below to use your Input component. I've tried, but failed. Thank you!
        <Input
          type={ 'text' }
          name={ 'promoCode' }
        />
        */ }
        <form onReset = { onApply } onSubmit = { onApply } >
          <div className='form-group'>
            <input id='promo-code' className='form-control cmp-cart-order-summary-promo-code__code-input' type='text' readOnly={ promoCodeApplied } name='promoCode' { ...register( 'promoCode' ) } />
          </div>

          { watchPromoCode && watchPromoCode.length > 0 && promoCodeApplied !== true &&
          <Button type='reset' className='cmp-cart-order-summary-promo-code__apply'>Apply</Button>
        }
        </form>
      </div>
      }
      { ( promoCodeApplied === true || discountValue > 0 ) && page === 'cart' && localStorage.getItem( 'promocode' ) &&
      <div>
        <p className='form-success'>Promo '{ localStorage.getItem( 'promocode' ) }'' applied!<br />Enjoy ${ discountValue } off any of your order! <Button className='cmp-cart-order-summary-promo-code__remove' type='link' onClick= { unsetPromoCode }>Remove</Button></p>
        <hr />
      </div>
      }
      { discountValue > 0 &&
      <div>
        <div className='cmp-cart-order-summary-promo-code__discount'>Promo Discount:<span className='cmp-cart-order-summary-promo-code__discount-amount'>-${ discountValue }</span></div>
      </div>
      }
      { promoCodeApplied === false &&
        <p className='form-error'>Oops! That promo code isn't valid. Please, try another</p>
      }
    </section>
  );

};

export default PromoCode;
