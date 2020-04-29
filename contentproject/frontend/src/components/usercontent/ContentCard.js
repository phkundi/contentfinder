import React, { memo } from "react";
import { Link } from "react-router-dom";
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

function ContentCard({ content, editable, handleEdit, handleDelete }) {
  const {
    id,
    content_type,
    name,
    description,
    owner,
    tags,
    get_total_likes,
  } = content;

  return (
    <Card>
      <div>
        <CardImage source="https://source.unsplash.com/random">
          <LikeBox likes={get_total_likes} id={id} />

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
            <Link to={`/${contentSlugs[content_type]}/${id}`}>{name}</Link>
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
              <TagBox key={i}>{tag}</TagBox>
            ))}
          </CardTags>
        </CardFooter>
      </CardFooterBottomWrapper>
    </Card>
  );
}

export default memo(ContentCard);
