import React, { memo } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import useToggleState from "../../hooks/useToggleState";
import HeaderAuthLinks from "./HeaderAuthLinks";
import HeaderGuestLinks from "./HeaderGuestLinks";
import { HeaderContainer, BackButton } from "../styles/HeaderStyles";

function Header({ auth, logout, goBack, hideSearch }) {
  const { isAuthenticated, user } = auth;
  const [showActions, toggleShowActions] = useToggleState(false);

  const composeHeader = () => {
    if (goBack) {
      return (
        <BackButton>
          <Link to={`/${goBack}`}>
            <i className="fas fa-arrow-left" />
            Back
          </Link>
        </BackButton>
      );
    } else if (hideSearch) {
      return <Searchbar hideSearch={true} />;
    } else {
      return <Searchbar />;
    }
  };

  return (
    <HeaderContainer>
      {composeHeader()}
      {isAuthenticated ? (
        <HeaderAuthLinks
          user={user}
          logout={logout}
          toggleShowActions={toggleShowActions}
          showActions={showActions}
        />
      ) : (
        <HeaderGuestLinks />
      )}
    </HeaderContainer>
  );
}

export default memo(Header);
