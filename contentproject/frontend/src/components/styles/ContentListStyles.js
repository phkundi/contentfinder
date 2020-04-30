import styled from "styled-components";

export const ListPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContentListWrapper = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.device.laptop} {
    padding: 0;
  }
`;

export const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media ${(props) => props.theme.device.tablet} {
    justify-content: space-between;
  }
`;

export const ContentListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContentListHeading = styled.h2`
  font-size: 1.5rem;
  @media ${(props) => props.theme.device.laptop} {
    font-size: 2rem;
  }
`;

export const ContentListDropDown = styled.div`
  position: relative;
  margin-right: 2%;
`;

export const ContentListFilterButton = styled.button`
  color: ${(props) => (props.showDropDown ? "#000" : props.theme.colors.muted)};
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1.25px solid;
  border-color: ${(props) =>
    props.showDropDown ? "#rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.2)"};
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  & > i {
    margin-left: 0.5rem;
  }

  @media ${(props) => props.theme.device.tablet} {
  }

  @media ${(props) => props.theme.device.laptop} {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
`;

export const ContentListDropdownMenu = styled.div`
  display: ${(props) => (props.showDropDown ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  border-radius: 15px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const ContentListDropDownItem = styled.li`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  &:last-child {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
  }
`;
