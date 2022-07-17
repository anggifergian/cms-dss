import { all } from "redux-saga/effects";

import authSagas from "./auth/saga";
import masterSagas from './master/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    masterSagas(),
  ])
}