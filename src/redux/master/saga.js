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
} from './action'

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
  ])
}