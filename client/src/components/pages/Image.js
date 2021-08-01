import React from "react";
import { Modal } from "react-bootstrap";
import { baseURL } from "../../Config/API";

function Image({ data, show, handleClose }) {
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="reg_body img_t">
          <div
            style={{
              position: "absolute",
              right: 20,
            }}
          >
            <span
              onClick={handleClose}
              style={{
                cursor: "pointer",
                color: "white",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              X
            </span>
          </div>
          <img style={{ width: 350 }} src={baseURL + "/transact/" + data} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Image;
