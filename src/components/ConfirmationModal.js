import React from "react";
import { Link } from "react-router-dom";

function ConfirmationModal(props) {
  return (
    <div
      className={`fade ${props.show ? "modal show" : ""}`}
      id={props.id}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${props.id}Label`}>
              Irreversible Action
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to proceed? This action is irreversible.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.handleClose}
            >
              Close
            </button>
            <Link
              className="btn btn-danger"
              to={`/project/delete/${props.projectId}`}
            >
              Confirm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
