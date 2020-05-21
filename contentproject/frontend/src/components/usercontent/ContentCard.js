import React, { memo, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import useContentState from "../../hooks/useContentState";
import useToggleState from "../../hooks/useToggleState";
import CardOwnerActions from "./CardOwnerActions";
import { contentSlugs } from "../../constants";
import LikeBox from "./LikeBox";
import {
  Card,
  CardImage,
  CardBody,
  ContentType,
  CardTitle,
  CardSubtitle,
  CardDesription,
  CardViewButton,
  CardFooterBottomWrapper,
  CardFooter,
  CardTags,
  FooterText,
  TagBox,
} from "../styles/ContentCardStyles";

function ContentCard({
  content,
  editable,
  handleEdit,
  handleDelete,
  isSearch,
  toggleSearching,
  setFilter,
}) {
  const { id, content_type, name, description, owner, tags, likes } = content;
  const { handleLike } = useContentState();
  const { auth } = useContext(AuthContext);
  const [likeStatus, setLikeStatus] = useState({
    liked: auth.isAuthenticated ? likes.includes(auth.user.id) : false,
    likeCount: likes.length,
    currentLikes: likes,
  });
  const { likeCount, liked, currentLikes } = likeStatus;

  const handleClick = () => {
    handleLike(id, currentLikes, setLikeStatus);
  };

  return (
    <Card>
      <div>
        <CardImage source={content.image_url}>
          <LikeBox
            likeCount={likeCount}
            handleClick={handleClick}
            id={id}
            liked={liked}
          />

          {editable ? (
            <CardOwnerActions
              id={id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ) : (
            ""
          )}
        </CardImage>

        <CardBody>
          <ContentType>{content_type}</ContentType>
          <CardTitle>
            <Link
              to={`/${contentSlugs[content_type]}/${id}`}
              onClick={isSearch && toggleSearching}
            >
              {name}
            </Link>
          </CardTitle>
          <CardSubtitle>By {owner.username}</CardSubtitle>
          <CardDesription>
            {description.substring(0, 100) + " ... "}
          </CardDesription>
        </CardBody>
      </div>
      <CardFooterBottomWrapper>
        <CardViewButton>
          <Link to={`/${contentSlugs[content_type]}/${id}`}>
            See Details <i className="fas fa-angle-double-right"></i>
          </Link>
        </CardViewButton>

        <CardFooter>
          <CardTags>
            <FooterText>Tags: </FooterText>
            {tags.map((tag, i) => (
              <TagBox key={i} onClick={() => setFilter(tag)}>
                {tag}
              </TagBox>
            ))}
          </CardTags>
        </CardFooter>
      </CardFooterBottomWrapper>
    </Card>
  );
}

export default memo(ContentCard);
