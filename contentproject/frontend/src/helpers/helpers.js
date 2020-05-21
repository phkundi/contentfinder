import { CREATE_MESSAGE, GET_ERRORS } from "../reducers/types";

// setup config with token - helper function
export const tokenConfig = (token) => {
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

export const tokenConfigWithFile = (token) => {
  // headers
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
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
    payload: { ...msg, show: true },
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, show: false },
  };
};

export const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
