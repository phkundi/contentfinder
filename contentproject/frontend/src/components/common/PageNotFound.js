import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5rem;
`;

const PageNotFoundMessage = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-size: 1.3rem;
  border-radius: 30px;
  border: 2px solid;
  border-color: ${(props) => props.theme.colors.primary};

  &:focus {
    outline: none;
  }

  & > a {
    color: #fff;

    &:hover {
      text-decoration: none;
    }
  }
`;

function PageNotFound() {
  return (
    <PageNotFoundContainer>
      <PageNotFoundMessage>404 - This page does not exist</PageNotFoundMessage>
      <BackButton>
        <Link to="/">Browse Content</Link>
      </BackButton>
    </PageNotFoundContainer>
  );
}

export default PageNotFound;
