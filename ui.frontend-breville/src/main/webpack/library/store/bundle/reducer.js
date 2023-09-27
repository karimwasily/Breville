import createReducer from 'xps-utils/redux-utility/createReducer';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_LOADING,
  SET_MACHINE,
  SET_COFFEE,
  SET_VIEW,
  SET_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES,
  SET_SELECTED_BUNDLE_CATEGORY,
  SET_BUNDLE_DISCOUNT_PERCENTAGE,
  SET_DYNAMIC_BUNDLES,
  SET_AVAILABLE_MACHINES,
  SET_COFFEE_TAB,
  SET_NUMBER_OF_COFFEE_BAGS,
  CART_ID,
  CART_VERSION,
  SET_BARISTA_STARTER_KIT,
  SET_DIGITAL_ASSET,
  SET_BARISTA_STARTER_KIT_BOX,
  DYNAMIC_BUNDLE_EXISTS
} from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';
import { MACHINE_CONFIG_VIEW } from 'components/ReactBundleConfiguration/constants';
import { formatPrice } from 'xps-utils/normalize';

const bundleInitialState = {
  view: null,
  coffeeTab: null,
  availableMachines: [],
  machineName: '',
  machineImage: null,
  machineDisplayPrice: null,
  machine: null,
  machineVariant: null,
  selectedBundle: null,
  bundleVariant: null,
  coffee: null,
  dynamicBundles: [],
  dynamicBundleProductCategories: null,
  selectedBundleCategory: null,
  baristaStarterKitID: null,
  digitalAssetID: null,
  baristaStarterKit: null,
  baristaStarterKitBox: null,
  digitalAsset: null,
  bundleDiscountPercentage: null,
  numOfCoffeeBags: 12,
  cartID: null,
  cartVersion: null,
  dynamicBundleExists: false
};

export const initialState = createInitialState( bundleInitialState );

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
    [SET_LOADING]: ['isLoading'],
    [SET_VIEW]: setView,
    [SET_COFFEE_TAB]: ['coffeeTab'],
    [SET_AVAILABLE_MACHINES]: ['availableMachines'],
    [SET_MACHINE]: setMachine,
    [SET_COFFEE]: ['coffee'],
    [SET_DYNAMIC_BUNDLES]: ['dynamicBundles'],
    [SET_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES]: ['dynamicBundleProductCategories'],
    [SET_SELECTED_BUNDLE_CATEGORY]: ['selectedBundleCategory'],
    [SET_BARISTA_STARTER_KIT]: ['baristaStarterKit'],
    [SET_BARISTA_STARTER_KIT_BOX]: ['baristaStarterKitBox'],
    [SET_DIGITAL_ASSET]: ['digitalAsset'],
    [SET_BUNDLE_DISCOUNT_PERCENTAGE]: ['bundleDiscountPercentage'],
    [SET_NUMBER_OF_COFFEE_BAGS]: ['numOfCoffeeBags'],
    [CART_ID]: ['cartID'],
    [CART_VERSION]: ['cartVersion'],
    [DYNAMIC_BUNDLE_EXISTS]: ['dynamicBundleExists']
  },
  initialState
);

export default reducer;

// view per step in the bundle journey
function setView( state, payload ) {
  const view = payload.view;
  const updatedState = { ...state, view };
  // if we are on machine configuration page and were previously browsing coffee then reset the coffee tab state
  if ( view === MACHINE_CONFIG_VIEW && state.coffeeTab !== null ) {
    updatedState.coffeeTab = null;
  }
  return updatedState;
}

// sets the parent product, variant selection & associated bundle
function setMachine( state, payload ) {
  const { machine: { parent, variant } } = payload;

  // set other variant attributes
  const machineName = parent?.masterData?.current?.name;
  const machineImage = variant.images.find( ( img ) => img.label === 'tile' )?.url;
  const machineDisplayPrice = formatPrice( variant.prices[0].value );

  // helper on the variant object
  variant._name = machineName;
  variant._image = machineImage;
  variant._displayPrice = machineDisplayPrice;

  // * set matching bundle to variant
  // match the bundle 'finishedGoodsKey' to the parent product SKU
  const selectedBundle = state.dynamicBundles.find( ( bundle ) => bundle._finishedGoodsKey === parent.key );
  const selectedBundleVariant = selectedBundle.masterData.current.allVariants.find( ( v ) => v.attributesRaw.some( ( attr ) => ( ( attr.name === 'finishedGoodsSKU' ) && ( attr.value === variant.key ) ) ) );
  const baristaStarterKitID = selectedBundle.masterData.current.masterVariant.attributesRaw.find( ( attr ) => attr.name === 'barista_starter_kit_ref' )?.value?.id;
  const digitalAssetID = selectedBundle.masterData.current.masterVariant.attributesRaw.find( ( attr ) => attr.name === 'digital_asset_ref' )?.value?.id;

  return {
    ...state,
    machineName,
    machineImage,
    machineDisplayPrice,
    machine: parent,
    machineVariant: variant,
    selectedBundle,
    bundleVariant: selectedBundleVariant,
    baristaStarterKitID,
    digitalAssetID
  };
}
