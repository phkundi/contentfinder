import styled from "styled-components";

export const Card = styled.div`
  margin-bottom: 3rem;
  margin-right: 2%;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.light};
  border-radius: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${(props) => props.theme.device.laptop} {
    width: 45%;
  }

  @media ${(props) => props.theme.device.laptopL} {
    width: 23%;
  }

  @media ${(props) => props.theme.device.desktop} {
    width: 23%;
  }
`;

export const CardImage = styled.div`
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background-image: url(${(props) => props.source});
  background-size: cover;
  background-position: center;
  padding: 6rem;
`;

export const CardBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const ContentType = styled.span`
  font-weight: 500;
  text-transform: uppercase;
`;

export const CardTitle = styled.h2`
  font-size: 1.52rem;
`;

export const CardSubtitle = styled.h4`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.muted};
`;

export const CardDesription = styled.div`
  margin-top: 2rem;
`;

export const CardFooterBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardViewButton = styled.span`
  margin-bottom: 1rem;
  margin-right: 2rem;
  background-color: transparent;
  text-align: center;
  align-self: flex-end;
  font-weight: 500;

  & > a {
    color: ${(props) => props.theme.colors.muted};

    &:hover {
      color: #000;
      text-decoration: none;
    }
  }
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
  flex: 1;
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
  flex: 2;

  &:hover {
    color: #000;
    border-color: #000;
  }
`;
