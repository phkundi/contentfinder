import React, { useEffect, useState } from "react";
import {
  LikeBoxContainer,
  LikeBoxChildContainer,
} from "../styles/ContentCardStyles";
import useContentState from "../../hooks/useContentState";

function LikeBox({ id }) {
  const { getUserLike, deleteLike, addLike } = useContentState();
  const [likeStatus, setLikeStatus] = useState({
    liked: false,
    likeID: null,
    totalLikes: 0,
  });

  useEffect(() => {
    getUserLike(id, setLikeStatus);
  }, []);

  const handleDelete = () => {
    deleteLike(likeStatus.likeID, setLikeStatus, likeStatus.totalLikes);
  };

  const handleLike = () => {
    addLike(id, setLikeStatus, likeStatus.totalLikes);
  };

  return (
    <LikeBoxContainer onClick={likeStatus.liked ? handleDelete : handleLike}>
      <LikeBoxChildContainer>
        {likeStatus.liked ? (
          <i className="fas fa-heart" />
        ) : (
          <i className="far fa-heart" />
        )}
      </LikeBoxChildContainer>
      <LikeBoxChildContainer>
        <span>{likeStatus.totalLikes}</span>
      </LikeBoxChildContainer>
    </LikeBoxContainer>
  );
}

export default LikeBox;
