import { call, put, select } from 'redux-saga/effects';
import { makePayment } from './make-payment';
import { createOrderService } from 'library/store/payment/service-request';
import { selectCartVersion } from 'library/store/cart/selector';
import { selectLocale } from 'library/store/global/selector';
import { selectCardAuthorized, selectPaymentDetail, selectPaypalAuthorized, selectActivePayment } from 'library/store/payment/selector';
import { setOrderDetail } from 'library/store/cart/actions';
import { pageLoading } from 'library/store/ui/actions';
import { confirmAffirmPayment } from './affirm';
import Router from 'router';

export function* placeOrder(){
  try {
    yield put( pageLoading( true ) );
    yield call( confirmAffirmPayment );
    yield call( makePayment );
    const locale = yield select( selectLocale );
    const cartVersion = yield select( selectCartVersion );
    const isCardAuthorized = yield select( selectCardAuthorized );
    const isPaypalAuthorized = yield select( selectPaypalAuthorized );
    const activePayment = yield select( selectActivePayment );
    const paymentDetail = yield select( selectPaymentDetail );
    const { submitCreditCard } = paymentDetail;
    if ( submitCreditCard && !isCardAuthorized ) return null;
    if ( activePayment !== 'PayPal' && isPaypalAuthorized !== undefined ) return null;

    const orderDetail = yield call( createOrderService, {
      variables: {
        id: localStorage.getItem( 'cartID' ),
        version: parseInt( cartVersion ),
        locale
      }
    } );
    yield put( pageLoading( false ) );
    yield put( setOrderDetail( orderDetail?.data?.createMyOrderFromCart ) );
    Router.push( '/order-confirmation' );
    localStorage.removeItem( 'paymentVersion' );
    localStorage.removeItem( 'paymentVersionId' );
    localStorage.removeItem( 'cartID' );
    localStorage.removeItem( 'affirmVersion' );
    localStorage.removeItem( 'affirmVersionId' );
    localStorage.removeItem( '__paypal_storage__' );
    localStorage.removeItem( '__belter_experiment_storage__' );
  }
  catch ( error ){
    yield put( pageLoading( false ) );
  }

}