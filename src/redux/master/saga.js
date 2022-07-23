import { call, put, takeEvery, all, fork, race } from "redux-saga/effects";

import {
  delay,
  buildUrl,
  buildHeaders,
  checkStatus,
  notifyError,
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
  requestDeleteCompany,
  successDeleteCompany,
  failureDeleteCompany,
  requestCreateCompany,
  successCreateCompany,
  failureCreateCompany,
  requestCreateRegion,
  successCreateRegion,
  failureCreateRegion,
  requestDeleteRegion,
  successDeleteRegion,
  failureDeleteRegion,
  requestListPromo,
  successListPromo,
  failureListPromo,
  requestCreatePromo,
  successCreatePromo,
  failureCreatePromo,
  requestDeletePromo,
  successDeletePromo,
  failureDeletePromo,
  requestCreateBranch,
  successCreateBranch,
  failureCreateBranch,
  requestDeleteBranch,
  successDeleteBranch,
  failureDeleteBranch,
  requestDeleteDevice,
  requestDeletePosition,
  requestDeleteResource,
  successDeleteResource,
  failureDeleteResource,
  successDeletePosition,
  failureDeletePosition,
  successDeleteDevice,
  failureDeleteDevice,
  requestCreateResource,
  requestCreatePosition,
  requestCreateDevice,
  successCreateResource,
  failureCreateResource,
  successCreatePosition,
  failureCreatePosition,
  successCreateDevice,
  failureCreateDevice,
  requestCreateUser,
  requestDeleteUser,
  requestListUser,
  successCreateUser,
  failureCreateUser,
  successDeleteUser,
  failureDeleteUser,
  successListUser,
  failureListUser,
} from './action'

function* callApi(url, body, method = 'POST') {
  const headers = yield call(buildHeaders)

  const { response, timeout } = yield race({
    response: call(fetch, url, {
      method,
      headers,
      body,
    }),
    timeout: call(delay, 10000),
  })

  return {
    response,
    timeout,
  }
}

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

function* addResource() {
  yield takeEvery(requestCreateResource.type, function* ({ payload }) {
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

        yield put(successCreateResource(payload))
        notifyError('success', 'Resource created!')
      } else {
        yield put(failureCreateResource(timeout))
      }
    } catch (error) {
      yield put(failureCreateResource(error))
      notifyError('error', error.message)
    }
  })
}

function* deleteResource() {
  yield takeEvery(requestDeleteResource.type, function* ({ payload }) {
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

        yield put(successDeleteResource(payload))
        notifyError('success', 'Resource deleted!')
      } else {
        yield put(failureDeleteResource(timeout))
      }
    } catch (error) {
      yield put(failureDeleteResource(error))
      notifyError('error', error.message)
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

function* addPosition() {
  yield takeEvery(requestCreatePosition.type, function* ({ payload }) {
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

        yield put(successCreatePosition(payload))
        notifyError('success', 'Position created!')
      } else {
        yield put(failureCreatePosition(timeout))
      }
    } catch (error) {
      yield put(failureCreatePosition(error))
      notifyError('error', error.message)
    }
  })
}

function* deletePosition() {
  yield takeEvery(requestDeletePosition.type, function* ({ payload }) {
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

        yield put(successDeletePosition(payload))
        notifyError('success', 'Position deleted!')
      } else {
        yield put(failureDeletePosition(timeout))
      }
    } catch (error) {
      yield put(failureDeletePosition(error))
      notifyError('error', error.message)
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

function* addDevice() {
  yield takeEvery(requestCreateDevice.type, function* ({ payload }) {
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

        yield put(successCreateDevice(payload))
        notifyError('success', 'Device created!')
      } else {
        yield put(failureCreateDevice(timeout))
      }
    } catch (error) {
      yield put(failureCreateDevice(error))
      notifyError('error', error.message)
    }
  })
}

function* deleteDevice() {
  yield takeEvery(requestDeleteDevice.type, function* ({ payload }) {
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

        yield put(successDeleteDevice(payload))
        notifyError('success', 'Device deleted!')
      } else {
        yield put(failureDeleteDevice(timeout))
      }
    } catch (error) {
      yield put(failureDeleteDevice(error))
      notifyError('error', error.message)
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

function* addBranch() {
  yield takeEvery(requestCreateBranch.type, function* ({ payload }) {
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

        yield put(successCreateBranch(payload))
        notifyError('success', 'Branch created!')
      } else {
        yield put(failureCreateBranch(timeout))
      }
    } catch (error) {
      yield put(failureCreateBranch(error))
      notifyError('error', error.message)
    }
  })
}

function* deleteBranch() {
  yield takeEvery(requestDeleteBranch.type, function* ({ payload }) {
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

        yield put(successDeleteBranch(payload))
        notifyError('success', 'Branch deleted!')
      } else {
        yield put(failureDeleteBranch(timeout))
      }
    } catch (error) {
      yield put(failureDeleteBranch(error))
      notifyError('error', error.message)
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

function* addRegion() {
  yield takeEvery(requestCreateRegion.type, function* ({ payload }) {
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

        yield put(successCreateRegion(payload))
        notifyError('success', 'Region created!')
      } else {
        yield put(failureCreateRegion(timeout))
      }
    } catch (error) {
      yield put(failureCreateRegion(error))
      notifyError('error', error.message)
    }
  })
}

function* deleteRegion() {
  yield takeEvery(requestDeleteRegion.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/region/deleteRegion')
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

        yield put(successDeleteRegion(payload))
        notifyError('success', 'Region deleted!')
      } else {
        yield put(failureDeleteRegion(timeout))
      }
    } catch (error) {
      yield put(failureDeleteRegion(error))
      notifyError('error', error.message)
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

function* addCompany() {
  yield takeEvery(requestCreateCompany.type, function* ({ payload }) {
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

        yield put(successCreateCompany(payload))
        notifyError('success', 'Company created!')
      } else {
        yield put(failureCreateCompany(timeout))
      }
    } catch (error) {
      yield put(failureCreateCompany(error))
      notifyError('error', error.message)
    }
  })
}

function* deleteCompany() {
  yield takeEvery(requestDeleteCompany.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/company/deleteCompany')
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

        yield put(successDeleteCompany(payload))
        notifyError('success', 'Company deleted!')
      } else {
        yield put(failureDeleteCompany(timeout))
      }
    } catch (error) {
      yield put(failureDeleteCompany(error))
      notifyError('error', error.message)
    }
  })
}

// Promo
function* getListPromo() {
  yield takeEvery(requestListPromo.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/promo/getPromo')
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

        yield put(successListPromo(payload))
      } else {
        yield put(failureListPromo(timeout))
      }
    } catch (error) {
      yield put(failureListPromo(error))
    }
  })
}

function* addPromo() {
  yield takeEvery(requestCreatePromo.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/promo/addNewPromo')
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

        yield put(successCreatePromo(payload))
        notifyError('success', 'Promo created!')
      } else {
        yield put(failureCreatePromo(timeout))
      }
    } catch (error) {
      yield put(failureCreatePromo(error))
      notifyError('error', error.message)
    }
  })
}

function* deletePromo() {
  yield takeEvery(requestDeletePromo.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/promo/deletePromo')
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

        yield put(successDeletePromo(payload))
        notifyError('success', 'Promo deleted!')
      } else {
        yield put(failureDeletePromo(timeout))
      }
    } catch (error) {
      yield put(failureDeletePromo(error))
      notifyError('error', error.message)
    }
  })
}

function* addUser() {
  yield takeEvery(requestCreateUser.type, function* ({ payload }) {
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

        yield put(successCreateUser(payload))
        notifyError('success', 'User created!')
      } else {
        yield put(failureCreateUser(timeout))
      }
    } catch (error) {
      yield put(failureCreateUser(error))
      notifyError('error', error)
    }
  })
}

function* deleteUser() {
  yield takeEvery(requestDeleteUser.type, function* ({ payload }) {
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

        yield put(successDeleteUser(payload))
        notifyError('success', 'User deleted!')
      } else {
        yield put(failureDeleteUser(timeout))
      }
    } catch (error) {
      yield put(failureDeleteUser(error))
      notifyError('error', error)
    }
  })
}

function* getListUser() {
  yield takeEvery(requestListUser.type, function* ({ payload }) {
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

        yield put(successListUser(payload))
      } else {
        yield put(failureListUser(timeout))
      }
    } catch (error) {
      yield put(failureListUser(error))
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(addCompany),
    fork(addRegion),
    fork(addPromo),
    fork(addBranch),
    fork(addDevice),
    fork(addPosition),
    fork(addResource),
    fork(addUser),
    fork(deleteCompany),
    fork(deleteRegion),
    fork(deletePromo),
    fork(deleteBranch),
    fork(deleteDevice),
    fork(deletePosition),
    fork(deleteResource),
    fork(deleteUser),
    fork(getListCompany),
    fork(getListRegion),
    fork(getListBranch),
    fork(getListDevice),
    fork(getListPosition),
    fork(getListResource),
    fork(getListPromo),
    fork(getListUser),
  ])
}