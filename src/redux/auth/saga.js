import { call, put, takeEvery, all, fork, race } from "redux-saga/effects";
import { push } from "connected-react-router";
import cookie from "react-cookies";

import {
  delay,
  buildUrl,
  getToken,
  getUser,
  buildHeaders,
  checkStatus,
  setExpired,
  APP_TOKEN,
  APP_USER,
  clearToken,
} from "../../utils/helpers";

import {
  checkAuthorization as checkAuth,
  failureLogin,
  requestLogin,
  successLogin,
  setToken,
  setUser,
  logout as LOGOUT
} from "./action";

function* checkAuthorization() {
  yield takeEvery(checkAuth.type, function* () {
    const token = getToken()
    const user = getUser()

    if (token) {
      yield put(setToken(token))
    }

    if (user) {
      yield put(setUser(user))
    }
  })
}

function* loginRequest() {
  yield takeEvery(requestLogin.type, function* ({ payload }) {
    try {
      const body = JSON.stringify(payload)
      const url = yield call(buildUrl, '/Users/loginUsers')
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
        const expires = yield call(setExpired, 1);

        const { data } = payload
        const token = data.user_data[0].user_token;
        const user = {
          profile: {
            id: data.user_data[0].user_id,
            name: data.user_data[0].user_name,
            fullName: data.user_data[0].user_full_name,
            email: data.user_data[0].user_email,
            status: data.user_data[0].status,
          },
          branch_id: data.user_data[0].branch_id
        }

        if (data.user_role.length) {
          user.role = {
            id: data.user_role[0].role_id,
            name: data.user_role[0].role_name
          }
        }

        yield put(successLogin(token))
        yield put(setUser(user))

        cookie.save(APP_TOKEN, token, { path: "/", expires });
        cookie.save(APP_USER, user, { path: "/", expires });

        yield put(push("/"));
      } else {
        yield put(failureLogin(timeout))
      }
    } catch (error) {
      yield put(failureLogin(error))
    }
  })
}

function* logoutRequest() {
  yield takeEvery(LOGOUT.type, function* () {
    yield clearToken();
    window.location.href = "/";
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(logoutRequest)
  ])
}