import { call, put, takeEvery, all, fork, race } from "redux-saga/effects";

import {
  delay,
  buildUrl,
  buildHeaders,
  checkStatus,
} from '../../utils/helpers'

import {
  requestListCompany,
  successListCompany,
  failureListCompany,
  requestListRegion,
  successListRegion,
  failureListRegion,
  requestListBranch,
  successListBranch,
  failureListBranch,
  requestListDevice,
  successListDevice,
  failureListDevice,
  requestListPosition,
  successListPosition,
  failureListPosition,
  requestListResource,
  successListResource,
  failureListResource,
} from './action'

function* getListResource() {
  yield takeEvery(requestListResource.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/resource/getResource')
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

        yield put(successListResource(payload))
      } else {
        yield put(failureListResource(timeout))
      }
    } catch (error) {
      yield put(failureListResource(error))
    }
  })
}

function* getListPosition() {
  yield takeEvery(requestListPosition.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/position/getPosition')
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

        yield put(successListPosition(payload))
      } else {
        yield put(failureListPosition(timeout))
      }
    } catch (error) {
      yield put(failureListPosition(error))
    }
  })
}

function* getListDevice() {
  yield takeEvery(requestListDevice.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/device/getDevice')
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

        yield put(successListDevice(payload))
      } else {
        yield put(failureListDevice(timeout))
      }
    } catch (error) {
      yield put(failureListDevice(error))
    }
  })
}

function* getListBranch() {
  yield takeEvery(requestListBranch.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/branch/getBranch')
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

        yield put(successListBranch(payload))
      } else {
        yield put(failureListBranch(timeout))
      }
    } catch (error) {
      yield put(failureListBranch(error))
    }
  })
}

function* getListRegion() {
  yield takeEvery(requestListRegion.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/region/getRegion')
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

        yield put(successListRegion(payload))
      } else {
        yield put(failureListRegion(timeout))
      }
    } catch (error) {
      yield put(failureListRegion(error))
    }
  })
}

function* getListCompany() {
  yield takeEvery(requestListCompany.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/company/getCompany')
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

        yield put(successListCompany(payload))
      } else {
        yield put(failureListCompany(timeout))
      }
    } catch (error) {
      yield put(failureListCompany(error))
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(getListCompany),
    fork(getListRegion),
    fork(getListBranch),
    fork(getListDevice),
    fork(getListPosition),
    fork(getListResource),
  ])
}