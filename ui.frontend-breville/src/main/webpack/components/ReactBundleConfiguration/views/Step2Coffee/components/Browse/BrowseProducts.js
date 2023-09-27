import React from 'react';
import { array, object, func, number, string } from 'prop-types';
import { AlgoliaCoffeeProductTile } from 'components/shared-ui/CoffeeProductTile/AlgoliaCoffeeProductTile';

export const BrowseProducts = ( { products, selectedProduct, handleProductSelect, bundleDiscountPercentage, currencySymbol } ) => {
  return (
    <div className='browse-products'>
      { products && products.map( ( product, idx ) => (
        <AlgoliaCoffeeProductTile
          key={ idx }
          hit={ product }
          showSelect
          onSelect={ handleProductSelect }
          isSelected={ product.objectID === selectedProduct?.objectID }
          discountPercentage={ bundleDiscountPercentage }
          currencySymbol={ currencySymbol }
        />
      ) ) }
    </div> );
};

BrowseProducts.propTypes = {
  products: array,
  selectedProduct: object,
  handleProductSelect: func,
  bundleDiscountPercentage: number,
  currencySymbol: string
};