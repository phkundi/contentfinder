import React, { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import { axiosInstance } from "../../axiosInstance";
import FilterBar from "./FilterBar";
import {
  ListPageWrapper,
  ListContainer,
  ContentListHeading,
} from "../styles/ContentListStyles";

function ContentList({ type, query, heading }) {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const getContent = () => {
      axiosInstance.get(`content/${query}/`).then((res) => {
        if (filter) {
          const filteredContent = res.data.filter((content) =>
            content.tags.includes(filter)
          );
          setContent(filteredContent);
        } else {
          setContent(res.data);
        }
      });
    };
    getContent();
  }, [query, filter]);

  if (content) {
    return (
      <ListPageWrapper>
        <FilterBar setFilter={setFilter} filter={filter} />
        <div>
          <ContentListHeading>{heading}</ContentListHeading>
          <ListContainer>
            {content.map((content, i) => (
              <ContentCard key={i} content={content} type={type} />
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
