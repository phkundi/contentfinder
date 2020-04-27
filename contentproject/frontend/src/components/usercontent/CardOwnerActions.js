import React from "react";
import { CardEditContainer, CardEditButton } from "../styles/ContentCardStyles";
import Modal from "../common/Modal";

function CardOwnerActions({ handleEdit, handleDelete, id, query }) {
  return (
    <CardEditContainer>
      <CardEditButton color="primary" onClick={() => handleEdit(id)}>
        <i className="far fa-edit" />
      </CardEditButton>
      <CardEditButton
        color="red"
        data-toggle="modal"
        data-target="#deleteContentModal"
      >
        <i className="far fa-trash-alt" />
      </CardEditButton>
      <Modal
        modalTitle="Are you sure?"
        modalMessage="Your content will be removed permanently."
        confirmButton="Delete"
        cancelButton="Keep Content"
        confirmAction={() => handleDelete(id, query)}
        modalType="warning"
        modalID="deleteContentModal"
      />
    </CardEditContainer>
  );
}
export default CardOwnerActions;
