import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./header/Header";
import Alerts from "./Alerts";
import useAuthState from "../../hooks/useAuthState";
import useToggleState from "../../hooks/useToggleState";
import useInputState from "../../hooks/useInputState";
import SearchResults from "./SearchResults";
import ContentList from "../usercontent/ContentList";
import {
  LayoutContainer,
  MainContainer,
  ContentContainer,
} from "../styles/LayoutStyles";

function Layout(props) {
  const { loadUser, auth, logoutUser } = useAuthState();
  const [searching, setSearching] = useToggleState(false);
  const [searchQuery, setSearchQuery, resetSearchQuery] = useInputState("");

  useEffect(() => {
    loadUser();
  }, [auth.isAuthenticated]);

  return (
    <LayoutContainer>
      <Sidebar auth={auth} />
      <MainContainer>
        <Header
          hideHeader={props.hideHeader}
          auth={auth}
          logout={logoutUser}
          goBack={props.goBack}
          hideSearch={props.hideSearch}
          searching={searching}
          setSearching={setSearching}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resetSearchQuery={resetSearchQuery}
        />

        <Alerts />
        <ContentContainer noMarginTop={props.noMarginTop}>
          {searching ? (
            <ContentList isSearch={true} searchQuery={searchQuery} />
          ) : (
            props.children
          )}
        </ContentContainer>
      </MainContainer>
    </LayoutContainer>
  );
}

export default Layout;
