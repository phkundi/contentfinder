import React from "react";
import useInputState from "../../../hooks/useInputState";
import ContentHighlightSingle from "../ContentHighlightSingle";
import {
  ContentHighlightList,
  EditHighlightContainer,
  EditHighlightInput,
  AddHighlightButton,
} from "../../styles/ContentHighlightStyles";
import {
  FormGroup,
  ShareFormSubtitle,
  ContentFormButton,
  ContentFormButtonContainer,
  ShareFormContainer,
  ShareFormTitle,
} from "../../styles/ShareFormStyles";

const contentPosts = {
  Blog: "Post",
  Podcast: "Episode",
  "Youtube Channel": "Video",
};

function SCFHighlights({
  contentType,
  nextStep,
  prevStep,
  contentHighlights,
  setContentHighlights,
}) {
  const [title, setTitle] = useInputState("");
  const [url, setUrl] = useInputState("");

  return (
    <ShareFormContainer>
      <ShareFormTitle>Submit {contentType}</ShareFormTitle>
      <ShareFormSubtitle>
        Add the Highlights of your {contentType} (optional)
      </ShareFormSubtitle>
      <ContentHighlightList>
        <EditHighlightContainer>
          <EditHighlightInput
            type="text"
            value={title}
            onChange={setTitle}
            placeholder={`${contentPosts[contentType]} Title`}
          />
          <EditHighlightInput
            type="text"
            value={url}
            onChange={setUrl}
            placeholder={`${contentPosts[contentType]} URL`}
          />
        </EditHighlightContainer>
        <AddHighlightButton>
          <i className="fas fa-plus" />
        </AddHighlightButton>
      </ContentHighlightList>
      <ContentFormButtonContainer>
        <ContentFormButton onClick={prevStep}>Back</ContentFormButton>
        <ContentFormButton onClick={nextStep} next={true}>
          Next
        </ContentFormButton>
      </ContentFormButtonContainer>
    </ShareFormContainer>
  );
}
export default SCFHighlights;
