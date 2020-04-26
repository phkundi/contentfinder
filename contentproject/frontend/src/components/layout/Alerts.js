import React, { Fragment, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import { ErrorContext } from "../../context/errorContext";
import { MessageContext } from "../../context/messageContext";

function Alerts() {
  const { errors } = useContext(ErrorContext);
  const { messages } = useContext(MessageContext);
  const alert = useAlert();

  useEffect(() => {
    if (errors.msg.name) {
      alert.error(`Name: ${errors.msg.name.join()}`);
    }
    if (errors.msg.email) {
      alert.error(`Email: ${errors.msg.email.join()}`);
    }
    if (errors.msg.message) {
      alert.error(`Message: ${errors.msg.message.join()}`);
    }
    if (errors.msg.non_field_errors) {
      alert.error(errors.msg.non_field_errors.join());
    }
    if (errors.msg.username) {
      alert.error(errors.msg.username.join());
    }
    if (errors.msg.url) {
      alert.error(errors.msg.url.join());
    }
  }, [errors]);

  useEffect(() => {
    if (messages.passwordsNotMatch) {
      alert.error(messages.passwordsNotMatch);
    }
    if (messages.urlInvalid) {
      alert.error(messages.urlInvalid);
    }
    if (messages.noContentType) {
      alert.error(messages.noContentType);
    }
    if (messages.noContentTitle) {
      alert.error(messages.noContentTitle);
    }
    if (messages.noContentDescription) {
      alert.error(messages.noContentDescription);
    }
    if (messages.tooManyTags) {
      alert.error(messages.tooManyTags);
    }
    if (messages.contentAdded) {
      alert.success(messages.contentAdded);
    }
  }, [messages]);

  return <Fragment />;
}
export default Alerts;
