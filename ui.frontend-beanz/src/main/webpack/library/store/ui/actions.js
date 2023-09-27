import {
    CHANGE_MODAL_WINDOW,
    CHANGE_TOAST,
    PAGE_LOADING,
} from './action-types';
import actionCreator from '@breville-utils/redux-utils/createAction';

/** Always create actions with action creator unlesss action has custom logics */
export const changeToast = actionCreator(CHANGE_TOAST, 'toastState');
export const pageLoading = actionCreator(PAGE_LOADING, 'pageLoading');

export const changeModalState = (key, value) => ({
    type: CHANGE_MODAL_WINDOW,
    payload: {
        key,
        value: { isOpen: value }
    }
});

export const changeModalLoading = (key, value) => ({
    type: CHANGE_MODAL_WINDOW,
    payload: {
        key,
        value: { isLoading: value }
    }
});