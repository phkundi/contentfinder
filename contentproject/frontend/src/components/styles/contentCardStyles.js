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
  position: relative;
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

export const CardEditContainer = styled.div`
  display: flex;
  background-color: white;
  position: absolute;
  top: 0;
  right: 0;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  box-shadow: ${(props) => props.theme.boxShadow.medium};
`;

export const CardEditButton = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  outline: none;
  color: ${(props) => props.theme.colors[props.color]};
  font-size: 1.3rem;
  border-top-right-radius: 30px;

  &:first-child {
    border-bottom-left-radius: 30px;

    &:hover {
      border-top-right-radius: 0px;
    }
  }

  & :hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const LikeBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.light};
  cursor: pointer;

  &:hover {
    & > div > i {
      transform: scale(1.1);
    }
  }
`;

export const LikeBoxChildContainer = styled.div`
  position: relative;
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;

  & > i {
    position: absolute;
    font-size: 1.3rem;
    color: ${(props) => props.theme.colors.red};
  }

  & > span {
    color: ${(props) => props.theme.colors.muted};
    font-weight: 500;
  }
`;
