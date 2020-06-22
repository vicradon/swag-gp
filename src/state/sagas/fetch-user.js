import { call, put, takeLatest } from 'redux-saga/effects';
import getUserDetails from '../http/get_user_details';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* userDetailsFetcher() {
  try {
    const user = yield call(getUserDetails);
    yield put({ type: 'USER_FETCH_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* userDetailsFetcherSaga() {
  yield takeLatest('FETCH_USER_DETAILS', userDetailsFetcher);
}

export default userDetailsFetcherSaga;
