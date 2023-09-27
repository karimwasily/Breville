import createReducer from '@breville-utils/redux-utility/createReducer';
import {
    CHANGE_MODAL_WINDOW,
    CHANGE_TOAST,
    PAGE_LOADING,
} from './action-types';

export const initialState = {
    modalState: {},
    pageLoading: false,
    toastState: {},
};

export const selectModal = (state, action) => {

    const { key, value } = action;
    const stateData = state.modalState;
    const currentValue = stateData[key];
    const combined = { modalState: { ...stateData, [key]: { ...currentValue, ...value } } };

    return {
        ...state,
        ...combined
    };

};

export const reducer = createReducer(
    {
        [CHANGE_TOAST]: ['toastState'],
        [CHANGE_MODAL_WINDOW]: selectModal,
        [PAGE_LOADING]: ['pageLoading'],
    },
    initialState
);

export default reducer;
