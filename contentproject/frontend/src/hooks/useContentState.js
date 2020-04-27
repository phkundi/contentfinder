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

  // Add new Content from Form
  const addContent = (content, contentQuery) => {
    axiosInstance
      .post(`/content/${contentQuery}/`, content, tokenConfig(auth.token))
      .then((res) => {
        dispatchMessages({ type: ADD_CONTENT, payload: res.data });
        dispatchMessages(
          createMessage({ contentAdded: "Submitted successfully" })
        );
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  // Delete Content
  const deleteContent = (id, contentQuery) => {
    axiosInstance
      .delete(`/content/${contentQuery}/${id}`, tokenConfig(auth.token))
      .then((res) => {
        dispatchMessages(
          createMessage({ contentDeleted: "Deleted successfully" })
        );
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  // Get content for specific user
  const getUserContent = (setState) => {
    axiosInstance.get("/content/user/", tokenConfig(auth.token)).then((res) => {
      setState(res.data);
    });
  };

  // Get all content matching filter & type
  const getContent = (query, filter, setState) => {
    axiosInstance.get(`content/${query}/`).then((res) => {
      if (filter) {
        const filteredContent = res.data.filter((content) =>
          content.tags.includes(filter)
        );
        setState(filteredContent);
      } else {
        setState(res.data);
      }
    });
  };

  return { addContent, getUserContent, getContent, deleteContent };
};

export default useContentState;
