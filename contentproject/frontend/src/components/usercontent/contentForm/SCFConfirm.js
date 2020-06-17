import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { defaultImages } from "../../../constants";
import {
  ShareFormContainer,
  ShareFormTitle,
  ContentFormButtonContainer,
  ContentFormButton,
  ImagePlaceholder,
} from "../../styles/ShareFormStyles";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
  ContentType,
  CardTags,
  TagBox,
  FooterText,
  CardFooter,
} from "../../styles/ContentDetailStyles";

function SCFConfirm({
  prevStep,
  contentType,
  contentTitle,
  contentDescription,
  contentURL,
  contentTags,
  contentImage,
  handleSubmit,
}) {
  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const getImage = () => {
    if (contentImage) {
      return "";
    } else {
      return defaultImages[contentType];
    }
  };
  return (
    <ShareFormContainer>
      <ShareFormTitle>Confirm Info</ShareFormTitle>
      <ContentDetailContainer style={{ margin: 0, width: "100%" }}>
        <ContentDetailImage source={getImage()}>
          {contentImage && (
            <ImagePlaceholder>Image will upload when saved</ImagePlaceholder>
          )}
        </ContentDetailImage>
        <ContentDetailBody>
          <ContentType>{contentType}</ContentType>
          <ContentDetailTitle>{contentTitle}</ContentDetailTitle>
          <ContentDetailSubtitle muted={true}>
            By {username}
          </ContentDetailSubtitle>
          <ContentDetailURL href={contentURL}>{contentURL}</ContentDetailURL>
          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <p>{contentDescription}</p>
          </ContentDetailInfo>
        </ContentDetailBody>
        <CardFooter>
          <CardTags>
            <FooterText>Tags: </FooterText>
            {contentTags.map((tag, i) => (
              <TagBox key={i} onClick={() => setFilter(tag)}>
                {tag}
              </TagBox>
            ))}
          </CardTags>
        </CardFooter>
      </ContentDetailContainer>
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
