import styled from "styled-components";

export const MobileHeaderWrapper = styled.header`
  margin-bottom: 3rem;
  display: flex;
  max-width: 100vw;
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  position: fixed;
  top: 0;
  height: 4rem;
  z-index: 1000;

  @media ${(props) => props.theme.device.laptop} {
    display: none;
  }
`;

export const MobileHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
`;

export const MobileHeaderLogo = styled.span`
  font-weight: 600;
  font-size: 1.2rem;

  & > a {
    color: #fff;

    &:focus,
    :hover {
      text-decoration: none;
    }
  }
`;

export const MobileHeaderIconContainer = styled.div``;

export const MobileHeaderIconButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.3rem;
  margin-right: 1rem;
  margin-left: ${(props) => props.close && "1rem"};
  color: #fff;
`;

export const MobileHeaderMenuContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1001;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const MobileHeaderMenuHead = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem 0rem 2rem;
`;

export const MobileHeaderMenuHeading = styled.h4`
  font-weight: 500;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
`;

export const MobileHeaderMenuBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: flex-end;
`;

export const MobileHeaderMenuList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-align: right;
  width: 100%;
`;

export const MobileMenuListItem = styled.li`
  text-align: right;
  color: #000;
  padding: 1rem 0;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
