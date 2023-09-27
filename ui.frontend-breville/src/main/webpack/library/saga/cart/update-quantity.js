import { call, select, put } from 'redux-saga/effects';
import { pageLoading } from 'library/store/ui/actions';
import { updateQuantityRequest } from 'library/store/cart/service-request';
import { changeModalState } from 'library/store/ui/actions';
import { fetchData } from './index';
import { selectCartVersion } from 'library/store/cart/selector';

export function* updateCartQuantity( action = {} ){

  const { payload: { productId: lineItemId, quantity } = {} } = action;

  try {
    yield put( pageLoading( true ) );
    const version = yield select( selectCartVersion );
    const id = localStorage.getItem( 'cartID' );
    yield call( updateQuantityRequest, { variables: { id, version, lineItemId, quantity } } );
    yield changeModalState( lineItemId, false );
    yield call( fetchData );
  }
  catch ( error ){
    console.error( error );
    yield changeModalState( lineItemId, false );
    yield put( pageLoading( false ) );
  }

}