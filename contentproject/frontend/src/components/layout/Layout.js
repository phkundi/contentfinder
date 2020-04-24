import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Alerts from "../common/Alerts";
import styled from "styled-components";
import useAuthState from "../../hooks/useAuthState";

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContainer = styled.header`
  width: 100%;
  padding: 0;

  @media ${(props) => props.theme.device.tablet} {
    width: 75%;
    padding: 2rem 3rem;
  }
  @media ${(props) => props.theme.device.laptopL} {
    width: 85%;
    padding: 2rem 4rem;
  }
`;

const ContentContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;

  @media ${(props) => props.theme.device.laptop} {
    justify-content: ${(props) =>
      props.centerContentX ? "center" : "flex-start"};
  }
`;

export default function Layout(props) {
  const { loadUser, auth, logoutUser } = useAuthState();

  useEffect(() => {
    loadUser();
  }, [auth.isAuthenticated]);

  return (
    <LayoutContainer>
      <Sidebar auth={auth} />
      <MainContainer>
        {props.hideHeader ? "" : <Header auth={auth} logout={logoutUser} />}
        <Alerts />
        <ContentContainer centerContentX={props.centerContentX}>
          {props.children}
        </ContentContainer>
      </MainContainer>
    </LayoutContainer>
  );
}
