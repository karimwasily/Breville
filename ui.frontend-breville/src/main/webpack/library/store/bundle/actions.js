import { createApiActions } from 'xps-utils/redux-utility/api';
import actionCreator from 'xps-utils/redux-utility/createAction';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_LOADING,
  SET_MACHINE,
  SET_COFFEE,
  SET_VIEW,
  SET_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES,
  FETCH_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES,
  SET_SELECTED_BUNDLE_CATEGORY,
  SET_SELECTED_BUNDLE_CATEGORY_VIA_KEY,
  SET_DYNAMIC_BUNDLES,
  FETCH_DYNAMIC_BUNDLES_VIA_CATEGORY_ID,
  SET_BUNDLE_DISCOUNT_PERCENTAGE,
  FETCH_BUNDLE_CATEGORY_VIA_KEY,
  SET_AVAILABLE_MACHINES,
  SET_COFFEE_TAB,
  ADD_BUNDLE_TO_CART,
  INIT_BUNDLE_CATEGORY_SELECTION,
  SET_NUMBER_OF_COFFEE_BAGS,
  INIT_CART,
  CART_VERSION,
  CART_ID,
  SET_BARISTA_STARTER_KIT,
  SET_DIGITAL_ASSET,
  ASSOCIATED_DYNAMIC_BUNDLE,
  SET_BARISTA_STARTER_KIT_BOX,
  DYNAMIC_BUNDLE_EXISTS
} from './action-types';

export const apiActions = createApiActions(
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL
);
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;
export const setLoading = actionCreator( SET_LOADING, 'isLoading' );

export const setView = actionCreator( SET_VIEW, 'view' );

export const setAvailableMachines = actionCreator( SET_AVAILABLE_MACHINES, 'availableMachines' );
export const setMachine = actionCreator( SET_MACHINE, 'machine' );

export const setCoffee = actionCreator( SET_COFFEE, 'coffee' );

export const setCoffeeTab = actionCreator( SET_COFFEE_TAB, 'coffeeTab' );

export const fetchDynamicBundleProductCategories = actionCreator( FETCH_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES );
export const setDynamicBundleProductCategories = actionCreator( SET_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES, 'dynamicBundleProductCategories' );

export const initBundleCategorySelection = actionCreator( INIT_BUNDLE_CATEGORY_SELECTION );
export const setSelectedBundleCategory = actionCreator( SET_SELECTED_BUNDLE_CATEGORY, 'selectedBundleCategory' );
export const setSelectedBundleCategoryViaKEY = actionCreator( SET_SELECTED_BUNDLE_CATEGORY_VIA_KEY, 'selectedBundleCategoryViaKEY' );

export const fetchBundleCategoryViaKEY = actionCreator( FETCH_BUNDLE_CATEGORY_VIA_KEY );
export const fetchDynamicBundlesViaCategoryID = actionCreator( FETCH_DYNAMIC_BUNDLES_VIA_CATEGORY_ID );
export const setDynamicBundles = actionCreator( SET_DYNAMIC_BUNDLES, 'dynamicBundles' );

export const setBaristaStarterKit = actionCreator( SET_BARISTA_STARTER_KIT, 'baristaStarterKit' );
export const setBaristaStarterKitBox = actionCreator( SET_BARISTA_STARTER_KIT_BOX, 'baristaStarterKitBox' );
export const setDigitalAsset = actionCreator( SET_DIGITAL_ASSET, 'digitalAsset' );

export const setBundleDiscountPercentage = actionCreator( SET_BUNDLE_DISCOUNT_PERCENTAGE, 'bundleDiscountPercentage' );
export const setNumberOfCoffeeBags = actionCreator( SET_NUMBER_OF_COFFEE_BAGS, 'numOfCoffeeBags' );

export const initCart = actionCreator( INIT_CART );
export const fetchAssociatedDynamicBundle = actionCreator( ASSOCIATED_DYNAMIC_BUNDLE );
export const addBundleToCart = actionCreator( ADD_BUNDLE_TO_CART );

export const setCartID = actionCreator( CART_ID, 'cartID' );
export const setCartVersion = actionCreator( CART_VERSION, 'cartVersion' );

export const setDynamicBundleExists = actionCreator( DYNAMIC_BUNDLE_EXISTS, 'dynamicBundleExists' );

export default apiActions;
