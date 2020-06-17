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

  @media ${(props) => props.theme.device.laptopL} {
    width: 75%;
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

export const CardFooter = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const CardTags = styled.div`
  display: flex;
  align-items: center;
`;

export const FooterText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.muted};
`;

export const TagBox = styled.button`
  padding: 0.4rem;
  background-color: white;
  border: 1px solid;
  color: ${(props) => props.theme.colors.muted};
  border-radius: 15px;
  font-size: 0.8rem;
  margin-left: 1rem;
  align-self: start;

  &:hover {
    color: #000;
    border-color: #000;
  }
`;
