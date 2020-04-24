import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../axiosInstance";

const FilterBarContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
  padding: 1rem 0;
  overflow-x: scroll;
`;

const FilterBarTag = styled.button`
  background-color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  margin: 0 0.5rem;
  box-shadow: ${(props) => props.theme.boxShadow.light};
`;

const FilterBarHeading = styled.h2`
  font-size: 1.3rem;
`;

const Wrapper = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.device.laptop} {
    padding: 0;
  }
`;

function FilterBar() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = () => {
      axiosInstance.get("content/tags/").then((res) => {
        setTags(res.data);
      });
    };
    getTags();
  }, []);

  if (tags) {
    return (
      <Wrapper>
        <FilterBarHeading>What are you looking for?</FilterBarHeading>
        <FilterBarContainer>
          {tags.map((tag) => (
            <FilterBarTag key={tag.name}>{tag.name}</FilterBarTag>
          ))}
        </FilterBarContainer>
      </Wrapper>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default FilterBar;
