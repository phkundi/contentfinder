import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { MessageContext } from "../context/messageContext";
import { ErrorContext } from "../context/errorContext";
import { tokenConfig, createMessage, returnErrors } from "../helpers/helpers";
import { axiosInstance } from "../axiosInstance";

const useContentState = () => {
  const { dispatchMessages } = useContext(MessageContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { auth } = useContext(AuthContext);

  // Add new Content from Form
  const addContent = (content) => {
    axiosInstance
      .post(`/content/posts/`, content, tokenConfig(auth.token))
      .then((res) => {
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
        dispatchMessages(
          createMessage({ contentDeleted: "Deleted successfully" })
        );
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  const getSinglePost = (id, setContent) => {
    axiosInstance.get(`content/posts/${id}`).then((res) => {
      setContent(res.data);
    });
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

  // Get user content by slices to make infinite scroll
  const getInfiniteContent = async ({
    type = null,
    filter = null,
    searchQuery = null,
    sortBy = null,
    setContent,
    content,
    limit,
    offset,
    setOffset,
    setHasMore,
    setError,
    setLoading,
  }) => {
    // Backend checks for which of these parameters are actually provided
    axiosInstance
      .get(
        `content/posts-infinite/?limit=${limit}&offset=${offset}&filter=${filter}&type=${type}&search=${searchQuery}&sort=${sortBy}`
      )
      .then((res) => {
        const newContent = res.data.content;
        // If a filter has already been set, filter the results
        if (filter) {
          setContent([...content, ...newContent]);
        } else {
          setContent([...content, ...newContent]);
        }

        setHasMore(res.data.has_more);
        setOffset(offset + limit);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Filter content by tags
  const filterContent = ({ filter, content, setContent }) => {
    const filteredContent = content.filter((c) => c.tags.includes(filter));
    setContent(filteredContent);
  };

  // Search content without infinite scroll (get all matching results at once from DB)
  const searchContent = ({ searchQuery, setSearchResults }) => {
    axiosInstance
      .get(`content/search/?q=${searchQuery}`)
      .then((res) => {
        const newResults = res.data;
        setSearchResults(newResults);
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  // Sort content by input
  const sortContent = (content, by, setContent) => {
    const options = {
      Newest: "added",
      "Most Popular": "get_total_likes",
    };
    const sortProperty = options[by];
    const sorted = [...content].sort(
      (a, b) => b[sortProperty] - a[sortProperty]
    );
    setContent(sorted);
  };

  // Get all user likes - not currently used anywhere
  const getLikedContent = (setState) => {
    axiosInstance.get(`content/likes/?user_id=${auth.user.id}`).then((res) => {
      setState(res.data);
    });
  };

  // Handle Like / Dislike of content
  const handleLike = (postID, likes, setLikeStatus) => {
    if (auth.isAuthenticated) {
      const user = auth.user.id;
      let updatedLikes;
      // If user has already liked the content - remove User ID from current likes
      if (likes.includes(user)) {
        updatedLikes = likes.filter((like) => like !== user);
        // If user has not liked the content - add User ID to current likes
      } else {
        updatedLikes = [...likes, user];
      }
      // Set request body to include / exclude the like
      const body = JSON.stringify({
        likes: updatedLikes,
      });
      // Make API call and pass the body
      axiosInstance
        .patch(`content/posts/${postID}/`, body, tokenConfig(auth.token))
        .then((res) => {
          // Update the likeStatus state on the component
          setLikeStatus({
            liked: res.data.likes.includes(user),
            likeCount: res.data.likes.length,
            currentLikes: res.data.likes,
          });
        })
        .catch((err) => {
          dispatchErrors(returnErrors(err.response.data, err.response.status));
        });
      // If user is not logged in, send an alert
    } else {
      dispatchMessages(
        createMessage({ noAuthLike: "Please Log In or Sign Up" })
      );
    }
  };

  return {
    addContent,
    deleteContent,
    getSinglePost,
    getUserContent,
    getContent,
    getInfiniteContent,
    handleLike,
    getLikedContent,
    filterContent,
    searchContent,
    sortContent,
  };
};

export default useContentState;
