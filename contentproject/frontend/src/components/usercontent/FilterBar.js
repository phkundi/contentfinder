import React, { useState, useEffect, memo } from "react";
import { axiosInstance } from "../../axiosInstance";
import {
  FilterBarContainer,
  FilterBarTag,
  FilterBarHeadContainer,
  FilterBarHeading,
  ResetFilterButton,
} from "../styles/FilterBarStyles";

function FilterBar({ setFilter, filter }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = () => {
      axiosInstance.get("content/tags/").then((res) => {
        setTags(res.data);
      });
    };
    getTags();
  }, []);

  const resetFilter = () => {
    setFilter(null);
  };

  if (tags) {
    return (
      <>
        <FilterBarHeadContainer>
          <FilterBarHeading>What are you looking for?</FilterBarHeading>
          <ResetFilterButton show={filter} onClick={resetFilter}>
            Reset Filter
          </ResetFilterButton>
        </FilterBarHeadContainer>

        <FilterBarContainer>
          {tags.map((tag) => (
            <FilterBarTag
              key={tag.name}
              onClick={() => setFilter(tag.name)}
              active={filter === tag.name ? true : false}
            >
              {tag.name}
            </FilterBarTag>
          ))}
        </FilterBarContainer>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default memo(FilterBar);
