import React from 'react';
import { any } from 'prop-types';
import { CartProductWidget } from '../../cart-product-widget';

export const ProductsOrder = ( { isOpen } ) => {

  return (
    <>
      {
        ( isOpen ) &&
        <div className='products-order'>
          <CartProductWidget />
        </div>
      }
    </>
  );

};

ProductsOrder.propTypes = {
  isOpen: any
};

export default ProductsOrder;
