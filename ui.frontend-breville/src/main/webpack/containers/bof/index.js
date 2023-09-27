import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import Cart from 'containers/Cart';
import Checkout from 'containers/checkout';
import DevelopOnly from 'containers/develop-only';
import OrderConfirmation from 'containers/order-confirmation';
import { fetchRequest } from 'library/store/cart/actions';


function BOF(){
  const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch( fetchRequest() );
  }, [] );
  return (
    <>
      <Switch>
        <Route exact='true' path='/cart' component={ Cart } />
        <Route exact='true' path='/checkout' component={ Checkout } />
        <Route exact='true' path='/order-confirmation' component={ OrderConfirmation } />
        <Route exact='true' path='/develop' component={ DevelopOnly } />
      </Switch>
    </>
  );
}

BOF.displayName = 'Cart';

export default BOF;
