import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ContentCard from "./ContentCard";
import { axiosInstance } from "../../axiosInstance";
import FilterBar from "../common/FilterBar";

const ListPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  max-width: 100%;
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

const ContentListHeading = styled.h2``;

function ContentList({ type, query, heading }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getContent = () => {
      axiosInstance.get(`content/${query}/`).then((res) => {
        setContent(res.data);
      });
    };
    getContent();
  }, []);

  if (content) {
    return (
      <ListPageWrapper>
        <FilterBar />
        <ContentListHeading>{heading}</ContentListHeading>
        <ListContainer>
          {content.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              type={type}
              query={query}
            />
          ))}
        </ListContainer>
      </ListPageWrapper>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default ContentList;
