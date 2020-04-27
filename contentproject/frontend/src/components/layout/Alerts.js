import React, { Fragment, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import { ErrorContext } from "../../context/errorContext";
import { MessageContext } from "../../context/messageContext";
import { CLEAR_MESSAGES, CLEAR_ERRORS } from "../../reducers/types";

function Alerts() {
  const { errors, dispatchErrors } = useContext(ErrorContext);
  const { messages, dispatchMessages } = useContext(MessageContext);
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
    // Clear error state to prevent alert from showing up multiple times
    if (Object.keys(errors).length > 0) {
      dispatchErrors({ type: CLEAR_ERRORS });
    }
  }, [errors.show]);

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
    if (messages.userDeleted) {
      alert.success(messages.userDeleted);
    }
    if (messages.contentDeleted) {
      alert.success(messages.contentDeleted);
    }
    if (messages.userUpdated) {
      alert.success(messages.userUpdated);
    }
    // Clear error state to prevent alert from showing up multiple times
    if (Object.keys(messages).length > 0) {
      dispatchMessages({ type: CLEAR_MESSAGES });
    }
  }, [messages.show]);

  return <Fragment />;
}
export default Alerts;
