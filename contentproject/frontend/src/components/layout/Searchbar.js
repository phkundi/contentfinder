import React, { memo } from "react";
import {
  SearchBarContainer,
  SearchIcon,
  SearchBarInput,
  CloseSearch,
} from "../styles/SearchbarStyles";

function Searchbar({
  hideSearch,
  searching,
  toggleSearching,
  searchQuery,
  setSearchQuery,
  resetSearchQuery,
  autofocus,
}) {
  const handleClose = () => {
    resetSearchQuery();
    toggleSearching();
  };
  return (
    <SearchBarContainer hideSearch={hideSearch} onClick={toggleSearching}>
      {searching ? (
        <CloseSearch onClick={handleClose}>
          <i className="fas fa-times" />
        </CloseSearch>
      ) : (
        <SearchIcon className="fas fa-search" />
      )}
      <SearchBarInput
        type="text"
        placeholder="Search by Title or User"
        value={searchQuery}
        onChange={setSearchQuery}
        autoFocus={autofocus ? true : false}
      />
    </SearchBarContainer>
  );
}

export default Searchbar;
