import React from "react";
import {
  FormGroup,
  ShareFormTextInput,
  ShareFormTextarea,
  ShareFormSubtitle,
  ContentFormButton,
  ContentFormButtonContainer,
  ShareFormContainer,
  ShareFormTitle,
} from "../../styles/ShareFormStyles";

function SCFContentDetails({
  nextStep,
  prevStep,
  contentType,
  contentTitle,
  contentDescription,
  setContentTitle,
  setContentDescription,
  dispatchMessages,
  createMessage,
}) {
  const handleNext = () => {
    if (!contentTitle) {
      dispatchMessages(
        createMessage({ noContentTitle: "Please enter a title" })
      );
    } else if (!contentDescription) {
      dispatchMessages(
        createMessage({ noContentDescription: "Please enter a description" })
      );
    } else {
      nextStep();
    }
  };
  return (
    <ShareFormContainer>
      <ShareFormTitle>Submit {contentType}</ShareFormTitle>
      <FormGroup>
        <ShareFormSubtitle>
          What is your {contentType} called?
        </ShareFormSubtitle>
        <ShareFormTextInput
          value={contentTitle}
          onChange={setContentTitle}
          placeholder={`My amazing ${contentType}`}
          autoFocus
        />
      </FormGroup>
      <FormGroup>
        <ShareFormSubtitle>
          Give a brief description of your {contentType}
        </ShareFormSubtitle>
        <ShareFormTextarea
          rows="6"
          value={contentDescription}
          onChange={setContentDescription}
          placeholder="Why should people pay attention?"
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

export default SCFContentDetails;
