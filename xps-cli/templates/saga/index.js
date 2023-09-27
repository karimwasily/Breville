import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_REQUEST } from 'library/store/$comp-name/action-types';
import { fetchSuccess, fetchFail } from 'library/store/$comp-name/actions';

/**
 * Fetches data and publishes the successful result, or an error
 * @param {action} action the fetch data action definition
 * @param {function} getTime function that gets the current type
 */
export function* fetchData({ payload: { params = {} } }, getTime = () => undefined) {
    try {
        // your logics here
        yield put(fetchSuccess({}));
    } catch (error) {
        yield put(fetchFail(error, { time: getTime() }));
    }
}

/**
 * WATCHERS
 */

/**
 * Watcher subscribes to FETCH_REQUEST actions
 */
export function* watchSaga() {
    yield takeEvery(FETCH_REQUEST, fetchData);
}

export default watchSaga;
