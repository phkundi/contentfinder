import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

function PodcastList() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const getPodcasts = () => {
      axiosInstance.get("content/podcasts/").then((res) => {
        setPodcasts(res.data);
      });
    };
    getPodcasts();
  }, []);

  if (podcasts) {
    return (
      <Wrapper>
        <ListHeading>Podcasts</ListHeading>
        <ListContainer>
          {podcasts.map((podcast) => (
            <ContentCard
              key={podcast.id}
              content={podcast}
              type="Podcast"
              query="podcasts"
            />
          ))}
        </ListContainer>
      </Wrapper>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default PodcastList;
