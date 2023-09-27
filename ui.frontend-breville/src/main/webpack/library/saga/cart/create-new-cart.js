import { call, put } from 'redux-saga/effects';
import { pageLoading } from 'library/store/ui/actions';
import { createNewCartRequest } from 'library/store/cart/service-request';
import { setWait } from 'library/store/cart/actions';


export function* createNewCart( { payload: { params = {} } } ){
  try {
    const { options } = params;

    console.log( 'options', params );


    yield put( pageLoading( true ) );
    const response = yield call( createNewCartRequest, options );

    localStorage.setItem( 'cartID', response.data.createMyCart.id );

    yield put( pageLoading( false ) );
    yield put( setWait( false ) );

  }
  catch ( error ){
    console.error( error );
    yield put( pageLoading( false ) );
  }
}
