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
  const { searchContent } = useContentState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchContent({ setSearchResults, searchQuery });
    } else if (!searchQuery) {
      setSearchResults([]);
    }
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
