import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImage,
  CardBody,
  ContentType,
  CardTitle,
  CardSubtitle,
  CardDesription,
  CardFooter,
  CardTags,
  FooterText,
  TagBox,
} from "../styles/contentCardStyles";

function ContentCard({ content, type, query }) {
  return (
    <Card>
      <CardImage source="https://source.unsplash.com/random" />
      <CardBody>
        <ContentType>{type}</ContentType>
        <CardTitle>
          <Link to={`/${query}/${content.id}`}>{content.name}</Link>
        </CardTitle>
        <CardSubtitle>By {content.owner.username}</CardSubtitle>
        <CardDesription>
          {content.description.substring(0, 100) + " ..."}
        </CardDesription>
      </CardBody>
      <CardFooter>
        <CardTags>
          <FooterText>Tags: </FooterText>
          {content.tags.map((tag, i) => (
            <TagBox key={i}>{tag}</TagBox>
          ))}
        </CardTags>
      </CardFooter>
    </Card>
  );
}

export default ContentCard;
