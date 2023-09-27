import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetch, selectUserProducts } from 'library/store/mybreville/selector';
import { fetchProductRequest } from 'library/store/mybreville/actions';
import { withAem } from 'xps-utils/withAem';

import { getAlgoliaProductsMeta } from 'components/mybreville-components/my-orders/helpers';
import { productNameConversion } from 'components/mybreville-components/mybreville/helper';
import { REGISTERED } from 'components/mybreville-components/mybreville/constant';

import GetSupportProducts from './components/get-support-products';
import GetSupportNonLoggedInUser from './components/get-support-non-logged-in-user';

import { useAuth0 } from '@auth0/auth0-react';

const RegisteredProductsSupport = ( { aemData } ) => {

  const [productList, setProductList] = useState( [] );
  const [products, setProducts] = useState( [] );
  const { isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  const userProducts = useSelector( selectUserProducts );
  const isFetched = useSelector( selectFetch );

  useEffect( () => {
    dispatch( fetchProductRequest() );
  }, [dispatch] );

  useEffect( () => {
    setProductList(
      userProducts
      // Add back later for MVP
      // userProducts.filter( ( product ) => product?.Status === REGISTERED ) || []
    );
  }, [userProducts] );


  useEffect( () => {
    if ( Array.isArray( productList ) && productList.length ) {
      const productListWithProductNumber = productList.map( ( product ) => {
        return {
          id: product?.Id,
          productName: productNameConversion( product?.Item_Description__c, true ),
          ProductNumber: ( product?.Product_AX_Item_Number__c )
        };
      } );

      getAlgoliaProductsMeta( productListWithProductNumber ).then( ( newProducts ) => {
        ( Array.isArray( newProducts ) && !!newProducts.length )
          ? setProducts( newProducts )
          : setProducts( productListWithProductNumber );
      } )
      .catch( ( err ) => {
        console.log( err?.message );
        setProducts( productListWithProductNumber );
      } );
    }
  }, [productList] );

  return (
    <>
      { isFetched && (
        isAuthenticated
          ? <GetSupportProducts data={{ products, guidesLink: aemData?.productGuideLink }} />
          : <GetSupportNonLoggedInUser />
      ) }
    </>
  );
};

RegisteredProductsSupport.propTypes = {
  aemData: object
};

export default withAem( RegisteredProductsSupport );