import React, { memo, Fragment } from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

function Header({
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
  return (
    <Fragment>
      <DesktopHeader
        auth={auth}
        logout={logout}
        goBack={goBack}
        hideSearch={hideSearch}
        searching={searching}
        toggleSearching={toggleSearching}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetSearchQuery={resetSearchQuery}
      />
      <MobileHeader
        auth={auth}
        logout={logout}
        goBack={goBack}
        hideSearch={hideSearch}
        searching={searching}
        toggleSearching={toggleSearching}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetSearchQuery={resetSearchQuery}
      />
    </Fragment>
  );
}

export default memo(Header);
