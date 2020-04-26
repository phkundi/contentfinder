import React from "react";
import { Link } from "react-router-dom";
import { UserActionsContainer } from "../styles/HeaderStyles";

function HeaderGuestLinks() {
  return (
    <UserActionsContainer>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign Up</Link>
    </UserActionsContainer>
  );
}

export default HeaderGuestLinks;
