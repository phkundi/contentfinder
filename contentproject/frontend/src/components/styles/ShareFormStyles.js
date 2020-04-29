import styled from "styled-components";

export const ShareFormContainer = styled.div`
  background-color: #fff;

  box-shadow: ${(props) => props.theme.boxShadow.medium};
  padding: 2rem;
  height: 80%;
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
`;

export const ShareFormTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
`;

export const ShareFormTextInput = styled.input`
  border-radius: 2rem;
  width: 100%;
  padding: 1.3rem;
  border: 1px solid rgba(0, 0, 0, 0.4);

  &:focus {
    outline: none;
  }
`;

export const ShareFormTextarea = styled.textarea`
  border-radius: 2rem;
  width: 100%;
  padding: 1.6rem;
  border: 1px solid rgba(0, 0, 0, 0.4);

  &:focus {
    outline: none;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

export const ShareFormSubtitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

export const ShareFormSubheading = styled.h5`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.primary};
`;

export const ShareFormText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ContentOption = styled.span`
  padding: 1.5rem;
  border: 2px solid;
  border-color: ${(props) =>
    props.active ? props.theme.colors.primary : "rgba(0, 0, 0, 0.2)"};
  width: 80%;
  margin: 1rem 0;
  text-align: center;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${(props) => (props.active ? "#fff" : "#000")};
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};

  &:hover {
    background-color: ${(props) => (props.active ? "" : "rgba(0, 0, 0, 0.04)")};
  }
`;

export const ContentFormButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentFormButton = styled.button`
  padding: 1rem 2rem;
  margin: 1rem;
  border-radius: 30px;
  border: 2px solid;
  border-color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) =>
    props.next ? props.theme.colors.primary : "transparent"};
  color: ${(props) => (props.next ? "#fff" : props.theme.colors.primary)};

  &:focus {
    outline: none;
  }
`;

export const ShareFormConfirmScreen = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ShareFormTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ShareFormTag = styled.span`
  margin: 0.3rem;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  border-radius: 30px;
  min-width: 30%;
  text-align: center;
  border: 1px solid;
  cursor: pointer;
  color: ${(props) => (props.active ? "#fff" : "#000")};
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  border-color: ${(props) =>
    props.active ? props.theme.colors.primary : "rgba(0, 0, 0, 0.4)"};

  &:hover {
    background-color: ${(props) => (props.active ? "" : "rgba(0, 0, 0, 0.04)")};
  }
`;

export const ShareFormPrependContainer = styled.div`
  display: flex;
`;

export const ShareFormPrepend = styled.div`
  padding: 1.3rem;
  padding-right: 0.5rem;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-right: none;
`;

export const ShareFormPrependedInput = styled.input`
  border-radius: 2rem;
  border-top-left-radius: 0rem;
  border-bottom-left-radius: 0rem;
  width: 100%;
  padding: 1.3rem;
  padding-left: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-left: none;

  &:focus {
    outline: none;
  }
`;

export const ShareFormTagSearch = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  background-color: transparent;
  border-radius: 30px;

  &:focus {
    border-color: rgba(0, 0, 0, 0.4);
  }
`;
