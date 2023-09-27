/* eslint-disable no-console */
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row, Col } from 'xps-react/core';
import { CartProduct } from './CartProduct';
import { CartTotal } from './CartTotal';
import { BeanzSpinner } from './BeanzSpinner';
import { fetchRequest } from 'library/store/cart/actions';
import { selectIsLoading, selectProducts, selectTotalPrice, selectIsCartEmpty } from 'library/store/cart/selector';
import { analyticsData } from 'xps-utils/analytics';
$('.cmp-container--cart-buttons .cmp-title--continue, #container_cart--continue_login_buttons, .checkout-btn, .guest-checkout, #to_continue').addClass('hidden');
const analytics = analyticsData();

export const ReactCart = ({ aemData }) => {
  const isLoading = useSelector( selectIsLoading );
  const products = useSelector( selectProducts );
  const totalPrice = useSelector( selectTotalPrice );
  const isCartEmpty = useSelector( selectIsCartEmpty );
  const dispatch = useDispatch();

  useEffect( ()=>{
    dispatch( fetchRequest() );
  }, [] );

  useEffect( ()=>{
    if(isCartEmpty){
      localStorage.setItem('cartEmpty','true');
      $('.cmp-container--cart-buttons .cmp-title--continue, #container_cart--continue_login_buttons, .checkout-btn, .guest-checkout, #to_continue').addClass('hidden');
    }else{
      localStorage.setItem('cartEmpty','false');
      $('.cmp-container--cart-buttons .cmp-title--continue, #container_cart--continue_login_buttons, .guest-checkout, #to_continue').removeClass('hidden');
    }
  }, [isCartEmpty] );

  return (
    <div className = 'cmp-cart-container'>
      { isLoading && <BeanzSpinner /> }
      <Grid className='cmp-cart-container--cart-grid'>
        <div className='container-fluid' >
          <Row>
            <Col md='12' lg='12' className='nopadding'>
              { isCartEmpty && <h2 className='emptyCartText'>Cart is Empty </h2> }
              {
                    ( products?.length > 0 ) && products.map( ( product, index ) => {
                        return (
                          <Fragment key={ product.id } >
                            <CartProduct product={product} aemData={aemData} />
                          </Fragment>
                        );
                    } )
                }
              {
                    ( products?.length > 0 ) > 0 && <CartTotal { ...totalPrice } />
                }
            </Col>
          </Row>
        </div>
      </Grid>
    </div>
  );

};