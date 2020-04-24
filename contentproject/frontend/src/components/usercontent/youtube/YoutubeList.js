import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YoutubeCard from "./YoutubeCard";
import ContentCard from "../ContentCard";
import { axiosInstance } from "../../../axiosInstance";

const Wrapper = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.device.laptop} {
    padding: 0;
  }
`;

const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const ListHeading = styled.h2``;

function YoutubeList() {
  const [youtubes, setYoutubes] = useState([]);

  useEffect(() => {
    const getYoutubes = () => {
      axiosInstance.get("content/youtube/").then((res) => {
        setYoutubes(res.data);
      });
    };
    getYoutubes();
  }, []);

  if (youtubes) {
    return (
      <Wrapper>
        <ListHeading>Youtube Channels</ListHeading>
        <ListContainer>
          {youtubes.map((channel) => (
            <ContentCard
              key={channel.id}
              content={channel}
              type="Youtube"
              query="youtube"
            />
          ))}
        </ListContainer>
      </Wrapper>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default YoutubeList;
