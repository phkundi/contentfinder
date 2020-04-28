import React from "react";
import { Link } from "react-router-dom";
import useToggleState from "../../../hooks/useToggleState";
import Searchbar from "../Searchbar";
import MobileHeaderMenu from "./MobileHeaderMenu";
import {
  MobileHeaderWrapper,
  MobileHeaderContainer,
  MobileHeaderLogo,
  MobileHeaderIconContainer,
  MobileHeaderIconButton,
} from "../../styles/MobileHeaderStyles";

function MobileHeader({
  auth,
  logout,
  goBack,
  searching,
  setSearching,
  searchQuery,
  setSearchQuery,
  resetSearchQuery,
}) {
  const [showMenu, toggleMenu] = useToggleState(false);
  const handleSearch = () => {
    resetSearchQuery();
    setSearching();
  };

  return (
    <MobileHeaderWrapper>
      {searching ? (
        <>
          <Searchbar
            autofocus={true}
            searching={searching}
            setSearching={setSearching}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            resetSearchQuery={resetSearchQuery}
          />
          <MobileHeaderIconButton onClick={handleSearch} close={true}>
            <i className="fas fa-times" />
          </MobileHeaderIconButton>
        </>
      ) : (
        <MobileHeaderContainer>
          <MobileHeaderLogo>
            <Link to="/">Content Finder</Link>
          </MobileHeaderLogo>
          <MobileHeaderIconContainer>
            <MobileHeaderIconButton onClick={handleSearch}>
              <i className="fas fa-search" />
            </MobileHeaderIconButton>
            <MobileHeaderIconButton onClick={toggleMenu}>
              <i className="fas fa-bars" />
            </MobileHeaderIconButton>
          </MobileHeaderIconContainer>
        </MobileHeaderContainer>
      )}
      {showMenu ? (
        <MobileHeaderMenu
          show={showMenu}
          toggleMenu={toggleMenu}
          auth={auth}
          logout={logout}
        />
      ) : (
        ""
      )}
    </MobileHeaderWrapper>
  );
}

export default MobileHeader;
