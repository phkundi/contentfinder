import React from "react";
import { Link } from "react-router-dom";
import {
  SidebarContainer,
  SidebarLogo,
  SidebarNav,
  SidebarMenu,
  SidebarListItem,
  SidebarButton,
} from "../styles/SidebarStyles";

function Sidebar({ auth }) {
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
      <Link to="#">Share your content</Link>
    </SidebarButton>
  );

  return (
    <SidebarContainer>
      <SidebarLogo>Content Finder</SidebarLogo>
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
        </SidebarMenu>
        {auth.isAuthenticated ? SidebarCreateButton : SidebarAuthButtons}
      </SidebarNav>
    </SidebarContainer>
  );
}

export default Sidebar;
