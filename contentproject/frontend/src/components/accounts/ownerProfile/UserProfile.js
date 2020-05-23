import React from "react";
import UserInfo from "./UserInfo";
import UserContent from "./UserContent";
import { UserProfileContainer } from "../../styles/UserProfileStyles";

function UserProfile({ auth }) {
  return (
    <UserProfileContainer>
      <UserInfo auth={auth} />
      <UserContent />
    </UserProfileContainer>
  );
}

export default UserProfile;
