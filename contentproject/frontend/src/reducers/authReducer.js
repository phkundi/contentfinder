import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  DELETE_USER,
} from "./types";

function authReducer(state, action) {
  switch (action.type) {
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUser", action.payload.user);
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case DELETE_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
}
export default authReducer;
