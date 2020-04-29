import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import useInputState from "../../../hooks/useInputState";
import SCFContentType from "./SCFContentType";
import SCFContentDetails from "./SCFContentDetails";
import SCFURL from "./SCFURL";
import SCFTags from "./SCFTags";
import SCFConfirm from "./SCFConfirm";
import { MessageContext } from "../../../context/messageContext";
import { createMessage } from "../../../helpers/helpers";
import useContentState from "../../../hooks/useContentState";

function ShareContentForm(props) {
  // To make success alert
  const { dispatchMessages } = useContext(MessageContext);
  // To keep track of which form to display
  const [step, setStep] = useState(4);
  // Input state
  const [contentType, setContentType] = useState("none");
  const [contentTitle, setContentTitle] = useInputState("");
  const [contentDescription, setContentDescription] = useInputState("");
  const [contentURL, setContentURL] = useInputState("");
  const [contentTags, setContentTags] = useState([]);
  // Function to add content to database
  const { addContent } = useContentState();

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Return to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  const contentTypes = {
    Blog: "Blog",
    Podcast: "Podcast",
    "Youtube Channel": "Youtube",
  };

  // Submit Content to DB
  const handleSubmit = () => {
    const content = {
      name: contentTitle,
      description: contentDescription,
      url: contentURL,
      tags: contentTags,
      content_type: contentTypes[contentType],
    };

    addContent(content);
    // Redirect User
    nextStep();
  };

  switch (step) {
    case 1:
      return (
        <SCFContentType
          nextStep={nextStep}
          setContentType={setContentType}
          dispatchMessages={dispatchMessages}
          createMessage={createMessage}
        />
      );
    case 2:
      return (
        <SCFContentDetails
          nextStep={nextStep}
          prevStep={prevStep}
          contentType={contentType}
          contentTitle={contentTitle}
          setContentTitle={setContentTitle}
          contentDescription={contentDescription}
          setContentDescription={setContentDescription}
          dispatchMessages={dispatchMessages}
          createMessage={createMessage}
        />
      );
    case 3:
      return (
        <SCFURL
          nextStep={nextStep}
          prevStep={prevStep}
          contentType={contentType}
          contentURL={contentURL}
          setContentURL={setContentURL}
          dispatchMessages={dispatchMessages}
          createMessage={createMessage}
        />
      );
    case 4:
      return (
        <SCFTags
          nextStep={nextStep}
          prevStep={prevStep}
          contentType={contentType}
          contentTags={contentTags}
          setContentTags={setContentTags}
          dispatchMessages={dispatchMessages}
          createMessage={createMessage}
        />
      );
    case 5:
      return (
        <SCFConfirm
          prevStep={prevStep}
          contentType={contentType}
          contentTitle={contentTitle}
          contentDescription={contentDescription}
          contentURL={contentURL}
          contentTags={contentTags}
          handleSubmit={handleSubmit}
        />
      );
    case 6:
      return <Redirect to="/profile" />;
  }
}

export default ShareContentForm;
