import styled from "styled-components";

export const ContentHighlightList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentHighlight = styled.div`
  padding: 1rem 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: 15px;
  margin: 0.5rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.019);
  transition: box-shadow 0.4s ease-in-out, color 0.4s ease-in-out;

  & > a {
    color: ${(props) => props.theme.colors.muted};
  }

  & > .openNotice {
    margin: 0 1rem;
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.primary};
    display: none;
  }

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow.medium};
    & > a {
      color: #000;
    }
    & > .openNotice {
      display: block;
    }
  }
`;

export const HighlightEditButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.muted};

  &:hover {
    color: ${(props) => props.theme.colors[props.color]};
  }

  & > i {
    margin: 0 0.5rem;
  }
`;

export const EditHighlightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const EditHighlightInput = styled.input`
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid #000;
  width: 90%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const AddHighlightButton = styled.button`
  border: 2px solid black;
  border-radius: 50%;
  background-color: transparent;
  outline: none;
  width: 40px;
  height: 40px;
  margin: 1rem 0;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: black;
    color: white;
  }
`;
