import { all, call } from 'redux-saga/effects';
import cart from 'library/saga/cart';
import checkout from 'library/saga/checkout';
import subscription from 'library/saga/subscription';
import user from 'library/saga/user';

/**
 * composes all the child sagas into a root saga
 */
export function* rootSaga() {

  try {

    yield all( [
      call( cart ), call(subscription), call(checkout), call(user)
    ] );
    
  }
  catch ( error ) {

    console.error( error );

  }

}

export default rootSaga;
