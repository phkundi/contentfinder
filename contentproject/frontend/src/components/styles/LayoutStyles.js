import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
`;

export const MainContainer = styled.header`
  width: 100%;
  padding: 0;

  @media ${(props) => props.theme.device.tablet} {
    width: 75%;
    padding: 2rem 3rem;
  }

  @media ${(props) => props.theme.device.laptopL} {
    width: 83%;
    padding: 2rem 4rem;
  }

  @media ${(props) => props.theme.device.desktop} {
    width: 85%;
  }
`;

export const ContentContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;

  @media ${(props) => props.theme.device.laptop} {
    justify-content: ${(props) =>
      props.centerContentX ? "center" : "flex-start"};
  }
`;
