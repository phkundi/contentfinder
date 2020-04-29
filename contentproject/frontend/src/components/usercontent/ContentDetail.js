import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosInstance";
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
  const [content, setContent] = useState("");
  const { content_type, name, owner, url, description } = content;

  useEffect(() => {
    axiosInstance.get(`content/posts/${id}`).then((res) => {
      setContent(res.data);
    });
  }, []);

  if (content) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source="https://source.unsplash.com/random">
          <LikeBox inDetail={true} id={id} />
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
