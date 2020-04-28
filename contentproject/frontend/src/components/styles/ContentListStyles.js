import styled from "styled-components";

export const ListPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
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

  @media ${(props) => props.theme.device.laptop} {
    justify-content: flex-start;
  }
`;

export const ContentListHeading = styled.h2`
  font-size: 1.5rem;
  @media ${(props) => props.theme.device.laptop} {
    font-size: 2rem;
  }
`;
