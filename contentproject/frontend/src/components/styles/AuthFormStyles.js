import styled from "styled-components";

export const FormContainer = styled.div`
  background-color: #fff;

  box-shadow: ${(props) => props.theme.boxShadow.medium};
  padding: 2rem;

  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.device.tablet} {
    border-radius: 30px;
  }

  @media ${(props) => props.theme.device.laptop} {
    width: 60%;
    margin-top: 3rem;
  }

  @media ${(props) => props.theme.device.desktop} {
    width: 40%;
    margin-top: 3rem;
  }
`;

export const FormTitle = styled.h4`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
`;

export const FormTextInput = styled.input`
  border-radius: 2rem;
  width: 100%;
  padding: 1.6rem;
  border: 1px solid rgba(0, 0, 0, 0.4);

  &:focus {
    outline: none;
  }
`;

export const FormGroup = styled.div`
  padding-bottom: 1rem;
`;

export const FormButton = styled.button`
  background-color: ${(props) =>
    props.color ? props.color : props.theme.colors.primary};
  color: #fff;
  width: 100%;
  padding: 1rem;
  border-radius: 2rem;
  margin-top: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  &:focus {
    outline: none;
  }
`;
