import { put, all, call } from 'redux-saga/effects';
import { fetchSuccess, fetchFail, setUserDetail, setUserOrders, setError, setMasterClasses, setMySubscriptions, setUserProducts } from 'library/store/mybreville/actions';
import { pageLoading } from 'library/store/ui/actions';
import { getUserDetailService, getUserOrdersService, getSubscriptionService, getUserProducts } from 'library/store/mybreville/service-request';
import { AlgoliaHttp } from 'library/http/algoliaHttp';
import { getAlgoliaProductsMeta } from 'components/mybreville-components/my-orders/helpers';

import { mockProductData } from 'components/mybreville-components/mybreville/mock-data';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
function* fetchData() {

  try {
    yield put( pageLoading( true ) );

    // Run them in parallel
    const { userServices, orderServices, userProducts, subscriptions, masterclassesData } = yield all( {
      userServices: getUserDetailService( {} ),
      orderServices: getUserOrdersService( {} ),
      userProducts: getUserProducts( {} ),
      subscriptions: getSubscriptionService( {} ),
      masterclassesData: AlgoliaHttp.getMasterclassesData()
    } );

    /**
     * @todo Check why sometimes data response is as following;
     * { data: { message: 'eyJhhbGcio+oasdoiasd...' } }
     */
    if ( Array.isArray( userServices?.data?.records ) ) {
      yield put( setUserDetail( userServices?.data?.records[0] || null ) );
    }

    if ( Array.isArray( orderServices?.data ) ) {
      yield put( setUserOrders( orderServices.data ) );
    }

    if ( Array.isArray( userProducts?.data?.records ) ) {
      yield put( setUserProducts( userProducts.data.records ) );
    }
    // Remove later for MVP
    else {
      yield put( setUserProducts( mockProductData ) );
    }


    if ( Array.isArray( subscriptions?.data ) ) {
      /**
       * @todo Needs more refactor for calling algolia for products here?
       */
      if ( subscriptions?.data?.length ){
        const subsWithProductNumber = subscriptions?.data.map( ( subscription ) => {
          subscription.ProductNumber = subscription?.skucode?.split( '_' )[0];
          return subscription;
        } );
        const subsPromises = getAlgoliaProductsMeta( subsWithProductNumber );
        const clonedSubscriptions = yield subsPromises;
        yield put( setMySubscriptions( clonedSubscriptions ) );
      }
      else {
        yield put( setMySubscriptions( subscriptions.data ) );
      }
    }

    if ( Array.isArray( masterclassesData ) ) {
      yield put( setMasterClasses( masterclassesData ) );
    }

    yield put( fetchSuccess() );
    yield put( pageLoading( false ) );

  }
  catch ( error ) {
    console.error( 'mybreville saga', error );

    yield put( setError( true ) );
    yield put( pageLoading( false ) );
    yield put( fetchFail( error, { time: new Date().getTime() } ) );
  }
}

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
function* fetchProductData() {
  try {
    yield put( pageLoading( true ) );

    const response = yield call( getUserProducts, {} );

    if ( Array.isArray( response?.data?.records ) ) {
      yield put( setUserProducts( response.data.records ) );
    }
    // Remove later for MVP
    else {
      yield put( setUserProducts( mockProductData ) );
    }

    yield put( fetchSuccess() );
    yield put( pageLoading( false ) );
  }
  catch ( error ) {
    console.error( 'mybreville product saga, fallback to mockdata', error );
    yield put( setError( true ) );
    yield put( pageLoading( false ) );
    yield put( fetchFail( error, { time: new Date().getTime() } ) );
  }
}

export { fetchData, fetchProductData };