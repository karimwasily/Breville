import { createSelector } from 'reselect';
import { selectLocale } from '../global/selector';
import { SLICE_NAME } from './constant';

/**
 * Gets the sub-state slice from the store
 * @param {object} state global state
 * @returns {object} sub-state slice
 */
export const getStateSlice = ( state = {} ) => state[SLICE_NAME] || {};

// memoized selector of the sub-state slice
export const selectState = createSelector( getStateSlice, ( state ) => state );
export const selectIsLoading = createSelector( selectState, ( state ) => state.isLoading );

export const selectView = createSelector( selectState, ( state ) => state.view );

export const selectAvailableMachines = createSelector( selectState, ( state ) => state.availableMachines );
export const selectMachine = createSelector( selectState, ( state ) => state.machine );
export const selectMachineKEY = createSelector( selectMachine, ( machine ) => machine?.key );

export const selectMachineVariant = createSelector( selectState, ( state ) => state.machineVariant );

export const selectDynamicBundleFinishedGoodSKU = createSelector( selectMachineVariant, ( machineVariant ) => ( machineVariant ? machineVariant?.sku : null ) );

export const selectMachineName = createSelector( selectState, ( state ) => state.machineName );
export const selectMachineImage = createSelector( selectState, ( state ) => state.machineImage );
export const selectMachineDisplayPrice = createSelector( selectState, ( state ) => state.machineDisplayPrice );

export const selectCoffee = createSelector( selectState, ( state ) => state.coffee );
export const selectCoffeeTab = createSelector( selectState, ( state ) => state.coffeeTab );

export const selectCoffeeSKU = createSelector( selectCoffee, ( coffee ) => ( coffee ? coffee?.itemNumber : null ) );

export const selectBundle = createSelector( selectState, ( state ) => state.selectedBundle );
export const selectBundleVariant = createSelector( selectState, ( state ) => state.bundleVariant );
export const selectDynamicBundleProductCategories = createSelector( selectState, ( state ) => state.dynamicBundleProductCategories );
export const selectSelectedBundleCategory = createSelector( selectState, ( state ) => state.selectedBundleCategory );

export const selectDynamicBundleKEY = createSelector( selectBundle, ( bundle ) => ( bundle ? bundle?.key : null ) );
export const selectDynamicBundleVariantSKU = createSelector( selectBundleVariant, ( bundleVariant ) => ( bundleVariant ? bundleVariant?.sku : null ) );

export const selectBaristaStarterKitID = createSelector( selectState, ( state ) => state.baristaStarterKitID );
export const selectBaristaStarterKit = createSelector( selectState, ( state ) => state.baristaStarterKit );
export const selectBaristaStarterKitKEY = createSelector( selectBaristaStarterKit, ( barKit ) => barKit?.obj?.key );
export const selectBaristaStarterKitName = createSelector( selectBaristaStarterKit, selectLocale, ( barKit, locale ) => barKit?.obj?.masterData?.current?.masterVariant?.attributes?.find( ( attr ) => attr.name === 'productName' )?.value?.[locale] );
export const selectBaristaStarterKitCallout = createSelector( selectBaristaStarterKit, selectLocale, ( barKit, locale ) => barKit?.obj?.masterData?.current?.masterVariant?.attributes?.find( ( attr ) => attr.name === 'productCallouts' )?.value?.[locale] );
export const selectBaristaStarterKitDescription = createSelector( selectBaristaStarterKit, selectLocale, ( barKit, locale ) => barKit?.obj?.masterData?.current?.description?.[locale] );
export const selectBaristaStarterKitImages = createSelector( selectBaristaStarterKit, ( barKit ) => barKit?.obj?.masterData?.current?.masterVariant?.images );
export const selectBaristaStarterKitPrices = createSelector( selectBaristaStarterKit, ( barKit ) => barKit?.obj?.masterData?.current?.masterVariant?.prices );
export const selectBaristaStarterKitBox = createSelector( selectState, ( state ) => state?.baristaStarterKitBox );

export const selectDigitalAssetID = createSelector( selectState, ( state ) => state.digitalAssetID );
export const selectDigitalAsset = createSelector( selectState, ( state ) => state.digitalAsset );
export const selectDigitalAssetKEY = createSelector( selectDigitalAsset, ( digAsset ) => ( digAsset?.obj?.key ) );
export const selectDigitalAssetName = createSelector( selectDigitalAsset, selectLocale, ( digAsset, locale ) => ( ( digAsset && locale ) ? digAsset.obj?.masterData?.current?.name?.[locale] : null ) );
export const selectDigitalAssetDescription = createSelector( selectDigitalAsset, selectLocale, ( digAsset, locale ) => ( ( digAsset && locale ) ? digAsset?.obj?.masterData?.current?.description?.[locale] : null ) );
export const selectDigitalAssetImages = createSelector( selectDigitalAsset, ( digAsset ) => ( digAsset?.obj?.masterData?.current?.masterVariant?.images ) );
export const selectDigitalAssetPrices = createSelector( selectDigitalAsset, ( digAsset ) => ( digAsset?.obj?.masterData?.current?.masterVariant?.prices ) );

export const selectBundleDiscountPercentage = createSelector( selectState, ( state ) => state.bundleDiscountPercentage );
export const selectNumberOfCoffeeBags = createSelector( selectState, ( state ) => state.numOfCoffeeBags );

export const selectCartID = createSelector( selectState, ( state ) => state.cartID );
export const selectCartVersion = createSelector( selectState, ( state ) => state.cartVersion );

export const selectDynamicBundleExists = createSelector( selectState, ( state ) => state.dynamicBundleExists );
