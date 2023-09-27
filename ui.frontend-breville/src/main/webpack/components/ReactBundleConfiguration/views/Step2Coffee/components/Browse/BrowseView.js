import React, { useState } from 'react';
import { func, object, number, string } from 'prop-types';
import { Vendors } from 'components/Vendors';
import { BrowseProducts } from './BrowseProducts';
import { algoliaService } from 'xps-utils/algolia';

export const BrowseView = ( { handleProductSelect, selectedProduct, bundleDiscountPercentage, currencySymbol, aemData } ) => {
  const [products, setProducts] = useState( [] );

  function handleVendorChange( vendor ) {
    const vendorID = vendor.id;
    fetchCoffeeProductsFromBrand( vendorID );
  }

  function fetchCoffeeProductsFromBrand( vendorID ) {
    // get vendor products which are available as a subscription
    algoliaService.getBeanzBrandLongTermProducts( vendorID )
    .then( ( data ) => {
      setProducts( data.hits );
    } );
  }

  return (
    <div className='browse-view'>
      <Vendors aemData={ aemData } onVendorChange={ handleVendorChange }>
        <BrowseProducts products={ products } selectedProduct={ selectedProduct } handleProductSelect={ handleProductSelect } bundleDiscountPercentage={ bundleDiscountPercentage } currencySymbol={ currencySymbol } />
      </Vendors>
    </div>
  );
};

BrowseView.propTypes = {
  handleProductSelect: func,
  selectedProduct: object,
  bundleDiscountPercentage: number,
  currencySymbol: string,
  locale: string,
  aemData: object
};
