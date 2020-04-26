import React from "react";
import isURI from "validate.io-uri";

import {
  FormGroup,
  ShareFormTextInput,
  ShareFormSubtitle,
  ContentFormButtonContainer,
  ContentFormButton,
  ShareFormContainer,
  ShareFormTitle,
} from "../../styles/ShareFormStyles";

function SCFURL({
  nextStep,
  prevStep,
  contentType,
  contentURL,
  setContentURL,
  dispatchMessages,
  createMessage,
}) {
  const handleNext = () => {
    if (isURI(contentURL)) {
      nextStep();
    } else {
      dispatchMessages(
        createMessage({ urlInvalid: "Please enter a valid URL" })
      );
    }
  };

  return (
    <ShareFormContainer>
      <ShareFormTitle>Submit {contentType}</ShareFormTitle>
      <FormGroup>
        <ShareFormSubtitle>
          Where can we find your {contentType}?
        </ShareFormSubtitle>
        <ShareFormTextInput
          placeholder="http://example.com"
          value={contentURL}
          onChange={setContentURL}
          autoFocus
        />
      </FormGroup>
      <ContentFormButtonContainer>
        <ContentFormButton onClick={prevStep}>Back</ContentFormButton>
        <ContentFormButton onClick={handleNext} next={true}>
          Next
        </ContentFormButton>
      </ContentFormButtonContainer>
    </ShareFormContainer>
  );
}
export default SCFURL;
