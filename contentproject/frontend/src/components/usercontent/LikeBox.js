import React from "react";
import {
  LikeBoxContainer,
  LikeBoxChildContainer,
} from "../styles/ContentCardStyles";

function LikeBox({ inDetail, liked, likeCount, handleClick }) {
  return (
    <LikeBoxContainer inDetail={inDetail} onClick={handleClick}>
      <LikeBoxChildContainer>
        {liked ? (
          <i className="fas fa-heart" />
        ) : (
          <i className="far fa-heart" />
        )}
      </LikeBoxChildContainer>
      <LikeBoxChildContainer>
        <span>{likeCount}</span>
      </LikeBoxChildContainer>
    </LikeBoxContainer>
  );
}

export default LikeBox;
