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

  @media ${(props) => props.theme.device.desktop} {
    width: 70%;
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

  @media ${(props) => props.theme.device.tablet} {
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

export const EditPostInput = styled.input`
  background-color: white;
  padding-bottom: 0.5rem;
  font-size: inherit;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  width: 100%;
  margin-top: 1rem;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

export const EditPostTextArea = styled.textarea`
  background-color: white;
  padding: 0.5rem;
  font-size: inherit;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  width: 100%;
  min-height: 200px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

export const EditPostButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & > button {
    padding: 0.5rem 1.5rem;
  }
`;

export const EditPostImageButton = styled.div`
  position: absolute;
  top: 0;
  ${(props) => props.left && "left: 0"};
  ${(props) => props.right && "right: 0"};
  border-top-right-radius: ${(props) => props.right && "30px"};
  border-bottom-left-radius: ${(props) => props.right && "30px"};
  border-top-left-radius: ${(props) => props.left && "30px"};
  border-bottom-right-radius: ${(props) => props.left && "30px"};
  background-color: white;
  padding: 0.5rem 1.5rem;
  color: ${(props) => props.theme.colors[props.color]};
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const ChangeImageActions = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
`;

export const ChangeImageInput = styled.input`
  display: none;
`;

export const ChangeImageLabel = styled.label`
  font-size: 1rem;
  color: #fff;
  margin-left: 1rem;
  margin-bottom: 0;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  align-self: center;
`;

export const ChangeImageConfirm = styled.button`
  margin-left: 1rem;
  border: none;
  background-color: transparent;
  color: green;
`;

export const ImageUploading = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  color: #666;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  position: absolute;
  z-index: 4;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
