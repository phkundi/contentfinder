import styled from "styled-components";

export const ListPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  max-width: 100%;
  padding: 1rem;

  @media ${(props) => props.theme.device.laptop} {
    padding: 0;
  }
`;

export const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const ContentListHeading = styled.h2``;
