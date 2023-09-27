import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { any, number, string, func } from 'prop-types';
import Button from 'xps-react/core/button';
import { CartProductWidget } from 'components/cart-product-widget';
import { useDispatch } from 'react-redux';
import { setCurIndex, setIsValid, setIsDirty } from 'library/store/checkout/actions';
import { placeOrder } from 'library/store/payment/actions';

import { REVIEW_ORDER_BTN_ID } from 'components/checkout/constants';


const ReviewOrder = ( { isOpen, nextLabel, index, onNext } ) => {

  const dispatch = useDispatch();

  const history = useHistory();

  function onClickHandler() {
    dispatch( placeOrder() );
  }

  useEffect( () => {
    if ( isOpen ) {
      dispatch( setCurIndex( index ) );
    }
    dispatch( setIsValid( true, index ) );
    dispatch( setIsDirty( true, index ) );
  }, [isOpen] );


  const { products } = {
    products: [{
      id: '1',
      name: 'The Bambino Plus',
      price: 499.95,
      imageThb: 'https://publish-p30002-e99017.adobeaemcloud.com/content/breville/language-masters/en/coffee-landing-page/_jcr_content/root/container/container/container_1619175835/teaser_copy_1350094821.coreimg.png/1619411538910/frame-372.png',
      imageMed: 'image-med.jpg',
      imageLrg: 'image-large.jpg',
      quantity: 1,
      defaultWarranty: {},
      availableWarranties: {},
      freeAccessories: [{}],
      accessories: [{}]
    }
    ],
    helpfulAccessories: [{}]
  };
  if ( !isOpen ) {
    return <div></div>;
  }

  return (
    <>
      <p className='my-40'>
        <strong>Please review your shipping and cart information before placing your order.</strong>
      </p>
      <CartProductWidget readonly />
      <Button onClick={ onClickHandler } textType={ 'bold' } className={ 'review-order__btn' } id={ REVIEW_ORDER_BTN_ID }>Place Order</Button>
    </> );
};

ReviewOrder.propTypes = {
  isOpen: any,
  nextLabel: string,
  index: number,
  onNext: func
};

export default ReviewOrder;
