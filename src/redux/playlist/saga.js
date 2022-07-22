import { call, put, takeEvery, all, fork, race } from "redux-saga/effects";

import {
  delay,
  buildUrl,
  buildHeaders,
  checkStatus,
  notifyError,
} from '../../utils/helpers';

import {
  requestListPlaylist,
  successListPlaylist,
  failureListPlaylist,
  requestCreatePlaylist,
  successCreatePlaylist,
  failureCreatePlaylist,
  requestDeletePlaylist,
  successDeletePlaylist,
  failureDeletePlaylist
} from './action'

function* deletePlaylist() {
  yield takeEvery(requestDeletePlaylist.type, function* ({ payload }) {
    try {
      const { data, endpoint } = payload
      const body = JSON.stringify(data)
      const url = yield call(buildUrl, endpoint)
      const headers = yield call(buildHeaders)

      const { response, timeout } = yield race({
        response: call(fetch, url, {
          method: 'POST',
          headers,
          body,
        }),
        timeout: call(delay, 10000),
      })

      if (response) {
        const json = yield call(response.json.bind(response));
        const payload = yield call(checkStatus, json);

        yield put(successDeletePlaylist(payload))
      } else {
        yield put(failureDeletePlaylist(timeout))
        notifyError('success', 'Playlist delete!')
      }
    } catch (error) {
      yield put(failureDeletePlaylist(error))
      notifyError('error', error.message)
    }
  })
}

function* createPlaylist() {
  yield takeEvery(requestCreatePlaylist.type, function* ({ payload }) {
    try {
      const { data, endpoint } = payload
      const body = JSON.stringify(data)
      const url = yield call(buildUrl, endpoint)
      const headers = yield call(buildHeaders)

      const { response, timeout } = yield race({
        response: call(fetch, url, {
          method: 'POST',
          headers,
          body,
        }),
        timeout: call(delay, 10000),
      })

      if (response) {
        const json = yield call(response.json.bind(response));
        const payload = yield call(checkStatus, json);

        yield put(successCreatePlaylist(payload))
        notifyError('success', 'Playlist created!')
      } else {
        yield put(failureCreatePlaylist(timeout))
      }
    } catch (error) {
      yield put(failureCreatePlaylist(error))
      notifyError('error', error.message)
    }
  })
}

function* getListPlaylist() {
  yield takeEvery(requestListPlaylist.type, function* ({ payload }) {
    try {
      const { data, endpoint } = payload
      const body = JSON.stringify(data)
      const url = yield call(buildUrl, endpoint)
      const headers = yield call(buildHeaders)

      const { response, timeout } = yield race({
        response: call(fetch, url, {
          method: 'POST',
          headers,
          body,
        }),
        timeout: call(delay, 10000),
      })

      if (response) {
        const json = yield call(response.json.bind(response));
        const payload = yield call(checkStatus, json);

        yield put(successListPlaylist(payload))
      } else {
        yield put(failureListPlaylist(timeout))
      }
    } catch (error) {
      yield put(failureListPlaylist(error))
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(deletePlaylist),
    fork(createPlaylist),
    fork(getListPlaylist)
  ])
}