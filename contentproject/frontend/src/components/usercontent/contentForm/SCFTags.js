import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../axiosInstance";
import { shuffleArray } from "../../../helpers/helpers";
import {
  ShareFormSubtitle,
  ContentFormButton,
  ContentFormButtonContainer,
  ShareFormContainer,
  ShareFormTitle,
  ShareFormTagsContainer,
  ShareFormTag,
  ShareFormTagSearch,
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
  const [filteredTags, setFilteredTags] = useState([]);
  const [tagQuery, setTagQuery] = useState("");

  useEffect(() => {
    const getTags = () => {
      axiosInstance.get("content/tags/").then((res) => {
        setTags(res.data);
        const previewTags = shuffleArray(res.data).slice(0, 10);
        setFilteredTags(previewTags);
      });
    };
    getTags();
  }, []);

  const handleSelect = (e) => {
    // If selected tag is already in selected tags, remove it
    if (contentTags.includes(e.target.textContent)) {
      setContentTags(contentTags.filter((c) => c !== e.target.textContent));
      // Else, update state to contain both the existing tags and the new tag
    } else {
      setContentTags([...contentTags, e.target.textContent]);
    }
    // Reset search state
    setFilteredTags([]);
    setTagQuery();
  };

  // Go to next page if user has not selected too many tags
  const handleNext = () => {
    if (contentTags.length < 4) {
      nextStep();
    } else if (!contentTags) {
      dispatchMessages(
        createMessage({ noTags: "Please select at least one tag" })
      );
    } else {
      dispatchMessages(
        createMessage({ tooManyTags: "You can select a maximum of 3 tags" })
      );
    }
  };

  const handleSearch = (e) => {
    setTagQuery(e.target.value);
    let result = tags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
        !contentTags.includes(tag.name)
    );
    setFilteredTags(result);
  };

  const tagList = (
    <ShareFormTagsContainer>
      {/* Map over already selected tags and mark them active */}
      {contentTags.map((tag) => (
        <ShareFormTag active={true} onClick={handleSelect} key={tag.id}>
          {tag}
        </ShareFormTag>
      ))}
      {/* Then map over the remaining tags that fit the query */}
      {filteredTags &&
        filteredTags.map((tag) => (
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
      <ShareFormTagSearch
        type="text"
        placeholder="Search Tags"
        value={tagQuery}
        onChange={handleSearch}
      />
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
