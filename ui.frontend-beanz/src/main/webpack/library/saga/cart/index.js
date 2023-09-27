import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_REQUEST, DELETE_CART, ADD_PROMO, GET_PRODUCT, ADD_PRODUCT, REMOVE_PROMO, UPDATE_LINEITEM, UPDATE_QUANTITYOFBAGS, UPDATE_GRIND, MERGE_CART } from 'library/store/cart/action-types';
import { fetchSuccess, fetchFail, setLoading, setCartEmpty, deleteCart, addPromo, setWrongPromoCodeStyle, addProducts } from 'library/store/cart/actions';
import { serviceRequest, deletRequest, addPromoRequest, updateRequest, getProductDataRequest, removePromoRequest, mergeCartRequest } from 'library/store/cart/service-request';
import userSchema from 'library/schema/users';
import get from 'lodash.get';
import { configuration } from 'xps-utils/configuration';
import { setAuthData } from 'xps-utils/authtokendatahandler';

const configurationData = configuration();
import { analyticsData } from 'xps-utils/analytics';
const analytics = analyticsData();
/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 */
export function* fetchData( action ) {
  try {
    yield put( setLoading( true ) );
    const isCreateCustomerServiceCalled = localStorage.getItem( 'createCustomServiceCalled' );
    if ( !isCreateCustomerServiceCalled ) {
      const localStore = Object.entries( localStorage );
      let callMergeCart = false;
      localStore.forEach( function ( val, i ) {
        if ( val[0].includes( 'auth0spa' ) ) {
          setAuthData();
          callMergeCart = true;
        }
      } );
      if ( callMergeCart === true ) {
        yield call( mergeCartDirect );
      }
    }
    const response = yield call( serviceRequest, {
      variables: userSchema.GoToCartVariables
    } );
    const cartIsUpdating = localStorage.getItem( 'cartIsUpdating' );
    if ( response.data.me.activeCart.lineItems.length === 0 && cartIsUpdating !== 'true' ){
      yield put( setCartEmpty( true ) );
    }
    else {
      analytics.updateAnalyticsData ( 'onload', response.data.me.activeCart.lineItems );
      yield put( setCartEmpty( false ) );
    }
    yield put( fetchSuccess( response ) );
    yield put( setLoading( false ) );
  }
  catch ( error ) {
    yield put( setCartEmpty( true ) );
    yield put( setLoading( false ) );
  }
}

/**
 * This will be used for getting product data for every cart product
 * @param {*} params params from the component
 * @param {*} skuId params from the component
 */
export function* fetchProductBySku( params ) {

  try {
    const whereQuery = get( params, 'payload.params' );
    const productSkuId = get( params, 'payload.skuId' );
    yield put( setLoading( true ) );

    const response = yield call( getProductDataRequest, {
      variables: {
        where: whereQuery,
        includeNames: ['WEB_GRIND', 'WEB_TYPE'],
        locale: 'en-us'
      }
    } );

    const productResponseData = get( response, 'data.products.results', {} );
    yield put( addProducts( {
      [productSkuId]: productResponseData
    } ) );
    yield put( setLoading( false ) );

  }
  catch ( error ) {
    yield put( fetchFail( error ) );
  }
}

/**
 * This will be used for merging the cart
 * @param {*} params params from the component
 */

export function* mergeCartDirect( params ) {

  try {
    yield put( setLoading( true ) );
    const cartID = localStorage.getItem( 'cartID' );
    const accessToken = localStorage.getItem( 'access_token' );
    const userWelcomed = localStorage.getItem( 'userWelcomed' );
    if ( !userWelcomed ) return null;
    const myHeaders = new Headers();
    myHeaders.append( 'Authorization', `Bearer ${ accessToken }` );
    myHeaders.append( 'Content-Type', 'application/json' );
    if ( cartID ) {
      myHeaders.append( 'cartid', cartID );
    }
    const requestOptions = {
      method: 'POST',
      headers: myHeaders
    };
    let domain;
    if ( configurationData?.awsApiUrl ){
      domain = configurationData.awsApiUrl;
      if ( domain.includes( '/commercetools' ) ) {
        domain = domain.split( '/commercetools' )[0];
      }
    }
    const pajsondata = fetch( `${ domain }/authenticate/createcustomer`, requestOptions );
    pajsondata.then( ( response ) => response.text() )
    .then( ( result ) => {
      try {
        const data = JSON.parse( result );
        localStorage.setItem( 'createCustomServiceCalled', true );
        if ( data.cartId ) {
          localStorage.setItem( 'cartID', data.cartId );
          localStorage.setItem( 'cartversion', data.cartVersion );
          localStorage.setItem( 'cartQuantity', data.LineItemsQuantity );
          localStorage.setItem( 'customerId', data.customerId );
          location.reload();
        }
      }
      catch ( err ) {
        console.error( err );
      }
    } )
    .catch( ( error ) => console.log( 'error in calling createcustomer service', error ) );
    yield put( setLoading( false ) );

  }
  catch ( error ) {
    yield put( fetchFail( error ) );
  }
}

// removing item
// adding item
/**
 * This will be deleting the item in cart
 * @param {*} params params from the component
 */
export function* deleteProductBySku( params ) {

  try {
    const productId = get( params, 'payload.params' );

    yield put( setLoading( true ) );
    const cartID = localStorage.getItem( 'cartID' );
    const cartVersion = parseInt( localStorage.getItem( 'cartversion' ) );

    const response = yield call( deletRequest, {
      variables: {
        id: cartID,
        version: cartVersion,
        locale: 'en',
        actions: {
          removeLineItem: {
            lineItemId: productId
          }
        }
      }
    } );

    const {
      id,
      version
    } = get( response, 'data.updateMyCart', {} );
    localStorage.setItem( 'cartID', id );
    localStorage.setItem( 'cartversion', version );
    localStorage.setItem( 'LineItemdeleted', 'true' );
    let cartQuantity = parseInt( localStorage.getItem( 'cartQuantity' ) );
    if ( cartQuantity > 0 ) {
      cartQuantity = cartQuantity - 1;
    }
    localStorage.setItem( 'cartQuantity', cartQuantity );
    $( '.cmp-button--cart .cmp-button__text' ).html( cartQuantity );


    yield call( fetchData );
  }
  catch ( error ) {
    yield put( fetchFail( error, {
      time: getTime()
    } ) );
  }

}

export function* addPromoCode( params ) {

  try {
    const promoCode = get( params, 'payload.params' );

    yield put( setLoading( true ) );
    const cartID = localStorage.getItem( 'cartID' );
    const cartVersion = parseInt( localStorage.getItem( 'cartversion' ) );

    const response = yield call( addPromoRequest, {
      variables: {
        actions: {
          addDiscountCode: {
            code: promoCode
          }
        },
        id: cartID,
        version: cartVersion,
        locale: 'en'
      }
    } );

    const responseData = get( response, 'data.updateMyCart', {} );
    if ( responseData ) {
      const {
        id,
        version
      } = get( response, 'data.updateMyCart', {} );
      localStorage.setItem( 'cartID', id );
      localStorage.setItem( 'cartversion', version );
      yield call( fetchData );
    }
    else {
      yield put( setLoading( false ) );
      yield put( setWrongPromoCodeStyle( true ) );
    }
  }
  catch ( error ) {
    yield put( setLoading( false ) );
    yield put( setWrongPromoCodeStyle( true ) );
  }

}
export function* updateLineItem( params, productSku, productQuantity, productGrind, selectValue ) {
  let updateLineItemvariables = '';
  try {
    const deleteLineitemID = get( params, 'payload.params' );
    localStorage.setItem( 'cartIsUpdating', true );
    yield call( deleteProductBySku, {
      payload: {
        params: deleteLineitemID
      }
    } );

    yield put( setLoading( true ) );
    const cartID = localStorage.getItem( 'cartID' );
    const cartVersion = parseInt( localStorage.getItem( 'cartversion' ) );
    const value = get( params, 'payload.select_value' );
    const productSku = get( params, 'payload.productSku' );
    const productGrind = get( params, 'payload.productGrind' );
    const productQuantity = get( params, 'payload.productQuantity' );

    updateLineItemvariables = {
      id: cartID,
      version: cartVersion,
      locale: 'en',
      actions: {
        addLineItem: {
          sku: value,
          quantity: productQuantity,
          custom: {
            type: {
              id: configurationData.grindId
            },

            fields: [{
              name: 'Grind',
              value: `"${ productGrind }"`
            }]
          },
          distributionChannel: {
            typeId: 'channel',
            id: configurationData.supplyChannelId
          },
          supplyChannel: {
            typeId: 'channel',
            id: configurationData.supplyChannelId
          }
        }
      }
    };
    const response = yield call( updateRequest, {
      variables: updateLineItemvariables

    } );

    const {
      id,
      version
    } = get( response, 'data.updateMyCart', {} );
    localStorage.setItem( 'cartID', id );
    localStorage.setItem( 'cartversion', version );
    localStorage.setItem( 'cartUpdated', true );
    let cartQuantity = parseInt( localStorage.getItem( 'cartQuantity' ) );
    cartQuantity = cartQuantity + 1;
    localStorage.setItem( 'cartQuantity', cartQuantity );
    $( '.cmp-button--cart .cmp-button__text' ).html( cartQuantity );
    yield call( fetchData );
    localStorage.setItem( 'cartIsUpdating', false );

  }
  catch ( error ) {
    yield put( fetchFail( error, {
      time: getTime()
    } ) );
  }

}
export function* updateQuantityOfBags( params, productSku, productQuantity, productGrind, selectValue ) {
  let updateLineItemvariables = '';
  try {
    localStorage.setItem( 'cartIsUpdating', true );
    const deleteLineitemID = get( params, 'payload.params' );
    yield call( deleteProductBySku, {
      payload: {
        params: deleteLineitemID
      }
    } );

    yield put( setLoading( true ) );
    const cartID = localStorage.getItem( 'cartID' );
    const cartVersion = parseInt( localStorage.getItem( 'cartversion' ) );
    let value = get( params, 'payload.select_value' );
    const productSku = get( params, 'payload.productSku' );
    const productGrind = get( params, 'payload.productGrind' );
    const productQuantity = get( params, 'payload.productQuantity' );
    if ( value.includes( 'x' ) ){
      value = value.replace( /\s/g, '' ).split( 'x' );
    }
    else {
      value = value.replace( /\s/g, '' ).split( 'Bags' );
    }
    value = parseInt( value[0] );

    updateLineItemvariables = {
      id: cartID,
      version: cartVersion,
      locale: 'en',
      actions: {
        addLineItem: {
          sku: productSku,
          quantity: value,
          custom: {
            type: {
              id: configurationData.grindId
            },

            fields: [{
              name: 'Grind',
              value: `"${ productGrind }"`
            }]
          },
          distributionChannel: {
            typeId: 'channel',
            id: configurationData.supplyChannelId
          },
          supplyChannel: {
            typeId: 'channel',
            id: configurationData.supplyChannelId
          }
        }
      }
    };
    const response = yield call( updateRequest, {
      variables: updateLineItemvariables

    } );

    const {
      id,
      version
    } = get( response, 'data.updateMyCart', {} );
    localStorage.setItem( 'cartID', id );
    localStorage.setItem( 'cartversion', version );
    localStorage.setItem( 'cartUpdated', true );
    let cartQuantity = parseInt( localStorage.getItem( 'cartQuantity' ) );
    cartQuantity = cartQuantity + 1;
    localStorage.setItem( 'cartQuantity', cartQuantity );
    $( '.cmp-button--cart .cmp-button__text' ).html( cartQuantity );
    yield call( fetchData );
    localStorage.setItem( 'cartIsUpdating', false );

  }
  catch ( error ) {
    yield put( fetchFail( error, {
      time: getTime()
    } ) );
  }

}


export function* updateGrind( params, productSku, productQuantity, productGrind, selectValue ) {
  let updateLineItemvariables = '';

  try {
    localStorage.setItem( 'cartIsUpdating', true );
    const deleteLineitemID = get( params, 'payload.params' );
    yield call( deleteProductBySku, {
      payload: {
        params: deleteLineitemID
      }
    } );

    yield put( setLoading( true ) );
    const cartID = localStorage.getItem( 'cartID' );
    const cartVersion = parseInt( localStorage.getItem( 'cartversion' ) );
    const value = get( params, 'payload.select_value' );
    const productSku = get( params, 'payload.productSku' );
    const productGrind = get( params, 'payload.productGrind' );
    const productQuantity = get( params, 'payload.productQuantity' );

    updateLineItemvariables = {
      id: cartID,
      version: cartVersion,
      locale: 'en',
      actions: {
        addLineItem: {
          sku: productSku,
          quantity: productQuantity,
          custom: {
            type: {
              id: configurationData.grindId
            },

            fields: [{
              name: 'Grind',
              value: `"${ value }"`
            }]
          },
          distributionChannel: {
            typeId: 'channel',
            id: configurationData.supplyChannelId
          },
          supplyChannel: {
            typeId: 'channel',
            id: configurationData.supplyChannelId
          }
        }
      }
    };
    const response = yield call( updateRequest, {
      variables: updateLineItemvariables
    } );
    const {
      id,
      version
    } = get( response, 'data.updateMyCart', {} );
    localStorage.setItem( 'cartID', id );
    localStorage.setItem( 'cartversion', version );
    localStorage.setItem( 'cartUpdated', true );
    let cartQuantity = parseInt( localStorage.getItem( 'cartQuantity' ) );
    cartQuantity = cartQuantity + 1;
    localStorage.setItem( 'cartQuantity', cartQuantity );
    $( '.cmp-button--cart .cmp-button__text' ).html( cartQuantity );
    yield call( fetchData );
    localStorage.setItem( 'cartIsUpdating', false );

  }
  catch ( error ) {
    yield put( fetchFail( error, {
      time: getTime()
    } ) );
  }

}


export function* removePromo( params ) {

  try {
    yield put( setLoading( true ) );
    const promoId = get( params, 'payload.params' );
    const cartID = localStorage.getItem( 'cartID' );
    const cartVersion = parseInt( localStorage.getItem( 'cartversion' ) );

    const response = yield call( removePromoRequest, {
      variables: {
        actions: {
          removeDiscountCode: {
            discountCode: {
              typeId: 'discount-code',
              id: promoId
            }
          }
        },
        id: cartID,
        version: cartVersion,
        locale: 'en'
      }
    } );

    const responseData = get( response, 'data.updateMyCart', {} );
    if ( responseData ) {
      const {
        id,
        version
      } = get( response, 'data.updateMyCart', {} );
      localStorage.setItem( 'cartID', id );
      localStorage.setItem( 'cartversion', version );
      if ( sessionStorage.getItem( 'subscriptionPlan' ) === 'true' ) {
        $( '.guest-checkout' ).addClass( 'hidden' );
      }
      else {
        $( '.guest-checkout' ).removeClass( 'hidden' );
      }
      yield call( fetchData );
    }
    else {
      yield put( setLoading( false ) );
    }
  }
  catch ( error ) {
    yield put( fetchFail( error, {
      time: getTime()
    } ) );
  }

}

/**
 * WATCHERS
 */

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
export function* watchSaga() {
  yield takeEvery( FETCH_REQUEST, fetchData );
  yield takeEvery( GET_PRODUCT, fetchProductBySku );
  yield takeEvery( DELETE_CART, deleteProductBySku );
  yield takeEvery( MERGE_CART, mergeCartDirect );
  yield takeEvery( ADD_PROMO, addPromoCode );
  yield takeEvery( REMOVE_PROMO, removePromo );
  yield takeEvery( UPDATE_LINEITEM, updateLineItem );
  yield takeEvery( UPDATE_QUANTITYOFBAGS, updateQuantityOfBags );
  yield takeEvery( UPDATE_GRIND, updateGrind );
}

export default watchSaga;