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

function YoutubeDetail({ id }) {
  const [channel, setChannel] = useState("");

  useEffect(() => {
    axiosInstance.get(`content/youtube/${id}`).then((res) => {
      setChannel(res.data);
    });
  }, []);

  if (channel) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source="https://source.unsplash.com/random" />
        <ContentDetailBody>
          <ContentDetailTitle>{channel.name}</ContentDetailTitle>
          <ContentDetailSubtitle muted={true}>
            By {channel.owner}
          </ContentDetailSubtitle>
          <ContentDetailURL href={channel.url}>
            {channel.url.replace(/(^\w+:|^)\/\//, "")}
          </ContentDetailURL>

          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <p>{channel.description}</p>

            <ContentDetailSubtitle marginTop={true}>
              Latest Videos
            </ContentDetailSubtitle>
          </ContentDetailInfo>
        </ContentDetailBody>
      </ContentDetailContainer>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default YoutubeDetail;
