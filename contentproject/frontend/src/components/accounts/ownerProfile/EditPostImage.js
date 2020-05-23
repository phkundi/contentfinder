import React from "react";
import { ContentDetailImage } from "../../styles/ContentDetailStyles";
import {
  ChangeImageActions,
  ChangeImageInput,
  ChangeImageLabel,
  ChangeImageConfirm,
  ImageUploading,
  EditPostImageButton,
} from "../../styles/UserProfileStyles";

function EditPostImage(
  uploading,
  toggleEditing,
  imageURL,
  toggleShowImageModal,
  showImageModal,
  handleImageUpload,
  handleImageChange
) {
  return (
    <ContentDetailImage source={imageURL}>
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
  );
}

export default EditPostImage;
