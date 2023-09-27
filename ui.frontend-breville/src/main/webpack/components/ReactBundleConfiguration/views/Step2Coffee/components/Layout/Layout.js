import React from 'react';
import { func, node, bool, object, number, string } from 'prop-types';
import { Footer } from './Footer';
import { Header } from './Header';
import { ProductResult } from '../ProductResult/ProductResult';

export const Layout = ( {
  handleSubmit,
  submitDisabled,
  selectedProduct,
  handleProductSelect,
  bundleDiscountPercentage,
  numOfCoffeeBags,
  currencySymbol,
  children
} ) => {
  function handleCancelSelection() {
    handleProductSelect( null );
  }

  return (
    <div className='coffee-conf-layout__container'>
      <Header bundleDiscountPercentage={ bundleDiscountPercentage } />
      <div className='coffee-conf-layout__content'>
        { children }
      </div>
      { selectedProduct && (
        <ProductResult
          hit={ selectedProduct }
          cancelSelection={ handleCancelSelection }
          numOfCoffeeBags={ numOfCoffeeBags }
          bundleDiscountPercentage={ bundleDiscountPercentage }
          currencySymbol={ currencySymbol }
        />
      ) }
      <Footer handleSubmit={ handleSubmit } submitDisabled={ submitDisabled } />
    </div>
  );
};

Layout.propTypes = {
  handleSubmit: func,
  submitDisabled: bool,
  selectedProduct: object,
  handleProductSelect: func,
  bundleDiscountPercentage: number,
  numOfCoffeeBags: number,
  currencySymbol: string,
  children: node
};
