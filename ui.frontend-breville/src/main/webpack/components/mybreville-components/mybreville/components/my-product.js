import React, { useEffect, useState } from 'react';
import { array } from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleHideProduct } from 'library/store/mybreville/actions';
import { useTranslation } from 'react-i18next';
import RegisteredProduct from './registered-product';
import RegisteredProductInformation from './registered-product-information';
import { AccordionCollapse } from 'xps-react/core/accordion';
import { isCoffeeProduct, productNameConversion } from '../helper';
import { getAlgoliaProductsMeta } from 'components/mybreville-components/my-orders/helpers';
import { isValidDate } from 'xps-utils/misc';

const MyProduct = ( { productList, tutorialData, masterClassesData } ) => {
  const [products, setProducts] = useState( [] );
  const numberOfProduct = productList?.length || 0;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect( () => {
    if ( Array.isArray( productList ) && productList.length ) {
      const productListWithProductNumber = productList.map( ( product ) => {
        const { EW_End__c: extendedWarrantyDate } = product || {};
        const formattedExtendedWarrantyDate = isValidDate( extendedWarrantyDate ) && `${ new Date( extendedWarrantyDate )?.toLocaleString( 'default', { month: 'short' } ) } ${ new Date( extendedWarrantyDate )?.getFullYear() }`;
        return { ...product, productName: productNameConversion( product?.Item_Description__c ), isHide: ( product?.Hide_Asset__c ), ProductNumber: ( product?.Product_AX_Item_Number__c ), formattedExtendedWarrantyDate };
      } );

      getAlgoliaProductsMeta( productListWithProductNumber ).then( ( newProducts ) => {
        ( Array.isArray( newProducts ) && !!newProducts.length ) ? setProducts( newProducts ) : setProducts( productListWithProductNumber );
      } )
      .catch( ( err ) => {
        console.log( err?.message );
        setProducts( productListWithProductNumber );
      } );
    }

  }, [productList] );

  function toggleShowHide( product, index ) {
    return function () {
      products[index] = { ...product, isHide: !product.isHide };
      setProducts( [...products] );
      dispatch( toggleHideProduct( {
        hideBoolean: !product.isHide,
        productId: product.Id
      } ) );
    };
  }

  return (
    <div className='mybreville__my-product'>
      <h3 className='my-product__count'>
        { t( 'eh-label-mybreville-my-product' ) }
        <span className='my-product__count-number'>{ numberOfProduct }</span>
      </h3>
      { Array.isArray( products ) && !!products.length && products?.map( ( product, index ) => (
        <AccordionCollapse
          className='my-product__accordion'
          collapseOnLoad={ Boolean( product?.Hide_Asset__c ) }
          title={ productNameConversion( product?.Item_Description__c ) }
          key={ product?.Id }
          onClickAction={ toggleShowHide( product, index ) }
        >
          <RegisteredProduct product={{ ...product, isCoffeeProduct: isCoffeeProduct( product?.Meta?.primaryWebCategory ) }} />
          { isCoffeeProduct( product?.Meta?.primaryWebCategory ) && <RegisteredProductInformation tutorialData={ tutorialData } masterClassesData={ masterClassesData } /> }
        </AccordionCollapse>
      ) ) }
    </div>
  );
};

MyProduct.propTypes = {
  productList: array,
  tutorialData: array,
  masterClassesData: array
};


export default MyProduct;
