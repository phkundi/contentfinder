import React from "react";
import { UserProfileButton } from "../styles/UserProfileStyles";
import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalActions,
} from "../styles/ModalStyles";

function Modal({
  modalTitle,
  modalMessage,
  confirmButton,
  confirmAction,
  cancelButton,
  toggleShowModal,
}) {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <h3>{modalTitle}</h3>
        </ModalHeader>
        <ModalBody>
          <p>{modalMessage}</p>
        </ModalBody>
        <ModalActions>
          <UserProfileButton color="muted" onClick={toggleShowModal}>
            {cancelButton}
          </UserProfileButton>
          <UserProfileButton color="red" onClick={confirmAction}>
            {confirmButton}
          </UserProfileButton>
        </ModalActions>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;
