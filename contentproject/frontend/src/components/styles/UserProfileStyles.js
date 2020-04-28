import styled from "styled-components";

export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.device.laptop} {
    border-radius: 30px;
  }
`;

export const UserInformationContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  margin-bottom: 1rem;
  border-radius: 0px;
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  width: 100%;

  @media ${(props) => props.theme.device.laptop} {
    border-radius: 30px;
  }

  @media ${(props) => props.theme.device.desktopL} {
    width: 80%;
  }
`;

export const UserProfileTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;

  @media ${(props) => props.theme.device.laptop} {
    font-size: 2rem;
  }
`;

export const UserInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media ${(props) => props.theme.device.laptop} {
    flex-direction: row;
  }
`;

export const UserProfileButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const UserProfileButton = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.outlined ? "transparent" : props.theme.colors[props.color]};
  border-color: ${(props) => props.theme.colors[props.color]};
  border: 2px solid;
  color: ${(props) =>
    props.outlined ? props.theme.colors[props.color] : "#fff"};
  border-radius: 30px;
  align-self: center;
  transition: background-color 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) =>
      props.outlined ? props.theme.colors[props.color] : ""};
    color: ${(props) => (props.outlined ? "#fff" : "")};
  }
`;

export const UserInfoSectionContainer = styled.div`
  padding: 1rem;
  width: 100%;

  @media ${(props) => props.theme.device.laptop} {
    width: ${(props) => props.width};
  }
`;

export const UserInfoHeading = styled.h3`
  font-size: 1.2rem;
`;

export const EditInfo = styled.button`
  color: ${(props) =>
    props.isEditing ? props.theme.colors.red : props.theme.colors.muted};
  font-size: 1rem;
  margin-left: 1rem;
  background-color: transparent;
  border: none;
  &:hover {
    color: ${(props) =>
      props.isEditing ? "darkred" : props.theme.colors.primary};
  }
  &:focus {
    outline: none;
  }
`;

export const UserInfoInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;

  &:focus {
    outline: none;
  }
`;

export const UserTextArea = styled.textarea`
  padding: 1rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  &:focus {
    outline: none;
  }
`;

export const UserInfoContent = styled.p``;

export const UserContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  padding: 0 1rem;
  flex-direction: column;

  @media ${(props) => props.theme.device.laptop} {
    padding: 0;
  }
`;

export const UserContentHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
`;
