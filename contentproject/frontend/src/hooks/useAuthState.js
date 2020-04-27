import { useContext } from "react";
import { ErrorContext } from "../context/errorContext";
import { MessageContext } from "../context/messageContext";
import { AuthContext } from "../context/authContext";
import { axiosInstance } from "../axiosInstance";
import { tokenConfig, returnErrors, createMessage } from "../helpers/helpers";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  DELETE_USER,
} from "../reducers/types";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { dispatchMessages } = useContext(MessageContext);

  // Load User
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

  // Login User
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

  // Logout User
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

  // Register User
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

  // Update User
  const updateUser = ({ username, email, firstName, lastName, bio }) => {
    const body = JSON.stringify({
      user: {
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
      },
      profile: { bio: bio },
    });

    axiosInstance
      .patch("/auth/user/", body, tokenConfig(auth.token))
      .then((res) => {
        dispatchAuth({ type: USER_UPDATE_SUCCESS, payload: res.data });
        dispatchMessages(createMessage({ userUpdated: "Profile Updated" }));
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
        dispatchAuth({ type: USER_UPDATE_FAIL });
      });
  };

  // Delete User
  const deleteUser = () => {
    axiosInstance
      .delete("/auth/user", tokenConfig(auth.token))
      .then((res) => {
        dispatchAuth({ type: DELETE_USER });
        dispatchMessages(
          createMessage({ userDeleted: "Your account has been deleted" })
        );
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  return {
    loadUser,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
    deleteUser,
    auth,
  };
};

export default useAuthState;
