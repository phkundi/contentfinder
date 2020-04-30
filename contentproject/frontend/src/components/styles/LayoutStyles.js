import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    align-items: center;
  }

  @media ${(props) => props.theme.device.laptop} {
    width: 75%;
    padding: 2rem 3rem;
    align-items: unset;
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
  margin-top: ${(props) => (props.noMarginTop ? "4rem" : "6rem")};

  @media ${(props) => props.theme.device.tablet} {
    width: 95%;
    margin-top: 6rem;
  }

  @media ${(props) => props.theme.device.laptop} {
    margin-top: 0;
    justify-content: center;
    width: 100%;
  }
`;
