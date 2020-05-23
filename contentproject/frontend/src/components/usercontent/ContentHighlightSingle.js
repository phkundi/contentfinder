import React, { Fragment } from "react";
import useToggleState from "../../hooks/useToggleState";
import useInputState from "../../hooks/useInputState";
import {
  ContentHighlight,
  EditHighlightContainer,
  EditHighlightInput,
  HighlightEditButton,
} from "../styles/ContentHighlightStyles";

function ContentHighlightSingle({
  highlight,
  inProfile,
  isNew,
  handleUpdate,
  handleDelete,
}) {
  const [editing, toggleEditing] = useToggleState(isNew);
  const [title, setTitle] = useInputState(highlight.title);
  const [url, setUrl] = useInputState(highlight.url);

  const handleUpdateClick = () => {
    // Trigger API Call
    const id = highlight.id;
    handleUpdate(id, title, url);
    // Set editing to false
    toggleEditing();
  };

  const editHighlight = (
    <EditHighlightContainer>
      <EditHighlightInput
        type="text"
        value={title}
        onChange={setTitle}
        placeholder="Highlight Title"
      />
      <EditHighlightInput
        type="text"
        value={url}
        onChange={setUrl}
        placeholder="Highlight URL"
      />
    </EditHighlightContainer>
  );

  return (
    <ContentHighlight>
      {editing ? editHighlight : <a href={highlight.url}>{highlight.title}</a>}
      {inProfile ? (
        <span className="editOptions">
          {editing ? (
            <HighlightEditButton
              onClick={isNew ? handleCreateClick : handleUpdateClick}
            >
              <i className="fas fa-check" />
            </HighlightEditButton>
          ) : (
            <Fragment>
              <HighlightEditButton color={"primary"} onClick={toggleEditing}>
                <i className="fas fa-edit" />
              </HighlightEditButton>
              <HighlightEditButton
                color={"red"}
                onClick={() => handleDelete(highlight.id)}
              >
                <i className="fas fa-trash-alt" />
              </HighlightEditButton>
            </Fragment>
          )}
        </span>
      ) : (
        <span className="openNotice">Open</span>
      )}
    </ContentHighlight>
  );
}

export default ContentHighlightSingle;
