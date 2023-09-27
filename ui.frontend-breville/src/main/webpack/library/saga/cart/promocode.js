import { call, select, put } from 'redux-saga/effects';
import { pageLoading } from 'library/store/ui/actions';
import { addPromoCodeRequest, removePromoCodeRequest } from 'library/store/cart/service-request';
import { fetchData } from './index';
import { selectCartVersion } from 'library/store/cart/selector';

export function* addPromoCode( action = {} ){

  const { payload: { addCallback, code: code } = {} } = action;

  try {
    yield put( pageLoading( true ) );
    const version = yield select( selectCartVersion );
    const id = localStorage.getItem( 'cartID' );
    const response = yield call( addPromoCodeRequest, { variables: { id, version, code } } );
    if ( addCallback ) addCallback( response );
    yield call( fetchData );
  }
  catch ( error ){
    console.error( error );
    yield put( pageLoading( false ) );
  }

}

export function* removePromoCode( action = {} ){

  const { payload: { removeCallback, code: code } = {} } = action;

  try {
    yield put( pageLoading( true ) );
    const version = yield select( selectCartVersion );
    const id = localStorage.getItem( 'cartID' );
    const response = yield call( removePromoCodeRequest, { variables: { id, version, code } } );
    if ( removeCallback ) removeCallback( response );
    yield call( fetchData );
  }
  catch ( error ){
    console.error( error );
    yield put( pageLoading( false ) );
  }

}