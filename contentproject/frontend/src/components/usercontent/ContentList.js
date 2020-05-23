import React, { memo, useState, useEffect } from "react";
import useContentState from "../../hooks/useContentState";
import useToggleState from "../../hooks/useToggleState";
import ContentCard from "./ContentCard";
import FilterBar from "./FilterBar";
import {
  ListPageWrapper,
  ContentListWrapper,
  ListContainer,
  ContentListHeader,
  ContentListHeading,
} from "../styles/ContentListStyles";
import { SearchMinLength, SearchResultsTitle } from "../styles/SearchbarStyles";
import SortContentActions from "./SortContentActions";

function ContentList({
  heading,
  type,
  isSearch,
  searchQuery,
  toggleSearching,
}) {
  const { getInfiniteContent, filterContent, sortContent } = useContentState();
  const [content, setContent] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [filter, setFilter] = useState(null);
  const [showDropDown, toggleShowDropDown] = useToggleState(false);
  const [sortBy, setSortBy] = useState("Newest");

  // Trigger API Call
  const loadContent = () => {
    setLoading(true);
  };

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
    if (!isSearch || !searchQuery) {
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

  // Filter Content when filter changes | Sort content when sortBy changes
  useEffect(() => {
    setContent([]);
    setOffset(0);
    loadContent();
  }, [filter, sortBy]);

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
        sortBy,
      });
    }
  }, [loading]);

  const handleSortClick = (e) => {
    setSortBy(e.target.textContent);
    toggleShowDropDown();
  };

  // If this is a search request
  if (isSearch) {
    return (
      <ListPageWrapper>
        <ContentListWrapper>
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
              <ContentCard
                key={content.id}
                content={content}
                isSearch={isSearch}
                toggleSearching={toggleSearching}
              />
            ))}
          </ListContainer>
        </ContentListWrapper>
      </ListPageWrapper>
    );
    // If the user is browsing
  } else {
    return (
      <ListPageWrapper>
        <FilterBar setFilter={setFilter} filter={filter} />
        <ContentListWrapper>
          <ContentListHeader>
            <ContentListHeading>{heading}</ContentListHeading>
            <SortContentActions
              showDropDown={showDropDown}
              toggleShowDropDown={toggleShowDropDown}
              sortBy={sortBy}
              handleSortClick={handleSortClick}
            />
          </ContentListHeader>
          <ListContainer>
            {content.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                setFilter={setFilter}
              />
            ))}
          </ListContainer>
        </ContentListWrapper>
        {error && <div>{error}</div>}
        {/* {loading && <div>Loading</div>} */}
        {/* {!hasMore && <div>No more</div>} */}
      </ListPageWrapper>
    );
  }
}

export default ContentList;
