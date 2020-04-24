import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../axiosInstance";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
} from "../../styles/contentDetailStyles";

function PodcastDetail({ id }) {
  const [podcast, setPodcast] = useState("");

  useEffect(() => {
    axiosInstance.get(`content/podcasts/${id}`).then((res) => {
      setPodcast(res.data);
    });
  }, []);

  if (podcast) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source="https://source.unsplash.com/random" />
        <ContentDetailBody>
          <ContentDetailTitle>{podcast.name}</ContentDetailTitle>
          <ContentDetailSubtitle muted={true}>
            By {podcast.owner}
          </ContentDetailSubtitle>
          <ContentDetailURL href={podcast.url}>
            {podcast.url.replace(/(^\w+:|^)\/\//, "")}
          </ContentDetailURL>

          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <p>{podcast.description}</p>
            <ContentDetailSubtitle marginTop={true}>
              About {podcast.owner}
            </ContentDetailSubtitle>
            <p>
              Arthur Collins has left his routine behind and is travelling the
              world non-stop since 2018. Along his travels, he writes about his
              experiences and gives handy tips for less experienced travellers.
            </p>
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

export default PodcastDetail;
