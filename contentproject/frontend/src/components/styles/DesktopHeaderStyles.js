import styled from "styled-components";

// Desktop Header
export const HeaderContainer = styled.div`
  margin-bottom: 3rem;
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  @media ${(props) => props.theme.device.laptop} {
    display: ${(props) => (props.hideHeader ? "none" : "flex")};
  }
`;

export const UserActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  & > a {
    font-weight: 500;
    margin-left: 1rem;
  }
`;

export const UserDropDownContainer = styled.div`
  height: 40px;
  border-color: rgba(0, 0, 0, 0.4);
  margin-left: 1rem;
  transition: width 1s, opacity 0.5s, visibility 0.5s;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "show" : "hidden")};
  width: ${(props) => (props.show ? "200px" : "0px")};
`;

export const UserDropDownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  height: 100%;
`;

export const UserDropDownListItem = styled.li`
  color: #000;
  align-self: center;
  margin: 0 1rem;
  font-weight: 500;

  & > a {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const BackButton = styled.span`
  font-size: 1.5rem;
  font-weight: 500;

  & > a {
    color: #000;

    & > i {
      margin-right: 0.5rem;
    }
  }
`;
