import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import useContentState from "../../hooks/useContentState";
import LikeBox from "./LikeBox";
import ContentHighlights from "./ContentHighlights";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
  ContentType,
  CardTags,
  TagBox,
  FooterText,
  CardFooter,
} from "../styles/ContentDetailStyles";

function ContentDetail({ id }) {
  // Methods etc.
  const { auth } = useContext(AuthContext);
  const { getSinglePost, handleLike } = useContentState();
  // State
  const [content, setContent] = useState("");
  const { post, highlights } = content;
  // const { content_type, name, owner, url, description, likes, tags } = post;

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
        liked: auth.isAuthenticated ? post.likes.includes(auth.user.id) : false,
        likeCount: post.likes.length,
        currentLikes: post.likes,
      });
    }
  }, [content]);

  // Handlers
  const handleLikeClick = () => {
    handleLike(id, currentLikes, setLikeStatus);
  };

  // Render
  if (post) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source={post.image_url}>
          <LikeBox
            inDetail={true}
            liked={liked}
            likeCount={likeCount}
            handleClick={handleLikeClick}
          />
        </ContentDetailImage>
        <ContentDetailBody>
          <ContentType>{post.content_type}</ContentType>
          <ContentDetailTitle>{name}</ContentDetailTitle>

          <ContentDetailSubtitle muted={true}>
            By {post.owner.username}
          </ContentDetailSubtitle>
          <ContentDetailURL href={post.url}>
            {post.url.replace(/(^\w+:|^)\/\//, "")}
          </ContentDetailURL>

          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <p>{post.description}</p>
            {post.owner.bio && (
              <>
                <ContentDetailSubtitle marginTop={true}>
                  About {post.owner.username}
                </ContentDetailSubtitle>
                <p>{post.owner.bio}</p>
              </>
            )}

            {highlights && (
              <ContentHighlights highlights={highlights} inProfile={true} />
            )}
          </ContentDetailInfo>
        </ContentDetailBody>
        <CardFooter>
          <CardTags>
            <FooterText>Tags: </FooterText>
            {post.tags.map((tag, i) => (
              <TagBox key={i} onClick={() => setFilter(tag)}>
                {tag}
              </TagBox>
            ))}
          </CardTags>
        </CardFooter>
      </ContentDetailContainer>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default ContentDetail;
