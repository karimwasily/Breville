import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'xps-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocale, selectSiteBaseUrl, selectWebChannel } from 'library/store/global/selector';
import { CarouselProductList } from 'containers/CarouselProductList';
import { CTProductTile } from 'components/shared-ui/ProductTile/CTProductTile';
import { useCompareProductsQueryParams } from './useCompareProductsQueryParams';
import { useFetchCompareProducts } from './useFetchCompareProducts';
import { useTranslation } from 'react-i18next';
import { AddToCartModal } from 'containers/Pdp/components/AddToCartModal/AddToCartModal';
import { withAem } from 'xps-utils/withAem';
import { initCart } from 'library/store/bundle/actions';
import { setProductParent, setProductVariant } from 'library/store/product/actions';
import { selectCartVersion } from 'library/store/cart/selector';
import { useWarranty } from 'containers/Pdp/components/MulberryWarranty/useWarranty';
import { selectProductVariant } from 'library/store/product/selector';
import { useEffectAfterMount } from 'xps-utils/useEffectAfterMount';
import { capitalize } from 'xps-utils/format';
import { useUpdateDigitalData } from '../../library/utils/useUpdateDigitalData';

const MIN_VISIBLE_PRODUCTS = 2;

const ProductCompare = ( { aemData } ) => {
  const [products, setProducts] = useState( [] );
  const [showAddToCartModal, setShowAddToCartModal] = useState( false );

  useUpdateDigitalData( { products, page: 'comparison' } );

  const locale = useSelector( selectLocale );
  const webchannel = useSelector( selectWebChannel );
  const cartVersion = useSelector( selectCartVersion );
  const siteBaseUrl = useSelector( selectSiteBaseUrl );

  const productVariant = useSelector( selectProductVariant );
  const warrantyObject = useWarranty( productVariant );

  const history = useHistory();
  const { t } = useTranslation();

  const [skus, category] = useCompareProductsQueryParams();
  useFetchCompareProducts( { setProducts, skus, webchannel, locale, category } );

  const categoryPlpUrl = aemData?.categoryPlpUrl || `${ siteBaseUrl }/products/${ category }.html`;
  const pdpBaseUrl = `${ siteBaseUrl }/products/${ category }/`;
  const dispatch = useDispatch();

  // * send customer back to previous page when the comparison is no longer valid
  useEffectAfterMount( () => {
    if ( products.length < MIN_VISIBLE_PRODUCTS ) {
      history.goBack();
    }
  }, [products] );

  // * setup cart when modal is opened
  useEffect( () => {
    if ( !showAddToCartModal ) return;
  }, [showAddToCartModal] );

  function returnToPlpPage() {
    window.location.href = categoryPlpUrl;
  }

  function toggleAddToCartModal( data ) {
    return setShowAddToCartModal( ( state ) => {
      if ( !state ) {
        // if no cart version then we need to make request
        if ( !cartVersion ) dispatch( initCart() );
        // construct redux state for the modal to use
        const { parentProductKey, variant } = data;
        const selectedParentProduct = products.find( ( product ) => product.key === parentProductKey );
        dispatch( setProductParent( selectedParentProduct ) );
        dispatch( setProductVariant( variant ) );
      }
      return !state;
    } );
  }

  // remove product when there is 2 or more products
  function removeProduct( key ) {
    return function () {
      setProducts( ( products ) => ( products.length <= MIN_VISIBLE_PRODUCTS ? products : products.filter( ( product ) => product.key !== key ) ) );
    };
  }

  function secondaryActionForProductTile( { parentProductKey } ){
    return products.length <= MIN_VISIBLE_PRODUCTS ? null : <Button onClick={ removeProduct( parentProductKey ) } type='link' textType='bold' className='product-compare__remove'>{ t( 'br-remove' ) }</Button>;
  }

  function renderCarouselItem( parentProduct ) {
    return (
      <CTProductTile
        key={ parentProduct.key }
        parentProduct={ parentProduct }
        url={ `${ pdpBaseUrl + parentProduct?.key.toLowerCase() }.html` }
        locale={ locale }
        disableSelectWrapper={ true }
        showFooterPrice={ true }
        showAddToCart={ true }
        handleAddToCartBtn={ toggleAddToCartModal }
        secondaryActionComponent={ secondaryActionForProductTile }
      />
    );
  }

  if ( !category || !skus?.length || !products?.length ) return null;

  return (
    <div className='product-compare'>
      <div className='product-compare__header'>
        <Button onClick={ returnToPlpPage } className='product-compare__breadcrumb' colorScheme='none' icon='arrow-left'>
          { t( 'pdp-returnToAll' ) }{ ` ${ aemData?.categoryTitle || capitalize( category ) }` }
        </Button>
        <h2 className='product-compare__title'>
          { t( 'plp-comparing' ) }{ ` ${ products.length } ` }{ t( 'br-products' ) }
        </h2>
      </div>
      <CarouselProductList
        items={ products }
        render={ renderCarouselItem }
        containerWidth={ 1440 }
        itemWidth={ 320 }
        viewLimit={ 4 }
      />
      { showAddToCartModal && <AddToCartModal category={ category } productBundle={ aemData.productBundle } keepShoppingLink={ categoryPlpUrl } onClose={ toggleAddToCartModal } warrantyObject={ warrantyObject } /> }
    </div>
  );
};

export default withAem( ProductCompare );