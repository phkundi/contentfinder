import React, { Fragment, useState } from "react";
import useToggleState from "../../hooks/useToggleState";
import useContentState from "../../hooks/useContentState";
import {
  ContentHighlightList,
  AddHighlightButton,
} from "../styles/ContentHighlightStyles";
import { ContentDetailSubtitle } from "../styles/ContentDetailStyles";
import ContentHighlightSingle from "./ContentHighlightSingle";

function ContentHighlights({ highlights, inProfile }) {
  const { updateHighlight, deleteHighlight } = useContentState();
  const [highlightState, setHighlightState] = useState(highlights);
  const [addNew, toggleAddNew] = useToggleState(false);

  const handleUpdate = (id, title, url) => {
    // Send API call to update highlight
    const updatedHighlight = { title: title, url: url };
    updateHighlight(id, updatedHighlight, highlightState, setHighlightState);
  };

  const handleCreate = () => {
    // Send API Call to create highlight
    // Set editing to false
    // Added Highlight should become permanently visible
  };

  const handleAddHighlight = () => {
    toggleAddNew();
  };

  const handleDelete = (id) => {
    deleteHighlight(id);
    setHighlightState(highlightState.filter((h) => h.id != id));
  };

  return (
    <Fragment>
      <ContentDetailSubtitle marginTop={true}>Highlights</ContentDetailSubtitle>
      <ContentHighlightList>
        {highlightState.map((highlight) => (
          <ContentHighlightSingle
            highlight={highlight}
            key={highlight.id}
            inProfile={inProfile}
            handleUpdate={handleUpdate}
            handleCreate={handleCreate}
            handleDelete={handleDelete}
          />
        ))}
        {addNew && (
          <ContentHighlightSingle
            isNew={true}
            inProfile={true}
            highlight={{ title: "", url: "" }}
            handleUpdate={handleUpdate}
            handleCreate={handleCreate}
          />
        )}
        <AddHighlightButton onClick={handleAddHighlight}>
          {addNew ? (
            <i className="fas fa-times" />
          ) : (
            <i className="fas fa-plus" />
          )}
        </AddHighlightButton>
      </ContentHighlightList>
    </Fragment>
  );
}

export default ContentHighlights;
