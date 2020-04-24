import React from "react";
import styled from "styled-components";
import FilterBar from "../common/FilterBar";

const ListPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  max-width: 100%;
`;

function ListPage(props) {
  return (
    <ListPageWrapper>
      <FilterBar />
      {props.children}
    </ListPageWrapper>
  );
}

export default ListPage;
