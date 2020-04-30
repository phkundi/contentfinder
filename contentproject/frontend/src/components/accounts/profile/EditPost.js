import React, { useState, useEffect, useContext } from "react";
import useContentState from "../../../hooks/useContentState";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
  ContentType,
} from "../../styles/ContentDetailStyles";

function EditPost({ id }) {
  const [content, setContent] = useState("");
  const { getSinglePost } = useContentState();
  const { content_type, name, owner, url, description, likes } = content;

  useEffect(() => {
    getSinglePost(id, setContent);
  }, []);

  if (content) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source="https://source.unsplash.com/random"></ContentDetailImage>
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
          </ContentDetailInfo>
        </ContentDetailBody>
      </ContentDetailContainer>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default EditPost;
