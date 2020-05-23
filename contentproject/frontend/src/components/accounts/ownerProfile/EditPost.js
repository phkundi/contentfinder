import React, { useState, useEffect } from "react";
import useContentState from "../../../hooks/useContentState";
import useToggleState from "../../../hooks/useToggleState";
import EditPostImage from "./EditPostImage"; // did not work - needs fix
import ContentHighlights from "../../usercontent/ContentHighlights";
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
import {
  UserProfileButton,
  EditPostInput,
  EditPostTextArea,
  EditPostButtonContainer,
  EditPostImageButton,
  ImageUploading,
  ChangeImageActions,
  ChangeImageInput,
  ChangeImageLabel,
  ChangeImageConfirm,
} from "../../styles/UserProfileStyles";

function EditPost({ id, toggleEditing, saveEdit }) {
  const { getSinglePost, updateContentImage } = useContentState();
  const [content, setContent] = useState("");
  // const { content_type, name, url, description, image_url } = content;
  const { post, highlights } = content;
  const [showImageModal, toggleShowImageModal] = useToggleState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newInfo, setNewInfo] = useState({
    newName: "Name",
    newDescription: "Description",
    newURL: "URL",
    newImage: "Image",
  });
  const { newName, newDescription, newURL, newImage } = newInfo;

  useEffect(() => {
    getSinglePost(id, setContent);
  }, []);

  useEffect(() => {
    setNewInfo({
      newName: post.name,
      newDescription: post.description,
      newURL: post.url,
      newImage: post.image_url,
    });
    setUploading(false);
  }, [content]);

  const handleChange = (e) => {
    setNewInfo({ ...newInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveEdit(id, newInfo);
  };

  const handleImageChange = (e) => {
    const label = document.getElementById("fileLabel");
    label.innerHTML = e.target.files[0].name;
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    setUploading(true);
    let formData = new FormData();
    formData.append("image", selectedImage, selectedImage.name);
    updateContentImage({ id, formData, setContent });
  };

  if (post) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source={newImage}>
          <ImageUploading show={uploading}>Uploading ...</ImageUploading>
          <EditPostImageButton right={true} color="red" onClick={toggleEditing}>
            <i className="fas fa-times" />
          </EditPostImageButton>
          <EditPostImageButton
            left={true}
            color="primary"
            onClick={toggleShowImageModal}
          >
            {showImageModal ? (
              <i className="fas fa-times" />
            ) : (
              <i className="fas fa-images" />
            )}

            <ChangeImageActions show={showImageModal}>
              <ChangeImageInput
                type="file"
                id="postImage"
                onChange={handleImageChange}
                name="postImage"
              />
              <ChangeImageLabel htmlFor="postImage" id="fileLabel">
                Choose Image
              </ChangeImageLabel>
              <ChangeImageConfirm>
                <i className="fas fa-check" onClick={handleImageUpload} />
              </ChangeImageConfirm>
            </ChangeImageActions>
          </EditPostImageButton>
        </ContentDetailImage>
        <ContentDetailBody>
          <ContentType>{post.content_type}</ContentType>
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
            <ContentHighlights highlights={highlights} inProfile={true} />
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
