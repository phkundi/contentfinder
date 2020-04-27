import React, { memo } from "react";
import { Link } from "react-router-dom";
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
  LikeBox,
  LikeBoxChildContainer,
} from "../styles/ContentCardStyles";
import CardOwnerActions from "./CardOwnerActions";

function ContentCard({ content, type, editable, handleEdit, handleDelete }) {
  return (
    <Card>
      <div>
        <CardImage source="https://source.unsplash.com/random">
          <LikeBox>
            <LikeBoxChildContainer>
              {/* <i class="fas fa-heart"></i> */}
              <i class="far fa-heart"></i>
            </LikeBoxChildContainer>
            <LikeBoxChildContainer>
              <span>0</span>
            </LikeBoxChildContainer>
          </LikeBox>
          {editable ? (
            <CardOwnerActions
              id={content.id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              query={content.slug}
            />
          ) : (
            ""
          )}
        </CardImage>

        <CardBody>
          <ContentType>{type ? type : content.type}</ContentType>
          <CardTitle>
            <Link to={`/${content.slug}/${content.id}`}>{content.name}</Link>
          </CardTitle>
          <CardSubtitle>By {content.owner.username}</CardSubtitle>
          <CardDesription>
            {content.description.substring(0, 100) + " ... "}
          </CardDesription>
        </CardBody>
      </div>
      <CardFooterBottomWrapper>
        <CardViewButton>
          <Link to={`/${content.slug}/${content.id}`}>
            See Details <i className="fas fa-angle-double-right"></i>
          </Link>
        </CardViewButton>

        <CardFooter>
          <CardTags>
            <FooterText>Tags: </FooterText>
            {content.tags.map((tag, i) => (
              <TagBox key={i}>{tag}</TagBox>
            ))}
          </CardTags>
        </CardFooter>
      </CardFooterBottomWrapper>
    </Card>
  );
}

export default memo(ContentCard);
