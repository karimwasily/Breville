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

export const selectResults = createSelector(selectState, ({ results }) => results || {});

export const selectIsLoading = createSelector(selectState, ({ isLoading }) => isLoading);
