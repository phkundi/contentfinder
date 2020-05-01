import React, { useState, useEffect } from "react";
import useContentState from "../../../hooks/useContentState";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
  ContentType,
} from "../../styles/ContentDetailStyles";
import { UserProfileButton } from "../../styles/UserProfileStyles";
import styled from "styled-components";

const EditPostInput = styled.input`
  background-color: white;
  padding-bottom: 0.5rem;
  font-size: inherit;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  width: 100%;
  margin-top: 1rem;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;
const EditPostTextArea = styled.textarea`
  background-color: white;
  padding: 0.5rem;
  font-size: inherit;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  width: 100%;
  min-height: 200px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const EditPostButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & > button {
    padding: 0.5rem 1.5rem;
  }
`;

const EditPostImageButton = styled.div`
  position: absolute;
  top: 0;
  ${(props) => props.left && "left: 0"};
  ${(props) => props.right && "right: 0"};
  border-top-right-radius: ${(props) => props.right && "30px"};
  border-bottom-left-radius: ${(props) => props.right && "30px"};
  border-top-left-radius: ${(props) => props.left && "30px"};
  border-bottom-right-radius: ${(props) => props.left && "30px"};
  background-color: white;
  padding: 0.5rem 1.5rem;
  color: ${(props) => props.theme.colors[props.color]};
  font-size: 2rem;
  cursor: pointer;
`;

function EditPost({ id, toggleEditing, saveEdit }) {
  const [content, setContent] = useState("");
  const { getSinglePost } = useContentState();
  const { content_type, name, url, description } = content;
  const [newInfo, setNewInfo] = useState({
    newName: "Name",
    newDescription: "Description",
    newURL: "URL",
  });
  const { newName, newDescription, newURL } = newInfo;

  useEffect(() => {
    getSinglePost(id, setContent);
  }, []);

  useEffect(() => {
    setNewInfo({
      newName: name,
      newDescription: description,
      newURL: url,
    });
  }, [content]);

  const handleChange = (e) => {
    setNewInfo({ ...newInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveEdit(id, newInfo);
  };

  if (content) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source="https://source.unsplash.com/random">
          <EditPostImageButton right={true} color="red" onClick={toggleEditing}>
            <i className="fas fa-times" />
          </EditPostImageButton>
          <EditPostImageButton left={true} color="primary">
            <i className="fas fa-images" />
          </EditPostImageButton>
        </ContentDetailImage>
        <ContentDetailBody>
          <ContentType>{content_type}</ContentType>
          <ContentDetailTitle>
            <EditPostInput
              type="text"
              name="newName"
              value={newName || ""}
              onChange={handleChange}
            />
          </ContentDetailTitle>

          <ContentDetailURL>
            <EditPostInput
              type="text"
              value={newURL || ""}
              onChange={handleChange}
              name="newURL"
            />
          </ContentDetailURL>

          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <EditPostTextArea
              value={newDescription || ""}
              onChange={handleChange}
              name="newDescription"
            />
          </ContentDetailInfo>
          <EditPostButtonContainer>
            <UserProfileButton color="primary" onClick={handleSave}>
              Save Changes
            </UserProfileButton>
          </EditPostButtonContainer>
        </ContentDetailBody>
      </ContentDetailContainer>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default EditPost;
