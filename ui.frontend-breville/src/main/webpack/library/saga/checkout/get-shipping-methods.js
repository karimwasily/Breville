import { call, put } from 'redux-saga/effects';
//
import { fetchFail, setShippingMethods } from 'library/store/checkout/actions';
import { getShippingMethodsRequest} from 'library/store/checkout/service-request';

import { pageLoading } from 'library/store/ui/actions';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
export function* getShippingMethods( { payload: { params = {} } }, getTime = () => undefined ) {
  try {
    const { options } = params;

    console.log('options', params)
    yield put( pageLoading( true ) );

    // update query with shipping methods
    const response = yield call( getShippingMethodsRequest, options );

    const shippingMethodsData = response.data.shippingMethodsByLocation;

    yield put( setShippingMethods( shippingMethodsData ) );
    
    yield put( pageLoading( false ) );
  }
  catch ( error ) {
    console.error( 'checkout', error );
    yield put( pageLoading( false ) );
    yield put( fetchFail( error, { time: getTime() } ) );
  }
}
