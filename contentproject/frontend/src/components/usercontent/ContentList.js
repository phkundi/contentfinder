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
import { SearchMinLength, SearchResultsTitle } from "../styles/SearchbarStyles";

function ContentList({ heading, type, isSearch, searchQuery }) {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [filter, setFilter] = useState(null);
  const { getInfiniteContent, filterContent } = useContentState();

  // Load content when user reaches end of page
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

  // Load content on initial page load
  useEffect(() => {
    if (!isSearch) {
      loadContent();
    }
  }, []);

  // If user enters or leaves search, reset state
  useEffect(() => {
    setContent([]);
    setOffset(0);
    setLoading(false);
  }, [isSearch]);

  // Load content when search query changes
  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      loadContent();
      // If user resets search query, reset state
    } else if (!searchQuery) {
      setContent([]);
      setOffset(0);
    }
  }, [searchQuery]);

  // Load content when content type changes
  useEffect(() => {
    if (!isSearch) {
      setFilter(null);
      setOffset(0);
      setContent([]);
      loadContent();
    }
  }, [type]);

  // Filter Content when filter changes
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

  // Trigger API Call
  const loadContent = () => {
    setLoading(true);
  };

  // Make API Call
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
        searchQuery,
      });
    }
  }, [loading]);

  // If this is a search request
  if (isSearch) {
    return (
      <ListPageWrapper>
        <div>
          <ContentListHeading>
            <SearchResultsTitle>Search Results:</SearchResultsTitle>{" "}
            {searchQuery}
          </ContentListHeading>
          {searchQuery.length < 3 ? (
            <SearchMinLength>
              Please enter at least 3 characters
            </SearchMinLength>
          ) : (
            ""
          )}
          <ListContainer>
            {content.map((content) => (
              <ContentCard content={content} key={content.id} />
            ))}
          </ListContainer>
        </div>
      </ListPageWrapper>
    );
    // If the user is browsing
  } else {
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
        {/* {error && <div>{error}</div>}
        {loading && <div>Loading</div>}
        {!hasMore && <div>No more</div>} */}
      </ListPageWrapper>
    );
  }
}

export default memo(ContentList);
