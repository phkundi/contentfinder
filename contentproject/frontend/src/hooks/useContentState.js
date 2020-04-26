import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { MessageContext } from "../context/messageContext";
import { ErrorContext } from "../context/errorContext";
import { tokenConfig, createMessage, returnErrors } from "../helpers/helpers";
import { axiosInstance } from "../axiosInstance";
import { ADD_CONTENT } from "../reducers/types";

const useContentState = () => {
  const { dispatchMessages } = useContext(MessageContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { auth } = useContext(AuthContext);

  const addContent = (content, contentQuery) => {
    axiosInstance
      .post(`/content/${contentQuery}/`, content, tokenConfig(auth.token))
      .then((res) => {
        dispatchMessages({ type: ADD_CONTENT, payload: res.data });
        dispatchMessages(
          createMessage({ contentAdded: "Submitted successfully" })
        );
        return res.data;
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };
  return { addContent };
};

export default useContentState;
