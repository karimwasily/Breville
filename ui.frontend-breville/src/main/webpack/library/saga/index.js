import { all, call } from 'redux-saga/effects';
import payment from 'library/saga/payment';
import cart from 'library/saga/cart';
import ui from 'library/saga/ui';
import product from 'library/saga/product';
import bundle from 'library/saga/bundle';
import mybreville from 'library/saga/mybreville';
import checkout from 'library/saga/checkout';

/**
 * composes all the child sagas into a root saga
 */
export function* rootSaga() {

  try {


    yield all( [
      call( payment ),
      call( cart ),
      call( ui ),
      call( product ),
      call( bundle ),
      call( mybreville ),
      call( checkout )
    ] );

  }
  catch ( error ) {

    console.error( error );

  }

}

export default rootSaga;
