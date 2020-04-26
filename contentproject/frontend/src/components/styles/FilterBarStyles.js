import styled from "styled-components";

export const FilterBarContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
  padding: 1rem 0;
  overflow-x: scroll;
`;

export const FilterBarTag = styled.button`
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "#fff"};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  padding: 1rem 2rem;
  border-radius: 30px;
  margin: 0 0.5rem;
  box-shadow: ${(props) => props.theme.boxShadow.light};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "" : "rgba(0, 0, 0, 0.02)")};
  }

  &:focus {
    outline: none;
  }
`;

export const FilterBarHeading = styled.h2`
  font-size: 1.3rem;
`;

export const ResetFilterButton = styled.button`
  border-color: ${(props) => props.theme.colors.red};
  border: 1px solid;
  color: ${(props) => props.theme.colors.red};
  border-radius: 30px;
  background-color: transparent;
  margin-left: 1rem;
  padding: 0.3rem 1rem;
  visibility: ${(props) => (props.show ? "show" : "hidden")};
  transition: background-color 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.red};
    color: #fff;
  }
`;

export const FilterBarHeadContainer = styled.div`
  display: flex;
  align-items: center;
`;
