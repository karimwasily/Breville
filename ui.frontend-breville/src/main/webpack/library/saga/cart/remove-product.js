import { call, select, put } from 'redux-saga/effects';
import { pageLoading } from 'library/store/ui/actions';
import { removeProductRequest, removeBundleRequest } from 'library/store/cart/service-request';
import { changeModalState } from 'library/store/ui/actions';
import { fetchData } from './index';
import { selectCartVersion } from 'library/store/cart/selector';

export function* removeProduct( action = {} ){

  try {
    const { payload: { productId, isDynamicBundle } = {} } = action;
    const serviceRequest = isDynamicBundle ? removeBundleRequest : removeProductRequest;
    const lineItemId = isDynamicBundle ? JSON.stringify( productId ) : productId;
    yield put( pageLoading( true ) );
    const version = yield select( selectCartVersion );
    const id = localStorage.getItem( 'cartID' );
    yield call( serviceRequest, { variables: { id, version, lineItemId } } );
    yield put( changeModalState( productId, false ) );
    yield call( fetchData );
  }
  catch ( error ){
    console.error( error );
    yield changeModalState( productId, false );
    yield put( pageLoading( false ) );
  }

}