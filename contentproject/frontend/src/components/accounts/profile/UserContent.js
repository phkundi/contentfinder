import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentCard from "../../usercontent/ContentCard";
import { ListContainer } from "../../styles/ContentListStyles";
import useContentState from "../../../hooks/useContentState";
import {
  UserContentContainer,
  UserContentHeading,
} from "../../styles/UserProfileStyles";

function UserContent() {
  const { getUserContent, deleteContent } = useContentState();
  const [userContent, setUserContent] = useState([]);

  useEffect(() => {
    getUserContent(setUserContent);
  }, []);

  const handleDelete = (id, query) => {
    deleteContent(id, query);
    setUserContent(userContent.filter((content) => content.id !== id));
  };

  return (
    <UserContentContainer>
      <UserContentHeading>Your Content</UserContentHeading>
      <ListContainer>
        {userContent
          ? userContent.map((content, i) => (
              <ContentCard
                key={i}
                content={content}
                editable={true}
                handleDelete={handleDelete}
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3"
              />
            ))
          : "Loading"}
      </ListContainer>
    </UserContentContainer>
  );
}

export default UserContent;
