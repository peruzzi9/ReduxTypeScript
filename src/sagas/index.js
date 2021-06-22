import { all } from 'redux-saga/effects';

import newsSaga from "./news"
import authSaga from "./Auth"

export default function* rootSaga() {
   yield all([
    newsSaga(),
    authSaga(),
   ]);
}

