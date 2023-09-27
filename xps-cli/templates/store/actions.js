import { createApiActions } from 'xps-utils/redux-utility/api';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL } from './action-types';

export const apiActions = createApiActions(FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL);
export const { fetchRequest, fetchFail, fetchSuccess } = apiActions;

export default apiActions;
