import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../axiosInstance";
import {
  ShareFormSubtitle,
  ContentFormButton,
  ContentFormButtonContainer,
  ShareFormContainer,
  ShareFormTitle,
  ShareFormTagsContainer,
  ShareFormTag,
} from "../../styles/ShareFormStyles";

function SCFTags({
  nextStep,
  prevStep,
  contentType,
  setContentTags,
  contentTags,
  dispatchMessages,
  createMessage,
}) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = () => {
      axiosInstance.get("content/tags/").then((res) => {
        setTags(res.data);
      });
    };
    getTags();
  }, []);

  const handleSelect = (e) => {
    if (contentTags.includes(e.target.textContent)) {
      setContentTags(contentTags.filter((c) => c !== e.target.textContent));
    } else {
      setContentTags([...contentTags, e.target.textContent]);
    }
  };

  const handleNext = () => {
    if (contentTags.length < 4) {
      nextStep();
    } else {
      dispatchMessages(
        createMessage({ tooManyTags: "You can select a maximum of 3 tags" })
      );
    }
  };

  const tagList = (
    <ShareFormTagsContainer>
      {tags.map((tag) => (
        <ShareFormTag
          active={contentTags.includes(tag.name)}
          onClick={handleSelect}
          key={tag.id}
        >
          {tag.name}
        </ShareFormTag>
      ))}
    </ShareFormTagsContainer>
  );

  return (
    <ShareFormContainer>
      <ShareFormTitle>Submit {contentType}</ShareFormTitle>
      <ShareFormSubtitle>
        Which of these tags fit your {contentType}?
      </ShareFormSubtitle>
      {tags ? tagList : "Loading..."}
      <ContentFormButtonContainer>
        <ContentFormButton onClick={prevStep}>Back</ContentFormButton>
        <ContentFormButton onClick={handleNext} next={true}>
          Next
        </ContentFormButton>
      </ContentFormButtonContainer>
    </ShareFormContainer>
  );
}
export default SCFTags;
