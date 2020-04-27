import React from "react";
import { Link } from "react-router-dom";
import {
  UserActionsContainer,
  UserDropDownContainer,
  UserDropDownList,
  UserDropDownListItem,
} from "../styles/HeaderStyles";
import Avatar from "react-avatar";

function HeaderAuthLinks({ user, logout, toggleShowActions, showActions }) {
  return (
    <UserActionsContainer>
      <Avatar
        name={user.username}
        round={true}
        size="40"
        color="#0751ff"
        onClick={toggleShowActions}
        style={{ cursor: "pointer" }}
      />
      <UserDropDownContainer show={showActions} id="container">
        <UserDropDownList>
          <UserDropDownListItem>
            <Link to={`/profile`}>Profile</Link>
          </UserDropDownListItem>
          <UserDropDownListItem>
            <Link to="#" onClick={logout}>
              Logout
            </Link>
          </UserDropDownListItem>
        </UserDropDownList>
      </UserDropDownContainer>
    </UserActionsContainer>
  );
}
export default HeaderAuthLinks;
