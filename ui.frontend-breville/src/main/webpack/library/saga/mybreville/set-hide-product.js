import { call } from 'redux-saga/effects';
import { toggleHideProduct } from 'library/store/mybreville/service-request';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 */

export function* setHideProduct( action = {} ) {
  // This needs to be completed
  const { payload: { hideBoolean, productId } } = action;
  const data = {
    Hide_Asset__c: hideBoolean
  };

  try {
    yield call( toggleHideProduct, {
      url: productId,
      data
    } );
  }
  catch ( error ) {
    console.error( 'mybreville saga', error );
  }
}

export default setHideProduct;