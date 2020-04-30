import React from "react";
import { CardEditContainer, CardEditButton } from "../styles/ContentCardStyles";

function CardOwnerActions({ handleEdit, handleDelete, id }) {
  return (
    <CardEditContainer>
      <CardEditButton color="primary" onClick={() => handleEdit(id)}>
        <i className="far fa-edit" />
      </CardEditButton>
      <CardEditButton color="red" onClick={() => handleDelete(id)}>
        <i className="far fa-trash-alt" />
      </CardEditButton>
    </CardEditContainer>
  );
}
export default CardOwnerActions;
