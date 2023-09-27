import { createApiActions } from 'xps-utils/redux-utility/api';
import actionCreator from 'xps-utils/redux-utility/createAction';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL, FETCH_PRODUCT_PARENT, SET_PRODUCT_PARENT, SET_PRODUCT_VARIANT, SET_PRODUCT_VARIANT_VIA_SKU, SET_VARIANTS, ADD_LINE_ITEM } from './action-types';

export const apiActions = createApiActions( FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL );
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export const fetchProductParent = actionCreator( FETCH_PRODUCT_PARENT );
export const setProductParent = actionCreator( SET_PRODUCT_PARENT, 'productParent' );
export const setVariants = actionCreator( SET_VARIANTS, 'variants' );
export const setProductVariant = actionCreator( SET_PRODUCT_VARIANT, 'productVariant' );

export const setProductVariantViaSKU = actionCreator( SET_PRODUCT_VARIANT_VIA_SKU, 'productVariantSKU' );
export const setLineItemInCart = actionCreator( ADD_LINE_ITEM );

export default apiActions;
