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
} from "../../styles/contentCardStyles";

function YoutubeCard({ channel }) {
  return (
    <Card>
      <CardImage source="https://source.unsplash.com/random" />
      <CardBody>
        <ContentType>Youtube</ContentType>
        <CardTitle>
          <Link to={`/youtube/${channel.id}`}>{channel.name}</Link>
        </CardTitle>
        <CardSubtitle>By {channel.owner}</CardSubtitle>
        <CardDesription>
          {channel.description.substring(0, 100) + " ..."}
        </CardDesription>
      </CardBody>
      <CardFooter>
        <CardTags>
          <FooterText>Tags: </FooterText>
          {channel.tags.map((tag) => (
            <TagBox>{tag}</TagBox>
          ))}
        </CardTags>
      </CardFooter>
    </Card>
  );
}

export default YoutubeCard;
