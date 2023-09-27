import { call, put, select, takeEvery } from 'redux-saga/effects';
import { fetchFail, setAvailableMachines, setBaristaStarterKit, setBaristaStarterKitBox, setCartID, setCartVersion, setDigitalAsset, setDynamicBundleExists, setDynamicBundleProductCategories, setDynamicBundles, setSelectedBundleCategory } from 'library/store/bundle/actions';
import { ADD_BUNDLE_TO_CART, ASSOCIATED_DYNAMIC_BUNDLE, FETCH_DYNAMIC_BUNDLES_VIA_CATEGORY_ID, FETCH_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES, INIT_BUNDLE_CATEGORY_SELECTION, INIT_CART, SET_SELECTED_BUNDLE_CATEGORY_VIA_KEY } from 'library/store/bundle/action-types';
import { createCartRequest, getAssociatedDynamicBundle, getBundleCategoryViaKEYRequest, getCartRequest, getDynamicBundleProductCategoriesRequest, getDynamicBundlesViaCategoryIDRequest, getMachinesViaFinishedGoodsKEYRequest, updateCartBundleLineItemsRequest, updateCartLineItemRequest, updateCartTaxModeRequest } from 'library/store/bundle/service-request';
import { selectBaristaStarterKitKEY, selectCartID, selectCartVersion, selectCoffeeSKU, selectDynamicBundleFinishedGoodSKU, selectDynamicBundleVariantSKU } from 'library/store/bundle/selector';
import { selectCountry, selectCurrencyCode, selectLocale, selectPurchasePageUrl, selectSiteRootPath, selectWebChannel } from 'library/store/global/selector';
import { updateWithLocaleVariantsAttr } from './helper';
import { pageLoading } from 'library/store/ui/actions';
import get from 'lodash.get';
import { algoliaService, normalizeBrevilleHit } from 'xps-utils/algolia';

/** @typedef {{payload: object}} action */

/**
 * Fetches dynamic bundles data
 * @yields {void}
 */
function* fetchDynamicBundleProductCategories() {
  try {
    const locale = yield select( selectLocale );
    const response = yield call( getDynamicBundleProductCategoriesRequest, { locale } );

    if ( response?.errors ) throw response;

    const categories = get( response, 'data.category.children', [] );
    yield put( setDynamicBundleProductCategories( categories ) );
  }
  catch ( error ) {
    console.error( 'bundle:fetchDynamicBundles saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 * logic when user has selected a bundle category
 * @param {{payload: {id: string}}} action the fetch data action definition
 * @yields {void}
 */
function* initBundleCategorySelection( { payload: categoryItem } ) {
  try {
    // set category from aem data
    yield put( setSelectedBundleCategory( categoryItem ) );

    // get dynamic bundles from selected category ID
    yield call( fetchDynamicBundlesViaCategoryID, { categoryID: categoryItem.id } );

    // * currently don't need this call if we grab dynamic bundle categories dynamically rather than from AEM
    // get additional category info from KEY
    // yield put( setSelectedBundleCategoryViaKEY( categoryItem.bundleCategoryKEY ) );
  }
  catch ( error ) {
    console.error( 'bundle:initBundleCategorySelection saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 * logic to set the bundle category via the provided bundleKEY
 * * currently don't need this call if we grab dynamic bundle categories dynamically rather than from AEM
 * @param {{payload: {selectedBundleCategoryViaKEY: string}}} action  the data action definition
 * @yields {void}
 */
function* setBundleCategoryViaKEY( { payload } ) {
  try {
    const bundleCategoryKEY = payload.selectedBundleCategoryViaKEY;

    // get bundle id from key
    const response = yield call( getBundleCategoryViaKEYRequest, { key: bundleCategoryKEY } );

    if ( response?.errors ) throw response;

    const bundleCategoryID = get( response, 'data.category.id' );

    if ( bundleCategoryID ) {
      yield call( fetchDynamicBundlesViaCategoryID, { categoryID: bundleCategoryID } );
    }
    else {
      throw 'no bundle category ID found';
    }

  }
  catch ( error ) {
    console.error( 'bundle:setBundleCategoryViaKEY saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 * Fetches dynamic bundles data via the provided category ID
 * @param {{categoryID: string}} action the fetch data action definition
 * @yields {void}
 */
function* fetchDynamicBundlesViaCategoryID( { categoryID } ) {
  try {
    // * GET DYNAMIC BUNDLES
    const vars = { where: `masterData(current(categories(id="${ categoryID }")))` };
    const response = yield call( getDynamicBundlesViaCategoryIDRequest, vars );

    if ( response?.errors ) throw response;

    const bundles = get( response, 'data.products.results', [] );

    // get bundles which include a finished goods key
    const updatedBundles = bundles.filter( ( bundle ) => {
      const attributesRaw = get( bundle, 'masterData.current.masterVariant.attributesRaw', [] );
      const foundFinishedGoodsKey = attributesRaw.find( ( attr ) => attr?.name === 'finishedGoodsKey' )?.value;
      // helper to grab value later
      bundle._finishedGoodsKey = foundFinishedGoodsKey;
      return Boolean( foundFinishedGoodsKey );
    } );

    // store updated bundles
    yield put( setDynamicBundles( bundles ) );


    if ( updatedBundles.length === 0 ) throw 'no bundles found';

    // * GET FINISHED GOODS
    const locale = yield select( selectLocale );
    const keysString = updatedBundles.map( ( b ) => JSON.stringify( b._finishedGoodsKey ) ).join( ',' );
    const machineVars = { where: `key in (${ keysString })`, locale };
    const machinesResponse = yield call( getMachinesViaFinishedGoodsKEYRequest, machineVars );

    if ( machinesResponse?.statusCode ) throw machinesResponse;

    // store available machine
    const machines = get( machinesResponse, 'data.products.results', [] );

    // remove machines which do not have the correct webchannel
    // create new array for only locale specific variants
    const webchannel = yield select( selectWebChannel );
    const updatedMachines = updateWithLocaleVariantsAttr( machines, { webchannel, locale } );

    yield put( setAvailableMachines( updatedMachines ) );

  }
  catch ( error ) {
    console.error( 'bundle:fetchDynamicBunldesViaCategoryID saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 * logic to get the cart and update necessary state
 * @yields {void}
 */
function* initCart() {
  try {
    // check for cart in locale storage
    let cartID = localStorage.getItem( 'cartID' );
    let cartVersion;

    // CREATE CART
    if ( !cartID || cartID === 'undefined' ) {
      // if no cart then create cart
      const currencyCode = yield select( selectCurrencyCode );
      const country = yield select( selectCountry );
      const locale = yield select( selectLocale );
      const res = yield call( createCartRequest, { currency: currencyCode, country, locale } );
      console.log( 'cart:', res );

      if ( res?.errors ) throw res;

      const cart = get( res, 'data.createMyCart', {} );
      cartID = cart.id;
      cartVersion = cart.version;

      // store cartID in localstorage
      localStorage.setItem( 'cartID', cart.id );
    }
    else {
      // we have cartID but also need the cart version
      const res = yield call( getCartRequest, { id: cartID } );
      console.log( 'cart:', res );

      if ( res?.errors ) throw res;

      cartVersion = get( res, 'data.me.cart.version' );
    }

    // store cart object (id and version)
    yield put( setCartID( cartID ) );
    yield put( setCartVersion( cartVersion ) );
  }
  catch ( error ) {
    console.error( 'bundle:initCart saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 * get associated dynamic bundle from finished good sku
 * @param {object} action action to fetch the action definition
 * @param {object} action.payload action payload
 * @param {string} action.payload.key finished good parent key
 * @param {boolean} [action.payload.expand] get additional data
 * @yields {void}
 */
function* associatedDynamicBundle( { payload } ) {
  try {
    const key = payload?.key;

    if ( key ) {
      const response = yield call( getAssociatedDynamicBundle, { key } );

      if ( response?.errors ) throw response;

      const dynamicBundleExists = Boolean( response?.data?.results?.length );

      // todo: add dynamic bundle information to state rather than flag
      yield put( setDynamicBundleExists( dynamicBundleExists ) );

      if ( dynamicBundleExists ) {
        const attributes = get( response, 'data.results[0].masterData.current.masterVariant.attributes', [] );
        const baristaStarterKit = attributes.find( ( attr ) => attr.name === 'barista_starter_kit_ref' )?.value;
        const digitalAsset = attributes.find( ( attr ) => attr.name === 'digital_asset_ref' )?.value;

        yield put( setBaristaStarterKit( baristaStarterKit ) );
        yield put( setDigitalAsset( digitalAsset ) );

        if ( payload?.expand ) yield expandStarterKit();
      }
    }
  }
  catch ( error ) {
    console.error( 'bundle:associatedDynamicBundle saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 *  additional helper to expand starter kit information via algolia
 * @yields {void}
 */
function* expandStarterKit() {
  const baristaStarterKitKEY = yield select( selectBaristaStarterKitKEY );
  const locale = yield select( selectLocale );

  try {
    if ( !baristaStarterKitKEY ) throw 'no starterkit key provided';

    const response = yield algoliaService.getBrevilleObjects( [baristaStarterKitKEY] );

    if ( !Array.isArray( response.results ) ) throw `no associate barista starter kit using key: ${ baristaStarterKitKEY }`;

    const [starterKit] = response.results;
    const relatedInTheBoxSKUs = starterKit.relatedProductInTheBox;
    const res = yield algoliaService.getBrevilleObjects( relatedInTheBoxSKUs );
    if ( Array.isArray( res.results ) ) {
      const normalizedHits = res.results.map( ( hit ) => normalizeBrevilleHit( hit, locale ) );
      yield put( setBaristaStarterKitBox( normalizedHits ) );
    }
  }
  catch ( error ) {
    console.error( 'bundle:associatedDynamicBundle saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 * add bundle to cart
 * @yields {void}
 */
function* addBundleToCart() {
  const dynamicBundleVariantSKU = yield select( selectDynamicBundleVariantSKU );
  const dynamicBundleFinishedGoodSKU = yield select( selectDynamicBundleFinishedGoodSKU );
  const coffeeSKU = yield select( selectCoffeeSKU );
  // ? todo: if api call for beanz plan to cross check then don't use suffix here
  const coffeeSubscriptionSKU = `${ coffeeSKU }_PLAN_WEEKLY_2`;

  const purchasePageUrl = yield select( selectPurchasePageUrl );
  const webchannel = yield select( selectWebChannel );
  const country = yield select( selectCountry );
  const locale = yield select( selectLocale );
  const cartID = yield select( selectCartID );
  const cartVersion = yield select( selectCartVersion );
  const currencyCode = yield select( selectCurrencyCode );

  try {
    yield put( pageLoading( true ) );

    // todo: currently not using this, as we are guaranteed that applying a suffix to the sku is sufficient
    // cross check coffee subscription SKU
    // const coffeeResponse = yield call( getCoffeePlan, { sku: coffee.itemNumber } );

    const response = yield call( updateCartBundleLineItemsRequest, {
      dynamicBundleVariantSKU,
      dynamicBundleFinishedGoodSKU,
      coffeeSubscriptionSKU,
      webchannel,
      currency: currencyCode,
      country,
      locale,
      cartID,
      cartVersion
    } );

    if ( response?.errors ) throw response;

    // * tax mode update not required if setting 'shippingAdress' in previous cart update call
    // update tax mode by updating the cart
    // yield call( updateCartTaxModeRequest, { cartID, cartVersion: updatedCartVersion, country, locale } );

    // AFTER EVERTHING IS COMPLETE REDIRECT TO CART PAGE
    window.location.href = purchasePageUrl;
  }
  catch ( error ) {
    console.error( 'bundle:addBundleToCart saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
    yield put( pageLoading( false ) );
  }
}


/**
 * WATCHERS
 */
function* watchSaga() {
  yield takeEvery( INIT_BUNDLE_CATEGORY_SELECTION, initBundleCategorySelection );
  yield takeEvery( FETCH_DYNAMIC_BUNDLE_PRODUCT_CATEGORIES, fetchDynamicBundleProductCategories );
  yield takeEvery( SET_SELECTED_BUNDLE_CATEGORY_VIA_KEY, setBundleCategoryViaKEY );
  yield takeEvery( FETCH_DYNAMIC_BUNDLES_VIA_CATEGORY_ID, fetchDynamicBundlesViaCategoryID );
  yield takeEvery( INIT_CART, initCart );
  yield takeEvery( ASSOCIATED_DYNAMIC_BUNDLE, associatedDynamicBundle );
  yield takeEvery( ADD_BUNDLE_TO_CART, addBundleToCart );
}

export default watchSaga;

