import React, { memo } from "react";
import { Link } from "react-router-dom";
import {
  SidebarContainer,
  SidebarLogo,
  SidebarNav,
  SidebarMenu,
  SidebarListItem,
  SidebarButton,
} from "../styles/SidebarStyles";

const SidebarAuthButtons = (
  <div>
    <SidebarButton>
      <Link to="/login">Log In</Link>
    </SidebarButton>
    <SidebarButton outlined={true}>
      <Link to="/register">Create Account</Link>
    </SidebarButton>
  </div>
);

const SidebarCreateButton = (
  <SidebarButton>
    <Link to="/share">Share Content</Link>
  </SidebarButton>
);

function Sidebar({ auth }) {
  return (
    <SidebarContainer>
      <SidebarLogo>
        <Link to="/">Content Finder</Link>
      </SidebarLogo>
      <SidebarNav>
        <SidebarMenu>
          <SidebarListItem isHeading={true}>Menu</SidebarListItem>
          <SidebarListItem>
            <Link to="/">Explore</Link>
          </SidebarListItem>
          <SidebarListItem>
            <Link to="/blogs">Blogs</Link>
          </SidebarListItem>
          <SidebarListItem>
            <Link to="/podcasts">Podcasts</Link>
          </SidebarListItem>
          <SidebarListItem>
            <Link to="/youtube">Youtube</Link>
          </SidebarListItem>
          {auth.isAuthenticated ? SidebarCreateButton : SidebarAuthButtons}
        </SidebarMenu>
      </SidebarNav>
    </SidebarContainer>
  );
}

export default memo(Sidebar);
