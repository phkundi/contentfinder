import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./header/Header";
import Alerts from "./Alerts";
import useAuthState from "../../hooks/useAuthState";
import useToggleState from "../../hooks/useToggleState";
import useInputState from "../../hooks/useInputState";
import ContentList from "../usercontent/ContentList";
import {
  LayoutContainer,
  MainContainer,
  ContentContainer,
} from "../styles/LayoutStyles";

function Layout(props) {
  const { loadUser, auth, logoutUser } = useAuthState();
  const [searching, toggleSearching] = useToggleState(false);
  const [searchQuery, setSearchQuery, resetSearchQuery] = useInputState("");

  useEffect(() => {
    loadUser();
  }, [auth.isAuthenticated]);

  return (
    <LayoutContainer>
      <Sidebar auth={auth} logout={logoutUser} />
      <MainContainer>
        <Header
          hideHeader={props.hideHeader}
          hideSearch={props.hideSearch}
          auth={auth}
          logout={logoutUser}
          goBack={props.goBack}
          searching={searching}
          toggleSearching={toggleSearching}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resetSearchQuery={resetSearchQuery}
        />

        <Alerts />
        <ContentContainer noMarginTop={props.noMarginTop}>
          {searching ? (
            <ContentList
              isSearch={searching}
              toggleSearching={toggleSearching}
              searchQuery={searchQuery}
            />
          ) : (
            props.children
          )}
        </ContentContainer>
      </MainContainer>
    </LayoutContainer>
  );
}

export default Layout;
