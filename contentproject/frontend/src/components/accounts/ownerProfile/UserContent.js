import React, { useEffect, useState } from "react";
import ContentCard from "../../usercontent/ContentCard";
import { ListContainer } from "../../styles/ContentListStyles";
import useContentState from "../../../hooks/useContentState";
import useToggleState from "../../../hooks/useToggleState";
import Modal from "../../common/Modal";
import EditPost from "./EditPost";
import {
  UserContentContainer,
  UserContentHeading,
} from "../../styles/UserProfileStyles";

function UserContent() {
  const { getUserContent, deleteContent, updateContent } = useContentState();
  const [userContent, setUserContent] = useState([]);
  const [showModal, toggleShowModal] = useToggleState(false);
  const [editing, toggleEditing] = useToggleState(false);
  const [handleID, setHandleID] = useState(null);
  const [edited, toggleEdited] = useToggleState(false);

  useEffect(() => {
    getUserContent(setUserContent);
  }, [editing]);

  useEffect(() => {
    if (edited) getUserContent(setUserContent);
  }, [edited]);

  const handleDelete = (id) => {
    toggleShowModal();
    setHandleID(id);
  };

  const confirmedDelete = () => {
    toggleShowModal();
    deleteContent(handleID);
    // This is just so the card disappears - it will be permanently removed from the DB in the deleteContent call
    setUserContent(userContent.filter((content) => content.id !== handleID));
  };

  const handleEdit = (id) => {
    setHandleID(id);
    toggleEditing();
  };

  const saveEdit = (id, content) => {
    updateContent(id, content);
    toggleEditing();
    toggleEdited();
  };

  return (
    <UserContentContainer>
      {showModal && (
        <Modal
          modalTitle="Confirm Delete"
          modalMessage="Are you sure you want to delete your content? It will be removed permanently."
          confirmButton="Delete"
          confirmAction={confirmedDelete}
          cancelButton="Keep Content"
          toggleShowModal={toggleShowModal}
        />
      )}
      <UserContentHeading>
        {editing ? "Edit Post" : "Your Content"}
      </UserContentHeading>
      {editing ? (
        <EditPost
          id={handleID}
          toggleEditing={toggleEditing}
          saveEdit={saveEdit}
        />
      ) : (
        <ListContainer>
          {userContent &&
            userContent.map((content, i) => (
              <ContentCard
                key={i}
                content={content}
                editable={true}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3"
              />
            ))}
        </ListContainer>
      )}
    </UserContentContainer>
  );
}

export default UserContent;
