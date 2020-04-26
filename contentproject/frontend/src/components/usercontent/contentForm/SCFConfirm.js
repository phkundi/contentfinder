import React from "react";
import {
  ShareFormContainer,
  ShareFormTitle,
  ShareFormSubheading,
  ContentFormButtonContainer,
  ContentFormButton,
  ShareFormText,
  ShareFormConfirmScreen,
} from "../../styles/ShareFormStyles";

function SCFConfirm({
  prevStep,
  contentType,
  contentTitle,
  contentDescription,
  contentURL,
  contentTags,
  handleSubmit,
}) {
  return (
    <ShareFormContainer>
      <ShareFormTitle>Confirm Info</ShareFormTitle>
      <ShareFormConfirmScreen>
        <ShareFormSubheading>Content Type</ShareFormSubheading>
        <ShareFormText>{contentType}</ShareFormText>

        <ShareFormSubheading>Title</ShareFormSubheading>
        <ShareFormText>{contentTitle}</ShareFormText>

        <ShareFormSubheading>Description</ShareFormSubheading>
        <ShareFormText>{contentDescription}</ShareFormText>

        <ShareFormSubheading>URL</ShareFormSubheading>
        <ShareFormText>
          <a href={contentURL}>{contentURL}</a>
        </ShareFormText>

        <ShareFormSubheading>Tags</ShareFormSubheading>
        <ShareFormText>{contentTags.join(", ")}</ShareFormText>
      </ShareFormConfirmScreen>

      <ContentFormButtonContainer>
        <ContentFormButton onClick={prevStep}>Back</ContentFormButton>
        <ContentFormButton next={true} onClick={handleSubmit}>
          Submit
        </ContentFormButton>
      </ContentFormButtonContainer>
    </ShareFormContainer>
  );
}
export default SCFConfirm;
