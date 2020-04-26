import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Alerts from "./Alerts";
import useAuthState from "../../hooks/useAuthState";
import {
  LayoutContainer,
  MainContainer,
  ContentContainer,
} from "../styles/LayoutStyles";

export default function Layout(props) {
  const { loadUser, auth, logoutUser } = useAuthState();

  useEffect(() => {
    loadUser();
  }, [auth.isAuthenticated]);

  return (
    <LayoutContainer>
      <Sidebar auth={auth} />
      <MainContainer>
        {props.hideHeader ? (
          ""
        ) : (
          <Header
            auth={auth}
            logout={logoutUser}
            goBack={props.goBack}
            hideSearch={props.hideSearch}
          />
        )}
        <Alerts />
        <ContentContainer centerContentX={props.centerContentX}>
          {props.children}
        </ContentContainer>
      </MainContainer>
    </LayoutContainer>
  );
}
