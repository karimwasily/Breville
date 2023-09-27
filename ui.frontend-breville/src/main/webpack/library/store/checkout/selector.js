import { createSelector } from 'reselect';
import { SLICE_NAME } from './constant';

/**
 * Gets the sub-state slice from the store
 * @param {object} state global state
 * @returns {object} sub-state slice
 */
export const getStateSlice = (state = {}) => state[SLICE_NAME] || {};

// memoized selector of the sub-state slice
export const selectState = createSelector(getStateSlice, (state) => state);

export const selectIsValid = createSelector(selectState, (state) => state.isValid);

export const selectCheckoutLoading = createSelector(selectState, (state) => state.checkoutLoading);

export const selectIsDirty = createSelector(selectState, (state) => state.isDirty);

export const selectCurIndex = createSelector(selectState, (state) => state.curIndex);

export const selectShippingMethods = createSelector( selectState, ( state ) => state.shippingMethods );
