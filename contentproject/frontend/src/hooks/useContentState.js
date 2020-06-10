import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { MessageContext } from "../context/messageContext";
import { ErrorContext } from "../context/errorContext";
import {
  tokenConfig,
  createMessage,
  returnErrors,
  tokenConfigWithFile,
} from "../helpers/helpers";
import { axiosInstance } from "../axiosInstance";

const useContentState = () => {
  const { dispatchMessages } = useContext(MessageContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { auth } = useContext(AuthContext);

  // Add new Content from Form
  const addContent = (content, setUploaded) => {
    let image;
    if (content.image) {
      image = content.image;
      delete content.image;
    }
    axiosInstance
      .post(`/content/posts/`, content, tokenConfig(auth.token))
      .then((res) => {
        // If the user selected an image we need to upload it seperately
        if (image) {
          const formData = new FormData();
          formData.append("image", image, image.name);
          const id = res.data.id;
          updateContentImage({ id, formData, setUploaded });
          dispatchMessages(
            createMessage({
              contentUploading: "Saving your content - please wait",
            })
          );
          // Else we can set uploaded to true already
        } else {
          dispatchMessages(
            createMessage({ contentAdded: "Submitted successfully" })
          );
          setUploaded(res.data.id);
        }
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  // Delete Content
  const deleteContent = (id) => {
    axiosInstance
      .delete(`/content/posts/${id}/`, tokenConfig(auth.token))
      .then((res) => {
        dispatchMessages(
          createMessage({ contentDeleted: "Deleted successfully" })
        );
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  // Update Content Info
  const updateContent = (id, content) => {
    const body = JSON.stringify({
      name: content.newName,
      url: content.newURL,
      description: content.newDescription,
    });

    axiosInstance
      .patch(`/content/posts/${id}/`, body, tokenConfig(auth.token))
      .then((res) => {
        dispatchMessages(
          createMessage({ contentUpdated: "Updated successfully" })
        );
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  // Update Content Image
  const updateContentImage = ({
    id,
    formData,
    setContent = null,
    toggleEditing = null,
    setUploaded = null,
  }) => {
    axiosInstance
      .patch(`/content/posts/${id}/`, formData, tokenConfigWithFile(auth.token))
      .then((res) => {
        // In this case, the user updates the image
        if (setContent) {
          setContent(res.data);
          toggleEditing();
          dispatchMessages(
            createMessage({ contentUpdated: "Updated successfully" })
          );
          // In this case, the user is adding a new post
        } else if (setUploaded) {
          setUploaded(id);
        }
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  // Add Highlight
  const addHighlight = (postId, title, url, state, setState) => {
    const body = JSON.stringify({
      title: title,
      url: url,
      post: postId,
      owner: auth.user.id,
    });
    axiosInstance
      .post("/content/highlights/", body, tokenConfig(auth.token))
      .then((res) => {
        setState([...state, res.data]);
        dispatchMessages(
          createMessage({
            highlightAdded: "Created Highlight",
          })
        );
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  // Update Content Highlight
  const updateHighlight = (id, content, state, setState) => {
    const body = JSON.stringify({
      title: content.title,
      url: content.url,
    });
    axiosInstance
      .patch(`/content/highlights/${id}/`, body, tokenConfig(auth.token))
      .then((res) => {
        // Replace old content with new
        const newState = [state.filter((h) => h.id != id), res.data].filter(
          (a) => a.id
        );
        // Set state to update frontend
        setState(newState);
        // Send alert
        dispatchMessages(
          createMessage({ highlightUpdated: "Updated Highlight" })
        );
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  // Delete Content Highlight
  const deleteHighlight = (id) => {
    axiosInstance
      .delete(`/content/highlights/${id}/`, tokenConfig(auth.token))
      .then((res) => {
        dispatchMessages(
          createMessage({ contentDeleted: "Deleted Highlight" })
        );
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  // Get a single post
  const getSinglePost = (id, setContent) => {
    axiosInstance.get(`content/posts/${id}/`).then((res) => {
      console.log(res);
      setContent(res.data);
    });
  };

  // Get content for specific user
  const getUserContent = (setState) => {
    axiosInstance.get("/content/user/", tokenConfig(auth.token)).then((res) => {
      setState(res.data);
    });
  };

  // Get all the posts liked by the user
  const getLikedContent = (setPosts) => {
    axiosInstance
      .get("/content/user/liked", tokenConfig(auth.token))
      .then((res) => {
        setPosts(res.data);
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
    updateContent,
    updateContentImage,
    addHighlight,
    updateHighlight,
    deleteHighlight,
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
