import React, { useState } from "react";
import useToggleState from "../../../hooks/useToggleState";
import styled from "styled-components";

const UserInfoSectionContainer = styled.div`
  padding: 1rem;
  width: ${(props) => props.width};
`;

const UserInfoHeading = styled.h3`
  font-size: 1.2rem;
`;

const EditInfo = styled.button`
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

const UserInfoInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;

  &:focus {
    outline: none;
  }
`;

const UserTextArea = styled.textarea`
  padding: 1rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  &:focus {
    outline: none;
  }
`;

const UserInfoContent = styled.p``;

function UserInfoSection({ width, heading, value, setValue, textArea }) {
  const [isEditing, toggleIsEditing] = useToggleState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const getInputType = () => {
    if (textArea) {
      return (
        <UserTextArea
          value={value}
          onChange={handleChange}
          autoFocus
          rows="6"
        />
      );
    } else {
      return <UserInfoInput value={value} onChange={handleChange} autoFocus />;
    }
  };

  return (
    <UserInfoSectionContainer width={width}>
      <UserInfoHeading>
        {heading}{" "}
        {isEditing ? (
          <EditInfo onClick={toggleIsEditing} isEditing={isEditing}>
            Close
          </EditInfo>
        ) : (
          <EditInfo onClick={toggleIsEditing} isEditing={isEditing}>
            Edit
          </EditInfo>
        )}
      </UserInfoHeading>
      {isEditing ? getInputType() : <UserInfoContent>{value}</UserInfoContent>}
    </UserInfoSectionContainer>
  );
}

export default UserInfoSection;
