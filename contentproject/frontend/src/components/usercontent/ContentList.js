import React, { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import FilterBar from "./FilterBar";
import {
  ListPageWrapper,
  ListContainer,
  ContentListHeading,
} from "../styles/ContentListStyles";
import useContentState from "../../hooks/useContentState";

function ContentList({ type, heading }) {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState(null);
  const { getContent } = useContentState();

  useEffect(() => {
    getContent(type, filter, setContent);
  }, [type, filter]);

  if (content) {
    return (
      <ListPageWrapper>
        <FilterBar setFilter={setFilter} filter={filter} />
        <div>
          <ContentListHeading>{heading}</ContentListHeading>
          <ListContainer>
            {content.map((content, i) => (
              <ContentCard key={i} content={content} />
            ))}
          </ListContainer>
        </div>
      </ListPageWrapper>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default ContentList;
