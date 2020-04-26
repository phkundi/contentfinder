import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../../axiosInstance";
import UserInfoSection from "./UserInfoSection";

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserInformationContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: ${(props) => props.theme.boxShadow.medium};
`;

const UserProfileTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const UserInfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SaveChangesButton = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border-radius: 30px;
  align-self: center;
  float: right;
`;

function UserProfile({ auth }) {
  const { user } = auth;
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [bio, setBio] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/auth/profiles/${user.id}/`).then((res) => {
      setProfile(res.data);
    });
  }, []);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio);
    }
  }, [profile]);

  const handleSubmit = () => {
    console.log("submit");
  };

  if (profile) {
    return (
      <UserProfileContainer>
        <UserInformationContainer>
          <UserProfileTitle>Your Profile</UserProfileTitle>
          <UserInfoGroup>
            <UserInfoSection
              width="50%"
              heading="Username"
              value={username}
              setValue={setUsername}
            />
            <UserInfoSection
              width="50%"
              heading="Email"
              value={email}
              setValue={setEmail}
            />
          </UserInfoGroup>
          <UserInfoGroup>
            <UserInfoSection
              width="50%"
              heading="First Name"
              value={firstName}
              setValue={setFirstName}
            />
            <UserInfoSection
              width="50%"
              heading="Last Name"
              value={lastName}
              setValue={setLastName}
            />
          </UserInfoGroup>
          <UserInfoGroup>
            <UserInfoSection
              width="100%"
              heading="Bio"
              textArea={true}
              value={bio}
              setValue={setBio}
            />
          </UserInfoGroup>
          <SaveChangesButton onClick={handleSubmit}>
            Save Changes
          </SaveChangesButton>
        </UserInformationContainer>
      </UserProfileContainer>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default UserProfile;
