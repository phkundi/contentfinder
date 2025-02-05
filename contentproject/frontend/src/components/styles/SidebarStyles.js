import styled from "styled-components";

export const SidebarContainer = styled.div`
  min-height: 100vh;
  background-color: #fff;
  display: none;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.boxShadow.medium};

  @media ${(props) => props.theme.device.laptop} {
    display: flex;
    width: 25%;
  }

  @media ${(props) => props.theme.device.laptopL} {
    width: 25%;
  }

  @media ${(props) => props.theme.device.desktop} {
    width: 20%;
  }

  @media (min-width: 2000px) {
    width: 17%;
  }
`;

export const SidebarLogo = styled.div`
  padding: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};

  & > a:hover {
    text-decoration: none;
  }
`;

export const SidebarNav = styled.nav`
  padding: 2rem;
  display: flex;
  height: 40%;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarMenu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1rem;
`;

export const SidebarListItem = styled.li`
  margin: 1.5rem 0;
  font-weight: 500;
  & > a {
    color: rgba(0, 0, 0, 0.3);

    &:hover {
      color: #000;
      text-decoration: none;
    }
  }
`;

export const SidebarButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.outlined ? "transparent" : props.theme.colors.primary};
  width: 100%;
  border-radius: 30px;
  border: 2px solid;
  border-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => (props.outlined ? props.theme.colors.primary : "#fff")};
  justify-self: center;

  &:focus {
    outline: none;
  }

  & > a {
    color: ${(props) => (props.outlined ? props.theme.colors.primary : "#fff")};

    &:hover {
      text-decoration: none;
    }
  }

  @media ${(props) => props.theme.device.laptopL} {
    padding: 0.8rem 3rem;
  }

  @media ${(props) => props.theme.device.desktop} {
    font-size: 1rem;
  }
`;
