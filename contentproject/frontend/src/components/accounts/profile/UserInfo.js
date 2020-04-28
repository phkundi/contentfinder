import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../axiosInstance";
import UserInfoSection from "./UserInfoSection";
import useAuthState from "../../../hooks/useAuthState";
import Modal from "../../common/Modal";
import {
  UserInformationContainer,
  UserProfileTitle,
  UserInfoGroup,
  UserProfileButtonsContainer,
  UserProfileButton,
} from "../../styles/UserProfileStyles";

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
