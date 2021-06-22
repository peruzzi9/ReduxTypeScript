import axios from "axios";
import { all, call, put, fork, takeLatest } from "redux-saga/effects";

import {
  logInFailure,
  logInSuccess,
  registerFailure,
  registerSuccess,
  logOutSuccess,
} from "../store/Auth/authAction";
import * as actionTypes from "../store/actionTypes";

const logIn = async (email, password) => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    console.log("axios logIn response====", response);
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      return { token: response.data.accessToken };
    } else return { error: response.data.error };
  } catch (error) {
    // bad request 400 or 500 server off
    console.log("axios logIn response error====", error);
    return { error: error.message };
  }
};

const removeTokenFromLocalstorage = async () => {
  // Logout process: Remove token from localStorage
  await localStorage.removeItem("token");
  return { token: null };
};

const register = async (email, username, password) => {
  try {
    const response = await axios.post("/auth/register", {
      email,
      username,
      password,
    });
    console.log("axios register response ====", response.data);
    return response.data;
  } catch(error)
   {
     // bad request 400 or 500 server off
     return {error:error.message}
   }
};

export function* logInWithCredentials({ payload: { email, password } }) {
  try {
    console.log("logInWithCredentials ====", email, password);
    const user = yield logIn(email, password);
    if (user.token) yield put(logInSuccess(user));
    else yield put(logInFailure(user.error));
    // or
    // yield put({ type: actionTypes.LOG_IN_SUCCESS, payload: user, } );
    // but we defined in authaction loginSuccess to return same object ... so we use loginSuccess
  } catch (error) {
    yield put(logInFailure(error));
  }
}

export function* logOutCleanStorage() {
  yield removeTokenFromLocalstorage();
  yield put(logOutSuccess()); // send to logout action ... defined in authaction
  // or we can call
  // yield put({ type: actionTypes.LOG_OUT_SUCCESS}) // send this action directly to authreducer
}

export function* registerWithCredentials({
  payload: { email, username, password },
}) {
  try {
    let response = yield register(email, username, password);
    if (!response.error)
      yield put(registerSuccess({ email, username, password }));
    else yield put(registerFailure(response.error));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

export function* logInAfterRegister({ payload: { email, password } }) {
  yield logInWithCredentials({ payload: { email, password } });
}

// ON LOG_OUT action clean token in localstorage and call LOG_OUT_SUCCESS action
export function* onLogOut() {
  yield takeLatest(actionTypes.LOG_OUT, logOutCleanStorage);
}

export function* onLogInStart() {
  yield takeLatest(actionTypes.LOG_IN_START, logInWithCredentials);
}

export function* onRegisterStart() {
  yield takeLatest(actionTypes.REGISTER_START, registerWithCredentials);
}

export function* onRegisterSuccess() {
  yield takeLatest(actionTypes.REGISTER_SUCCESS, logInAfterRegister);
}

export default function* authSaga() {
  yield all([
    fork(onLogInStart),
    fork(onRegisterStart),
    fork(onRegisterSuccess),
    fork(onLogOut),
  ]);
}
