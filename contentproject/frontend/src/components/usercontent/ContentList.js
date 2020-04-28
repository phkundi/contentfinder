import React, { memo, useState, useEffect } from "react";
import useContentState from "../../hooks/useContentState";
import ContentCard from "./ContentCard";
import FilterBar from "./FilterBar";
import {
  ListPageWrapper,
  ContentListWrapper,
  ListContainer,
  ContentListHeading,
} from "../styles/ContentListStyles";

function ContentList({ heading, type }) {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [filter, setFilter] = useState(null);
  const { getInfiniteContent, filterContent } = useContentState();

  window.onscroll = () => {
    if (error || loading || !hasMore) return;
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      loadContent();
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    setFilter(null);
    setOffset(0);
    setContent([]);
    loadContent();
  }, [type]);

  useEffect(() => {
    // If there is a filter, call filterContent hook to filter current content state
    if (filter) {
      filterContent({ filter, content, setContent });
      // If not, reset content & offset and trigger an entirely new query
    } else {
      setContent([]);
      setOffset(0);
      setLoading(true);
    }
  }, [filter]);

  const loadContent = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      getInfiniteContent({
        filter,
        type,
        offset,
        limit,
        setContent,
        content,
        setHasMore,
        setError,
        setOffset,
        setLoading,
      });
    }
  }, [loading]);

  return (
    <ListPageWrapper>
      <FilterBar setFilter={setFilter} filter={filter} />
      <ContentListWrapper>
        <ContentListHeading>{heading}</ContentListHeading>
        <ListContainer>
          {content.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </ListContainer>
      </ContentListWrapper>
      {error && <div>{error}</div>}
      {loading && <div>Loading</div>}
      {!hasMore && <div>No more</div>}
    </ListPageWrapper>
  );
}

export default memo(ContentList);
