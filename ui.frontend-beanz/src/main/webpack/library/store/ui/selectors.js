import { createSelector } from 'reselect';
import { SLICE_NAME } from './constants';

export const getStateSlice = (state) => state[SLICE_NAME] || {};

export const selectToastState = createSelector(
    getStateSlice,
    ({ toastState }) => toastState
);

export const selectPageLoading = createSelector(
    getStateSlice,
    ({ pageLoading }) => pageLoading
);

export const selectModalOpenState = (modalKey) => createSelector(
    getStateSlice,
    ({ modalState = {} }) => {
        const current = modalState[modalKey] || {}
        return current.isOpen
    }
);

export const selectModalLoadingState = (modalKey) => createSelector(
    getStateSlice,
    ({ modalState }) => {
        const current = modalState[modalKey] || {}
        return current.isLoading
    }
);
