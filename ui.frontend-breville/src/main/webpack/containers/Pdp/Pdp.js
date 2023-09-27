import React, { useEffect, useState } from 'react';
import AppLauncher from 'xps-utils/app-launcher';
import { withAem } from 'xps-utils/withAem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductParent } from 'library/store/product/actions';
import { selectProductVariantPrice, selectProductVariantSKU, selectProductVariant, selectProductParent } from 'library/store/product/selector';
import { useShowHiddenSection } from 'xps-utils/useShowHiddenSection';
import { HeroPDP } from './components/HeroPDP';
import { CoffeeBundleHeroPDP } from './components/CoffeeBundleHeroPDP';
import { ModelPDP } from './components/ModelPDP';
import { PricePDP } from './components/PricePDP';
import { VariantColorInfoPDP } from './components/VariantColorInfoPDP';
import { AddToCartPDP } from './components/AddToCartPDP';
import { RelatedProducts } from './components/RelatedProducts';
import ModalRenderer from './components/ModalRenderer';
import { VideoPDP } from './components/VideoPDP';
import { VariantPickerPDP } from 'shared-ui/variant-picker';
import { selectProductVariantColor } from 'library/store/product/selector';
import { MayAlsoLike } from './components/MayAlsoLike';
import { WorksWith } from './components/WorksWith';
import { Ratings } from 'xps-react/core';
import { SharePDP } from './components/SharePDP';
import { FreeCoffeeTooltip } from './components/FreeCoffeeTooltip';
import { fetchAssociatedDynamicBundle, initCart } from 'library/store/bundle/actions';
import { PDPReviews } from 'containers/Pdp/components/PDPReviews/PDPReviews';
import { MulberryPDP } from 'containers/Pdp/components/MulberryWarranty/MulberryPDP';
import { useWarranty } from 'containers/Pdp/components/MulberryWarranty/useWarranty';
import { useUpdateDigitalData } from 'library/utils/useUpdateDigitalData';
import { PDPStickerHeaderTracker } from 'containers/Pdp/components/PDPStickyHeaderTracker/PDPStickerHeaderTracker';
import { useDetectElementVisibility } from 'xps-utils/useDetectElementVisibility';

HeroPDP.displayName = 'HeroPDP';
CoffeeBundleHeroPDP.displayName = 'CoffeeBundleHeroPDP';
Ratings.displayName = 'Ratings';
ModelPDP.displayName = 'ModelPDP';
VariantColorInfoPDP.displayName = 'VariantColorInfoPDP';
PricePDP.displayName = 'PricePDP';
MulberryPDP.displayName = 'MulberryPDP';
AddToCartPDP.displayName = 'AddToCartPDP';
VariantPickerPDP.displayName = 'VariantPickerPDP';
PDPStickerHeaderTracker.displayName = 'PDPStickerHeaderTracker';
VideoPDP.displayName = 'VideoPDP';
ModalRenderer.displayName = 'ModalRenderer';
RelatedProducts.displayName = 'RelatedProducts';
MayAlsoLike.displayName = 'MayAlsoLike';
WorksWith.displayName = 'WorksWith';
SharePDP.displayName = 'SharePDP';
FreeCoffeeTooltip.displayName = 'FreeCoffeeTooltip';
PDPReviews.displayName = 'PDPReviews';

/**
 * pdp react mounting point for aem data
 * this component will perform all iniital mount duties and provide global state to all other components on the pdp page
 * @param {{aemData: object}} props props
 * @returns {React.ReactElement}
 */
const Pdp = ( { aemData } ) => {
  const dispatch = useDispatch();
  const price = useSelector( selectProductVariantPrice );
  const productVariantSKU = useSelector( selectProductVariantSKU );
  const productVariantColor = useSelector( selectProductVariantColor );
  const productVariant = useSelector( selectProductVariant );
  const productParent = useSelector( selectProductParent );

  const warrantyObject = useWarranty( productVariant );

  // * fetch CT data on load of PDP page
  useEffect( () => {
    dispatch( initCart() );
    dispatch( fetchProductParent( { productParentSKU: aemData.productParentSKU } ) );
  }, [] );

  // * update affirm when variant price changes
  useEffect( () => {
    if ( !price ) return;

    document.getElementById( 'affirm-hook' ).setAttribute( 'data-amount', price?.centAmount );
    if ( window?.affirm?.ui?.refresh ) {
      window.affirm.ui.refresh();
    }
  }, [price] );

  // * update bazaar rating summary
  useEffect( () => {
    if ( !productVariantSKU ) return;
    document.getElementById( 'pdp_rating_summary' ).setAttribute( 'data-bv-product-id', productVariantSKU );
  }, [productVariantSKU] );

  // * get dynamic bundle information
  useEffect( () => {
    if ( !aemData?.productParentSKU || aemData?.category !== 'espresso' ) return;
    dispatch( fetchAssociatedDynamicBundle( { key: aemData.productParentSKU, expand: true } ) );
  }, [aemData] );

  // * update digitalData
  useUpdateDigitalData( { products: [productParent], page: 'pdp', selectedVariant: productVariant } );

  useShowHiddenSection( { toggleId: 'more-details-toggle', selectorId: 'more-details-selector' } );

  const { isRefVisible, visibilityRef } = useDetectElementVisibility();

  // don't show anything until we have consumed the aemData
  if ( !aemData ) return null;

  return (
    <>
      <AppLauncher>
        <HeroPDP aemData={ aemData } />
        <CoffeeBundleHeroPDP />
        <Ratings variantSKU={ productVariantSKU } widgetType='rating_summary' />
        <ModelPDP model={ productVariantSKU } />
        <VariantColorInfoPDP colorLabel={ productVariantColor?.label } />
        <MulberryPDP aemData={ aemData } warrantyObject={ warrantyObject } />
        <PricePDP price={ price } />
        <VariantPickerPDP />
        <AddToCartPDP aemData={ aemData } warrantyObject={ warrantyObject } showStickyHeader={ !isRefVisible } />
        <PDPStickerHeaderTracker elementRef={ visibilityRef } />
        <VideoPDP videos={ aemData.productVideos } />
        <ModalRenderer productBundle={ aemData?.productBundle } />
        <RelatedProducts productVariantSKU={ productVariantSKU } itemGroupID={ aemData.productType } />
        <MayAlsoLike productCategory={ aemData.category } itemGroupID={ aemData.productType } parentSKU={ aemData.productParentSKU } />
        <WorksWith parentSKU={ aemData.productParentSKU } itemGroupID={ aemData.productType } />
        <SharePDP shareList={ aemData.shareList } />
        <FreeCoffeeTooltip content={ aemData?.freeCoffeeTooltip } />
        <PDPReviews variantSKU={ productVariantSKU } productType={ aemData.productType } />
      </AppLauncher>
    </>
  );
};

export default withAem( Pdp );