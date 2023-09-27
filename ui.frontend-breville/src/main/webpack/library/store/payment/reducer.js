import createReducer from 'xps-utils/redux-utility/createReducer';
import { FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_ACTIVE_PAYMENT,
  SET_PAYMENT_DETAIL,
  SET_CARD_INFO,
  SET_CARD_AUTHORIZED,
  SET_PAYPAL_AUTHORIZED,
  SET_MASKED_CARD_DETAILS
} from './action-types';
import { createInitialState, createApiActionMap } from 'xps-utils/redux-utility/api';

export const initialState = createInitialState();

// create reducer with standard API action handlers (fetch, success, fail).  See library/redux/utils/api#createApiActionMap for details
export const reducer = createReducer(
  {
    ...createApiActionMap( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL ),
    [SET_ACTIVE_PAYMENT]: ['activePayment'],
    [SET_PAYMENT_DETAIL]: ['paymentDetail'],
    [SET_CARD_INFO]: ['cardInfo'],
    [SET_MASKED_CARD_DETAILS]: ['maskedCardDetails'],
    [SET_CARD_AUTHORIZED]: ['cardAuthorized'],
    [SET_PAYPAL_AUTHORIZED]: ['paypalAuthorized']
  },
  initialState,
);

export default reducer;
