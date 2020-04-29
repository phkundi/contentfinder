import styled from "styled-components";

export const ContentDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentDetailContainer = styled.div`
  background-color: #fff;
  border-radius: 0px;
  margin: 0;
  width: 100%;
  box-shadow: ${(props) => props.theme.boxShadow.medium};

  @media ${(props) => props.theme.device.laptop} {
    margin: 1rem;
    border-radius: 30px;
  }
`;

export const ContentDetailImage = styled.div`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  padding: 10rem;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.source});
  position: relative;

  @media ${(props) => props.theme.device.laptop} {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
`;

export const ContentDetailTitle = styled.h1`
  font-size: 3rem;
`;

export const ContentDetailSubtitle = styled.h2`
  font-size: 1.3rem;
  color: ${(props) => (props.muted ? props.theme.colors.muted : "#000")};
  margin-top: ${(props) => (props.marginTop ? "3rem" : "0")};
`;

export const ContentDetailBody = styled.div`
  margin-top: 1rem;
  padding: 2rem;
`;

export const ContentDetailInfo = styled.div`
  margin-top: 3rem;
`;

export const ContentDetailURL = styled.a`
  font-size: 1.5rem;
`;

export const ContentType = styled.h5`
  font-size: 1.5rem;
  text-transform: uppercase;
`;
