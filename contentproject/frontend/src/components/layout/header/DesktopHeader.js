import React, { memo, Fragment } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar";
import HeaderAuthLinks from "./HeaderAuthLinks";
import HeaderGuestLinks from "./HeaderGuestLinks";
import useToggleState from "../../../hooks/useToggleState";
import { HeaderContainer, BackButton } from "../../styles/DesktopHeaderStyles";

function DesktopHeader({
  auth,
  logout,
  goBack,
  hideSearch,
  searching,
  toggleSearching,
  searchQuery,
  setSearchQuery,
  resetSearchQuery,
}) {
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
      return (
        <Searchbar
          searching={searching}
          toggleSearching={toggleSearching}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resetSearchQuery={resetSearchQuery}
        />
      );
    }
  };

  return (
    <Fragment>
      {/* // Desktop Header */}
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
    </Fragment>
  );
}

export default memo(DesktopHeader);
