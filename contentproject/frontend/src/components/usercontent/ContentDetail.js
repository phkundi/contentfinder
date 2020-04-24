import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosInstance";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
  ContentType,
} from "../styles/contentDetailStyles";

function ContentDetail({ id, query, type }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    axiosInstance.get(`content/${query}/${id}`).then((res) => {
      setContent(res.data);
    });
  }, []);

  if (content) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source="https://source.unsplash.com/random" />
        <ContentDetailBody>
          <ContentType>{type}</ContentType>
          <ContentDetailTitle>{content.name}</ContentDetailTitle>

          <ContentDetailSubtitle muted={true}>
            By {content.owner.username}
          </ContentDetailSubtitle>
          <ContentDetailURL href={content.url}>
            {content.url.replace(/(^\w+:|^)\/\//, "")}
          </ContentDetailURL>

          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <p>{content.description}</p>
            {content.owner.bio ? (
              <>
                <ContentDetailSubtitle marginTop={true}>
                  About {content.owner.username}
                </ContentDetailSubtitle>
                <p>{content.owner.bio}</p>
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
