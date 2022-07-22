import { all } from "redux-saga/effects";

import authSagas from './auth/saga';
import masterSagas from './master/saga';
import playlistSagas from './playlist/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    masterSagas(),
    playlistSagas(),
  ])
}