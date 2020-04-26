import { useContext } from "react";
import { ErrorContext } from "../context/errorContext";
import { AuthContext } from "../context/authContext";
import { axiosInstance } from "../axiosInstance";
import { tokenConfig, returnErrors } from "../helpers/helpers";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../reducers/types";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchErrors } = useContext(ErrorContext);

  const loadUser = () => {
    const token = auth.token || localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/auth/user/", tokenConfig(token))
        .then((res) => {
          dispatchAuth({ type: USER_LOADED, payload: res.data });
        })
        .catch((err) => {
          dispatchErrors(returnErrors(err.response.data, err.response.status));
          dispatchAuth({ type: AUTH_ERROR });
        });
    }
  };

  const loginUser = (username, password) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({
      username,
      password,
    });

    axiosInstance
      .post("/auth/login/", body, config)
      .then((res) => {
        dispatchAuth({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
        dispatchAuth({ type: LOGIN_FAIL });
      });
  };

  const logoutUser = () => {
    axiosInstance
      .post("/auth/logout/", null, tokenConfig(auth.token))
      .then((res) => {
        dispatchAuth({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  const registerUser = ({ username, password, email }) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({
      username,
      password,
      email,
    });

    axiosInstance
      .post("/auth/register/", body, config)
      .then((res) => {
        dispatchAuth({ type: REGISTER_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
        dispatchAuth({ type: REGISTER_FAIL });
      });
  };

  return {
    loadUser,
    loginUser,
    logoutUser,
    registerUser,
    auth,
  };
};

export default useAuthState;
