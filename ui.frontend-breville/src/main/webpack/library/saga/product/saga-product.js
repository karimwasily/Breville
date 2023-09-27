import { call, put, select, takeEvery } from 'redux-saga/effects';
import { fetchFail, setProductParent, setProductVariant, setProductVariantViaSKU, setVariants } from 'library/store/product/actions';
import { getProductParentRequest, updateCartLineItemRequest } from 'library/store/product/service-request';
import { ADD_LINE_ITEM, FETCH_PRODUCT_PARENT, SET_PRODUCT_VARIANT_VIA_SKU } from 'library/store/product/action-types';
import get from 'lodash.get';
import { selectProductParent } from 'library/store/product/selector';
import { selectCountry, selectCurrencyCode, selectLocale, selectWebChannel } from 'library/store/global/selector';
import { selectCartID, selectCartVersion } from 'library/store/bundle/selector';
import { pageLoading } from 'library/store/ui/actions';
import { fetchWarrantyList } from 'library/saga/cart/warranty';
import { extractWarrantyInformation } from 'library/utils/extractWarrantyInformation';
import { addHelperAttributesToVariant, getVariants } from 'library/utils/normalize';

/**
 * Fetches parent product data
 * @param {{payload: {productParentSKU: string}}} action the fetch data action definition
 * @yields {void}
 */
function* fetchProductParent( { payload } ) {
  try {
    const { productParentSKU } = payload;
    const locale = yield select( selectLocale );
    const webchannel = yield select( selectWebChannel );

    const response = yield call( getProductParentRequest, { productParentSKU: productParentSKU.toUpperCase(), locale } );

    const product = get( response, 'data.product', null );
    const productCurrent = get( product, 'masterData.current' );

    if ( !product ) throw `no product found ${ productParentSKU }`;

    yield put( setProductParent( product ) );

    if ( !productCurrent?.allVariants?.length ) {
      console.log( { product } );
      throw 'no variants found';
    }

    // set initial selected variant and prioritise availability
    const variantsViaChannel = getVariants( productCurrent.allVariants, webchannel );

    // add helper attrs
    variantsViaChannel.forEach( ( variant ) => addHelperAttributesToVariant( { variant, webchannel, locale } ) );

    yield put( setVariants( variantsViaChannel ) );

    if ( variantsViaChannel.length === 0 ) {
      console.log( { allVariants: productCurrent?.allVariants } );
      throw 'no variants found for webchannel';
    }

    const warrantyMap = extractWarrantyInformation( variantsViaChannel.map( ( variant ) => variant.attributesRaw ) );
    if ( Object.keys( warrantyMap ).length ) {
      yield call( fetchWarrantyList, warrantyMap );
    }

    // prioritise initially selected variant to be in stock else select first
    const initialVariant = variantsViaChannel.find( ( variant ) => variant.availability.channels.results.find( ( result ) => result.availability.isOnStock ) ) || variantsViaChannel[0];

    if ( initialVariant?.sku ) {
      yield put( setProductVariantViaSKU( initialVariant.sku ) );
    }
  }
  catch ( error ) {
    console.error( 'product:fetchProductParent saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
  }
}

/**
 * set the product variant via sku including updating any related state
 * @param {{payload: {productVariantSKU: string}}} action the fetch data action definition
 * @yields {void}
 */
function* setVariantViaSKU( { payload } ) {
  try {
    const sku = payload.productVariantSKU;
    const parentProduct = yield select( selectProductParent );
    const productCurrent = get( parentProduct, 'masterData.current', null );

    const productVariant = productCurrent?.allVariants?.find( ( variant ) => variant.sku === sku );

    yield put( setProductVariant( productVariant ) );
  }
  catch ( error ) {
    console.error( 'product:setVariantViaSKU saga', error );
  }
}

/**
 * add line item to cart
 * @param {object} action action
 * @param {object} action.payload payload
 * @param {string} action.payload.sku sku
 * @param {number} action.payload.quantity quantity
 * @param {string} action.payload.warrantySKU SKU of Mulberry warranty
 * @yield {void}
 */
function* addLineItemToCart( { payload: { sku, quantity, warrantySKU } } ) {

  const webchannel = yield select( selectWebChannel );
  const country = yield select( selectCountry );
  const locale = yield select( selectLocale );
  const cartID = yield select( selectCartID );
  const cartVersion = yield select( selectCartVersion );
  const currencyCode = yield select( selectCurrencyCode );

  try {
    yield put( pageLoading( true ) );

    const response = yield call( updateCartLineItemRequest, {
      sku,
      quantity,
      webchannel,
      currency: currencyCode,
      country,
      locale,
      cartID,
      cartVersion,
      warrantySKU
    } );

    if ( response?.statusCode ) throw response;

    yield put( pageLoading( false ) );

    // AFTER EVERTHING IS COMPLETE REDIRECT TO CART PAGE
    // window.location.href = `${ siteRootPath }/transaction/purchase.html/cart`;
  }
  catch ( error ) {
    console.error( 'bundle:addLineItemToCart saga', error );
    yield put( fetchFail( error, { time: undefined } ) );
    yield put( pageLoading( false ) );
  }
}

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
function* watchSaga() {
  yield takeEvery( FETCH_PRODUCT_PARENT, fetchProductParent );
  yield takeEvery( SET_PRODUCT_VARIANT_VIA_SKU, setVariantViaSKU );
  yield takeEvery( ADD_LINE_ITEM, addLineItemToCart );
}

export default watchSaga;
