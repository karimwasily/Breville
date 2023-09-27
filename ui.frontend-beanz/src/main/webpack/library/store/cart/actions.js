import { createApiActions } from 'xps-utils/redux-utility/api';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, UPDATE_LINEITEM,UPDATE_QUANTITYOFBAGS,UPDATE_GRIND, DELETE_CART, MERGE_CART, ADD_PROMO, REMOVE_PROMO, IS_LOADING, WRONG_PROMO, GET_PRODUCT, ADD_PRODUCT, CART_EMPTY, AUTH_USERNAME } from './action-types';
import actionCreator from 'xps-utils/redux-utility/createAction';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const updateLineItem = actionCreator( UPDATE_LINEITEM, 'params', 'productSku', 'productQuantity', 'productGrind', 'select_value'  );
export const updateQuantityOfBags = actionCreator( UPDATE_QUANTITYOFBAGS, 'params', 'productSku', 'productQuantity', 'productGrind', 'select_value'  );
export const updateGrind = actionCreator( UPDATE_GRIND, 'params', 'productSku', 'productQuantity', 'productGrind', 'select_value'  );
export const deleteCart = actionCreator( DELETE_CART, 'params' );
export const mergeCart = actionCreator( MERGE_CART, 'params' );
export const getProduct = actionCreator( GET_PRODUCT, 'params', 'skuId' );
export const addPromo = actionCreator( ADD_PROMO, 'params' );
export const removePromo = actionCreator( REMOVE_PROMO, 'params' );
export const setLoading = actionCreator( IS_LOADING, 'isLoading' );
export const setCartEmpty = actionCreator( CART_EMPTY, 'cartEmpty' );
export const addProducts = actionCreator( ADD_PRODUCT, 'productDetail' );
export const setWrongPromoCodeStyle = actionCreator( WRONG_PROMO, 'wrongPromo' );
export const showAuthUserName = actionCreator( AUTH_USERNAME, 'authUserName' );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export default apiActions;
