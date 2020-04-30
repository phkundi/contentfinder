import styled from "styled-components";

export const SearchBarContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  visibility: ${(props) => (props.hideSearch ? "hidden" : "show")};

  @media ${(props) => props.theme.device.laptop} {
    width: 70%;
  }

  @media ${(props) => props.theme.device.desktop} {
    width: 40%;
  }
`;

export const SearchIcon = styled.i`
  align-self: center;
  color: #fff;
  margin-right: 1rem;
  font-size: 1.2rem;

  @media ${(props) => props.theme.device.laptop} {
    color: rgba(0, 0, 0, 0.4);
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const SearchBarInput = styled.input`
  background-color: white;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  width: 100%;
  border-bottom: 1px solid;
  border-color: transparent;
  border-radius: 30px;

  &:focus {
    border-color: rgba(0, 0, 0, 0.4);
  }

  @media ${(props) => props.theme.device.laptop} {
    background-color: transparent;
    border-radius: 0px;
  }
`;

export const CloseSearch = styled.button`
  display: none;

  @media ${(props) => props.theme.device.laptop} {
    display: block;
    background-color: transparent;
    border: none;
    outline: none;
    color: ${(props) => props.theme.colors.red};
    font-size: 1.2rem;
  }
`;

export const SearchMinLength = styled.p`
  color: ${(props) => props.theme.colors.muted};
`;

export const SearchResultsTitle = styled.span`
  display: block;

  @media ${(props) => props.theme.device.laptop} {
    background-color: transparent;
    border-radius: 0px;
    display: unset;
  }
`;
