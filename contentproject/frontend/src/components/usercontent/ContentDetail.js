import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import useContentState from "../../hooks/useContentState";
import LikeBox from "./LikeBox";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
  ContentType,
} from "../styles/ContentDetailStyles";

function ContentDetail({ id }) {
  // Methods etc.
  const { auth } = useContext(AuthContext);
  const { getSinglePost, handleLike } = useContentState();
  // State
  const [content, setContent] = useState("");
  const { content_type, name, owner, url, description, likes } = content;
  const [likeStatus, setLikeStatus] = useState({
    liked: false,
    likeCount: 0,
    currentLikes: 0,
  });
  const { liked, likeCount, currentLikes } = likeStatus;

  // Lifecycle Methods
  useEffect(() => {
    getSinglePost(id, setContent);
  }, []);

  useEffect(() => {
    if (content) {
      setLikeStatus({
        liked: auth.isAuthenticated ? likes.includes(auth.user.id) : false,
        likeCount: likes.length,
        currentLikes: likes,
      });
    }
  }, [content]);

  // Handlers
  const handleLikeClick = () => {
    handleLike(id, currentLikes, setLikeStatus);
  };

  // Render
  if (content) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source={content.image_url}>
          <LikeBox
            inDetail={true}
            liked={liked}
            likeCount={likeCount}
            handleClick={handleLikeClick}
          />
        </ContentDetailImage>
        <ContentDetailBody>
          <ContentType>{content_type}</ContentType>
          <ContentDetailTitle>{name}</ContentDetailTitle>

          <ContentDetailSubtitle muted={true}>
            By {owner.username}
          </ContentDetailSubtitle>
          <ContentDetailURL href={url}>
            {url.replace(/(^\w+:|^)\/\//, "")}
          </ContentDetailURL>

          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <p>{description}</p>
            {owner.bio ? (
              <>
                <ContentDetailSubtitle marginTop={true}>
                  About {owner.username}
                </ContentDetailSubtitle>
                <p>{owner.bio}</p>
              </>
            ) : (
              ""
            )}
            <ContentDetailSubtitle marginTop={true}>
              Latest Posts
            </ContentDetailSubtitle>
          </ContentDetailInfo>
        </ContentDetailBody>
      </ContentDetailContainer>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default ContentDetail;
