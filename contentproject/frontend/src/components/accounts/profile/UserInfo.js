import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../../axiosInstance";
import UserInfoSection from "./UserInfoSection";
import useAuthState from "../../../hooks/useAuthState";
import Modal from "../../common/Modal";

const UserInformationContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  margin-bottom: 1rem;
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

const UserProfileButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const UserProfileButton = styled.button`
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

function UserInfo({ auth }) {
  const { user } = auth;
  const { updateUser, deleteUser } = useAuthState();
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
    updateUser({ username, email, firstName, lastName, bio });
  };

  const handleDelete = () => {
    deleteUser();
  };

  if (profile) {
    return (
      <UserInformationContainer>
        <Modal
          modalTitle="Are you sure?"
          modalMessage="If you delete your profile, all the information stored related to it will be deleted permanently."
          confirmButton="Delete"
          cancelButton="Keep Account"
          confirmAction={handleDelete}
          modalType="warning"
          modalID="deleteAccountModal"
        />
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
        <UserProfileButtonsContainer>
          <UserProfileButton
            color="red"
            outlined={true}
            data-toggle="modal"
            data-target="#deleteAccountModal"
          >
            Delete Profile
          </UserProfileButton>
          <UserProfileButton onClick={handleSubmit} color="primary">
            Save Changes
          </UserProfileButton>
        </UserProfileButtonsContainer>
      </UserInformationContainer>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default UserInfo;
