import React, { useEffect, useState } from 'react';
import { string, object, func, array } from 'prop-types';

import { CTProductTile } from 'shared-ui/ProductTile/CTProductTile';
import { CarouselProductList } from 'containers/CarouselProductList';

export const SelectProduct = ( {
  categoryTitle,
  products,
  selectedParentProduct,
  handleProductSelection,
  locale = 'en-US'
} ) => {

  function renderParentProduct( parentProduct ) {
    return (
      <CTProductTile key={ parentProduct.key }
        parentProduct={ parentProduct }
        selectedParentProduct={ selectedParentProduct }
        locale={ locale }
        onSelection={ handleProductSelection }
      />
    );
  }

  return (
    <div>
      <h2 className='machine-conf__product-title'>
        Select from ({ products.length }) Machines{ categoryTitle && ` in the ${ categoryTitle }` }
      </h2>
      <CarouselProductList
        items={ products }
        render={ renderParentProduct }
        paginationMobileView={ true }
        viewLimit={ 4 }
      />
    </div>
  );
};

SelectProduct.propTypes = {
  categoryTitle: string,
  products: array,
  selectedParentProduct: object,
  handleProductSelection: func,
  locale: string
};
