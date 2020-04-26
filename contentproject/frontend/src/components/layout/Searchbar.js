import React, { memo } from "react";
import {
  SearchBarContainer,
  SearchIcon,
  SearchBarInput,
} from "../styles/SearchbarStyles";

function Searchbar({ hideSearch }) {
  return (
    <SearchBarContainer hideSearch={hideSearch}>
      <SearchIcon className="fas fa-search" />
      <SearchBarInput type="text" placeholder="Search ..." />
    </SearchBarContainer>
  );
}

export default memo(Searchbar);
