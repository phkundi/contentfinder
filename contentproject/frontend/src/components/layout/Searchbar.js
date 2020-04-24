import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

const SearchIcon = styled.i`
  align-self: center;
  color: rgba(0, 0, 0, 0.4);
  margin-right: 1rem;
`;

const SearchBarInput = styled.input`
  background-color: transparent;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  width: 100%;
  border-bottom: 1px solid;
  border-color: transparent;

  &:focus {
    border-color: rgba(0, 0, 0, 0.4);
  }
`;

function Searchbar() {
  return (
    <SearchBarContainer>
      <SearchIcon className="fas fa-search" />
      <SearchBarInput type="text" placeholder="Search ..." />
    </SearchBarContainer>
  );
}

export default Searchbar;
