import React from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import UserContent from "./UserContent";

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function UserProfile({ auth }) {
  return (
    <UserProfileContainer>
      <UserInfo auth={auth} />
      <UserContent />
    </UserProfileContainer>
  );
}

export default UserProfile;
