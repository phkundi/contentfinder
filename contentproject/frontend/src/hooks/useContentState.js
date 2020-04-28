import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { MessageContext } from "../context/messageContext";
import { ContentContext } from "../context/contentContext";
import { ErrorContext } from "../context/errorContext";
import { tokenConfig, createMessage, returnErrors } from "../helpers/helpers";
import { axiosInstance } from "../axiosInstance";
import { ADD_CONTENT, DELETE_CONTENT } from "../reducers/types";

const useContentState = () => {
  const { dispatchMessages } = useContext(MessageContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { auth } = useContext(AuthContext);
  const { content, dispatchContent } = useContext(ContentContext);

  // Add new Content from Form
  const addContent = (content) => {
    axiosInstance
      .post(`/content/posts/`, content, tokenConfig(auth.token))
      .then((res) => {
        dispatchContent({ type: ADD_CONTENT, payload: res.data });
        dispatchMessages(
          createMessage({ contentAdded: "Submitted successfully" })
        );
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  // Delete Content
  const deleteContent = (id) => {
    axiosInstance
      .delete(`/content/posts/${id}`, tokenConfig(auth.token))
      .then((res) => {
        dispatchContent({ type: DELETE_CONTENT, payload: id });
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
  const getContent = async ({ type = null, filter = null, setState }) => {
    let res = null;
    if (type) {
      res = await axiosInstance.get(`content/posts/?content=${type}`);
    } else {
      res = await axiosInstance.get("content/posts/");
    }
    if (filter) {
      const filteredContent = res.data.filter((content) =>
        content.tags.includes(filter)
      );
      setState(filteredContent);
    } else {
      setState(res.data);
    }
  };

  const getInfiniteContent = async ({
    type = null,
    filter = null,
    setContent,
    content,
    limit,
    offset,
    setOffset,
    setHasMore,
    setError,
    setLoading,
  }) => {
    let res = null;
    if (type) {
      res = await axiosInstance.get(
        `content/posts-infinite/?limit=${limit}&offset=${offset}&content=${type}`
      );
    } else {
      res = await axiosInstance.get(
        `content/posts-infinite/?limit=${limit}&offset=${offset}`
      );
    }

    try {
      const newContent = res.data.content;

      if (filter) {
        const filteredContent = newContent.filter((content) =>
          content.tags.includes(filter)
        );
        setContent(...content, ...filteredContent);
      } else {
        setContent([...content, ...newContent]);
      }

      setHasMore(res.data.has_more);
      setOffset(offset + limit);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filterContent = ({ filter, content, setContent }) => {
    const filteredContent = content.filter((c) => c.tags.includes(filter));
    setContent(filteredContent);
  };

  // Get all user likes - not currently used anywhere
  const getLikedContent = (setState) => {
    axiosInstance.get(`content/likes/?user_id=${auth.user.id}`).then((res) => {
      setState(res.data);
    });
  };

  // Get info about like instance if user liked the post
  const getUserLike = (postID, setLike) => {
    axiosInstance.get(`content/likes/?post_id=${postID}`).then((res) => {
      for (let like in res.data) {
        if (like["user"] !== auth.user["id"]) {
          setLike({
            liked: true,
            likeID: res.data[like].id,
            totalLikes: res.data.length,
          });
        } else {
          setLike({ liked: false, likeID: null, totalLikes: res.data.length });
        }
      }
    });
  };

  // Add Like
  const addLike = (postID, setLike, totalLikes) => {
    const body = JSON.stringify({
      post: postID,
      user: auth.user.id,
    });

    axiosInstance
      .post("content/likes/", body, tokenConfig(auth.token))
      .then((res) => {
        setLike({
          liked: true,
          likeID: res.data.id,
          totalLikes: totalLikes + 1,
        });
      });
  };

  // Delete Like
  const deleteLike = (id, setLike, totalLikes) => {
    axiosInstance
      .delete(`content/likes/${id}`, tokenConfig(auth.token))
      .then((res) => {
        setLike({ liked: false, likeID: null, totalLikes: totalLikes - 1 });
      });
  };

  return {
    addContent,
    getUserContent,
    getContent,
    getInfiniteContent,
    deleteContent,
    getUserLike,
    deleteLike,
    addLike,
    getLikedContent,
    filterContent,
  };
};

export default useContentState;
