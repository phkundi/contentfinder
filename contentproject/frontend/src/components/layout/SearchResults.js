import React, { useEffect, useState } from "react";
import useContentState from "../../hooks/useContentState";
import ContentCard from "../usercontent/ContentCard";
import {
  ListPageWrapper,
  ListContainer,
  ContentListHeading,
} from "../styles/ContentListStyles";
import { SearchMinLength, SearchResultsTitle } from "../styles/SearchbarStyles";

function SearchResults({ searchQuery }) {
  const { getContent } = useContentState();
  const [staticContent, setStaticContent] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getContent({ setState: setStaticContent });
  }, []);

  useEffect(() => {
    const results = staticContent.filter(
      (content) =>
        content.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.owner.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    searchQuery.length > 2 ? setSearchResults(results) : setSearchResults([]);
  }, [searchQuery]);

  return (
    <ListPageWrapper>
      <div>
        <ContentListHeading>
          <SearchResultsTitle>Search Results:</SearchResultsTitle> {searchQuery}
        </ContentListHeading>
        {searchQuery.length < 3 ? (
          <SearchMinLength>Please enter at least 3 characters</SearchMinLength>
        ) : (
          ""
        )}
        <ListContainer>
          {searchResults.map((content) => (
            <ContentCard content={content} key={content.id} />
          ))}
        </ListContainer>
      </div>
    </ListPageWrapper>
  );
}

export default SearchResults;
