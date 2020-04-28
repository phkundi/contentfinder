import React from "react";
import { Link } from "react-router-dom";
import {
  MobileHeaderMenuContainer,
  MobileHeaderMenuHead,
  MobileHeaderMenuHeading,
  MobileHeaderIconButton,
  MobileHeaderMenuBody,
  MobileHeaderMenuList,
  MobileMenuListItem,
} from "../../styles/MobileHeaderStyles";

function MobileHeaderMenu({ toggleMenu, auth, logout }) {
  const { isAuthenticated } = auth;

  const handleLogout = () => {
    logout();
    toggleMenu();
  };
  return (
    <MobileHeaderMenuContainer>
      <MobileHeaderMenuHead>
        <MobileHeaderMenuHeading>Menu</MobileHeaderMenuHeading>
        <MobileHeaderIconButton close={true} onClick={toggleMenu}>
          <i className="fas fa-times" />
        </MobileHeaderIconButton>
      </MobileHeaderMenuHead>
      <MobileHeaderMenuBody>
        <MobileHeaderMenuList>
          <Link to="/" onClick={toggleMenu}>
            <MobileMenuListItem>Explore</MobileMenuListItem>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/share" onClick={toggleMenu}>
                <MobileMenuListItem>Share Content</MobileMenuListItem>
              </Link>
              <Link to="/profile" onClick={toggleMenu}>
                <MobileMenuListItem>Profile</MobileMenuListItem>
              </Link>
              <Link to="#" onClick={handleLogout}>
                <MobileMenuListItem>Logout</MobileMenuListItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>
                <MobileMenuListItem>Login</MobileMenuListItem>
              </Link>
              <Link to="/register" onClick={toggleMenu}>
                <MobileMenuListItem>Create Account</MobileMenuListItem>
              </Link>
            </>
          )}
        </MobileHeaderMenuList>
      </MobileHeaderMenuBody>
    </MobileHeaderMenuContainer>
  );
}

export default MobileHeaderMenu;
