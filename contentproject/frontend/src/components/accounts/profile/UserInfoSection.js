import React from "react";
import useToggleState from "../../../hooks/useToggleState";
import {
  UserInfoSectionContainer,
  UserInfoHeading,
  EditInfo,
  UserInfoInput,
  UserTextArea,
  UserInfoContent,
} from "../../styles/UserProfileStyles";

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
