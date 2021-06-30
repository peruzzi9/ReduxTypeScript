import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  currentUser: localStorage.getItem("token")?localStorage.getItem("token"): null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case actionTypes.LOG_IN_FAILURE:
    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.LOG_OUT:
      return {
        currentUser: null,
        error: null,
      };
      // on LOG_OUT_FAILED  do nothing
    default:
      return state;
  }
};

export default authReducer;