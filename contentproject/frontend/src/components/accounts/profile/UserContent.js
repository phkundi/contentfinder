import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentCard from "../../usercontent/ContentCard";
import { ListContainer } from "../../styles/ContentListStyles";
import useContentState from "../../../hooks/useContentState";

const UserContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  flex-direction: column;
`;

const UserContentHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
`;

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
              />
            ))
          : "Loading"}
      </ListContainer>
    </UserContentContainer>
  );
}

export default UserContent;
