import { CREATE_MESSAGE, GET_ERRORS } from "../reducers/types";

// setup config with token - helper function
export const tokenConfig = (auth) => {
  // get token from state
  const token = auth.token;

  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // IF token add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};
