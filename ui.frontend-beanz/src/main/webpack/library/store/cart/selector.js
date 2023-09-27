import { createSelector } from 'reselect';
import { SLICE_NAME } from './constant';
import get from 'lodash.get';

/**
 * Gets the sub-state slice from the store
 * @param {object} state global state
 * @returns {object} sub-state slice
 */
export const getStateSlice = ( state = {} ) => state[SLICE_NAME] || {};

// memoized selector of the sub-state slice
export const selectState = createSelector( getStateSlice, ( state ) => state );

export const selectResults = createSelector( selectState, ( { results } ) => results || {} );
export const selectActiveCart = createSelector( selectResults, ( state ) =>get( state, 'data.me.activeCart', {} ) );
export const selectProducts = createSelector( selectActiveCart, ( state ) => state.lineItems || [] );
export const selectDiscountedCode = createSelector( selectActiveCart, ( state ) => state.discountCodes || [] );
export const selectIsCartEmpty = createSelector( selectState, ( { cartEmpty } ) => cartEmpty );
export const selectTotalPrice = createSelector( selectActiveCart, ( state ) => state.totalPrice || {} );
export const selectShippingInfo = createSelector( selectActiveCart, ( state ) => state.shippingInfo || [] );
export const selectIsLoading = createSelector( selectState, ( { isLoading } ) => isLoading );
export const selectIsWrongPromoCode = createSelector( selectState, ( { wrongPromo } ) => wrongPromo );
export const selectProductsData = createSelector( selectState, ( state ) => state.productDetail || {} );
export const selectAuthUserName = createSelector( selectState, ( { authUserName } ) => authUserName );
