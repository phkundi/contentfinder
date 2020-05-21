import React, { useState } from "react";
import {
  ShareFormSubtitle,
  FormGroup,
  FileUpload,
  FileInput,
  FileLabel,
  FileSubmit,
  FileLoading,
  ContentFormButtonContainer,
  ContentFormButton,
  ShareFormContainer,
  ShareFormTitle,
} from "../../styles/ShareFormStyles";

function SCFContentType({
  nextStep,
  contentType,
  dispatchMessages,
  createMessage,
  contentImage,
  setContentImage,
}) {
  const handleNext = () => {
    if (contentImage) {
      const extension = contentImage.name.split(".").pop();
      if (extension.match(/(jpg|jpeg|png|gif)$/i)) {
        nextStep();
      } else {
        dispatchMessages(
          createMessage({
            noImageFile: "The file you selected is not an image",
          })
        );
      }
    } else {
      nextStep();
    }
  };

  const handleImageChange = (e) => {
    let fileName = (fileName = e.target.value.split("\\").pop());
    let label = document.getElementById("file-input-label");
    setContentImage(e.target.files[0]);
  };

  return (
    <ShareFormContainer>
      <ShareFormTitle>Submit {contentType}</ShareFormTitle>

      <FormGroup>
        <FileUpload>
          <FileLabel
            htmlFor="myfile"
            className="btn btn-outline-primary"
            id="file-input-label"
          >
            {contentImage ? contentImage.name : "Choose Image (optional)"}
          </FileLabel>
          <FileInput
            type="file"
            id="myfile"
            name="myfile"
            onChange={handleImageChange}
          />
        </FileUpload>
      </FormGroup>
      <ContentFormButtonContainer>
        <ContentFormButton onClick={handleNext} next={true}>
          Next
        </ContentFormButton>
      </ContentFormButtonContainer>
    </ShareFormContainer>
  );
}

export default SCFContentType;
