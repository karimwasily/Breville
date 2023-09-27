import { call, put, select } from 'redux-saga/effects';
//
import { fetchFail } from 'library/store/checkout/actions';
import { updateAddressRequest } from 'library/store/checkout/service-request';
import { selectCartVersion } from 'library/store/cart/selector';
import { selectShippingMethods } from 'library/store/checkout/selector';

import { fetchData } from 'library/saga/cart';
import { pageLoading } from 'library/store/ui/actions';
import { mapAddressToCommerceTools, parseAddressToArray } from 'components/checkout/utility.js';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
export function* updateCartAddress( { payload: { params = {} } }, getTime = () => undefined ) {
  try {

    const addressArr = parseAddressToArray( params );
    const cartId = localStorage.getItem( 'cartID' );
    //
    const shipping = mapAddressToCommerceTools( addressArr[1] );
    shipping.id = 'exampleid';
    //
    const shippingMethods = yield select( selectShippingMethods );
    const shippingIndex = Number( params.shippingMethod );
    const shippingMethodId = shippingMethods[shippingIndex].id;

    const options = {
      variables: {
        id: cartId,
        shipping,
        billing: shipping,
        shippingMethodId
      }
    };

    // get cart version number
    const version = yield select( selectCartVersion );
    // set cart version number
    options.variables.version = version;

    // update cart address
    yield call( updateAddressRequest, options ); // update mutation with shipping methods
    //
    // refresh cart
    yield call( fetchData );

    yield put( pageLoading( false ) );
  }
  catch ( error ) {
    console.error( 'checkout', error );
    yield put( pageLoading( false ) );
    yield put( fetchFail( error, { time: getTime() } ) );
  }
}
