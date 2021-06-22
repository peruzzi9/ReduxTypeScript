import * as actionTypes from '../actionTypes';

export const logInStart = (credentials) => ({
  type: actionTypes.LOG_IN_START,
  payload: credentials,
});

export const logInSuccess = (user) => ({
  type: actionTypes.LOG_IN_SUCCESS,
  payload: user,
});

export const logInFailure = (error) => ({
  type: actionTypes.LOG_IN_FAILURE,
  payload: error,
});

export const registerStart = (credentials) => ({
  type: actionTypes.REGISTER_START,
  payload: credentials,
});

export const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: actionTypes.REGISTER_FAILURE,
  payload: error,
});

export const logOut = () => {
  return {
  type: actionTypes.LOG_OUT,
}
};
export const logOutSuccess = () => {
  return {
  type: actionTypes.LOG_OUT_SUCCESS,
}
};