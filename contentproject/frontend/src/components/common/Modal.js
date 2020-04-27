import React from "react";

function Modal({
  modalTitle,
  modalMessage,
  confirmButton,
  confirmAction,
  cancelButton,
  modalID,
}) {
  return (
    <div
      className="modal fade"
      id={modalID}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${modalID}Title`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {modalTitle}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{modalMessage}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              {cancelButton}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={confirmAction}
              data-toggle="modal"
              data-target={`#${modalID}`}
            >
              {confirmButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
