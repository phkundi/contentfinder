import React, { useState } from "react";
import {
  ShareFormSubtitle,
  FormGroup,
  OptionsContainer,
  ContentOption,
  ContentFormButtonContainer,
  ContentFormButton,
  ShareFormContainer,
  ShareFormTitle,
} from "../../styles/ShareFormStyles";

function SCFContentType({
  nextStep,
  setContentType,
  dispatchMessages,
  createMessage,
}) {
  const [active, setActive] = useState("Content");

  const handleNext = () => {
    if (
      active === "Blog" ||
      active === "Podcast" ||
      active === "Youtube Channel"
    ) {
      setContentType(active);
      nextStep();
    } else {
      dispatchMessages(
        createMessage({ noContentType: "Please select a content type" })
      );
    }
  };

  return (
    <ShareFormContainer>
      <ShareFormTitle>Submit {active}</ShareFormTitle>
      <ShareFormSubtitle center={true}>
        What kind of content are you sharing?
      </ShareFormSubtitle>
      <FormGroup>
        <OptionsContainer>
          <ContentOption
            onClick={() => setActive("Blog")}
            active={active === "Blog" ? true : false}
          >
            Blog
          </ContentOption>
          <ContentOption
            onClick={() => setActive("Podcast")}
            active={active === "Podcast" ? true : false}
          >
            Podcast
          </ContentOption>
          <ContentOption
            onClick={() => setActive("Youtube Channel")}
            active={active === "Youtube Channel" ? true : false}
          >
            Youtube Channel
          </ContentOption>
        </OptionsContainer>
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
