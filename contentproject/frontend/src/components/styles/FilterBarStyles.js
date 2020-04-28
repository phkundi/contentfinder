import styled from "styled-components";

export const FilterBarContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem 0;
  overflow-x: scroll;

  @media ${(props) => props.theme.device.laptop} {
    margin-bottom: 3rem;
  }
`;

export const FilterBarTag = styled.button`
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "#fff"};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  padding: 0.5rem 1rem;
  border-radius: 30px;
  margin: 0 0.5rem;
  box-shadow: ${(props) => props.theme.boxShadow.light};
  transition: background-color 0.2s;
  font-size: 0.8rem;

  @media ${(props) => props.theme.device.laptop} {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  &:hover {
    background-color: ${(props) => (props.active ? "" : "rgba(0, 0, 0, 0.02)")};
  }

  &:focus {
    outline: none;
  }
`;

export const FilterBarHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  @media ${(props) => props.theme.device.laptop} {
    align-items: center;
  }
`;

export const FilterBarHeading = styled.h2`
  font-size: 1.3rem;
  padding-left: 1rem;
`;

export const ResetFilterButton = styled.button`
  border-color: ${(props) => props.theme.colors.red};
  border: 1px solid;
  color: ${(props) => props.theme.colors.red};
  border-radius: 15px;
  background-color: transparent;
  padding: 0.5rem;
  visibility: ${(props) => (props.show ? "show" : "hidden")};
  transition: background-color 0.2s;
  margin-left: 1rem;
  font-size: 0.8rem;

  @media ${(props) => props.theme.device.laptop} {
    font-size: 1rem;
    border-radius: 30px;
    padding: 0.3rem 1rem;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.red};
    color: #fff;
  }
`;
