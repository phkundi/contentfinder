import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Searchbar from "./Searchbar";

const HeaderContainer = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;

  @media ${(props) => props.theme.device.laptop} {
    padding: 0;
  }
`;

const UserActionsContainer = styled.div`
  display: flex;
  & > a {
    font-weight: 500;
    margin-left: 1rem;
  }
`;

const HeaderLogoutLink = styled.a`
  margin-right: 1rem;
  color: ${(props) => props.theme.colors.red};
`;

function Header({ auth, logout }) {
  const { isAuthenticated, user } = auth;

  const HeaderGuestLinks = (
    <UserActionsContainer>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign Up</Link>
    </UserActionsContainer>
  );

  const HeaderAuthLinks = (
    <UserActionsContainer>
      <HeaderLogoutLink onClick={logout} href="#">
        Logout
      </HeaderLogoutLink>
      <span>{user ? user.username : ""}</span>
    </UserActionsContainer>
  );
  return (
    <HeaderContainer>
      <Searchbar />
      {isAuthenticated ? HeaderAuthLinks : HeaderGuestLinks}
    </HeaderContainer>
  );
}

export default Header;
