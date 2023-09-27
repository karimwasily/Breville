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

export const selectSubscriptions = createSelector( selectState, ( { results } ) => get(results, 'data',[] ));
export const selectNextDates = createSelector( selectState, ( { results } ) => get(results, 'data.NextOrders',[] ));
export const selectOrders = createSelector( selectState, ( { results } ) => get(results, 'data',[] ));


export const selectIsLoading = createSelector( selectState, ( { isLoading } ) => isLoading );
