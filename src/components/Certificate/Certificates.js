import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./Certificates.scss";

const Certificates = ({ items }) => {
  const [modalItem, setModalItem] = useState("");
  const [show, setShow] = useState(false);
  const handleModal = (item) => {
    setModalItem(item);
    setShow(true);
  };

  return (
    <div className="wrap-certificates">
      {items.map((item) => (
        <img
          key={item.id}
          className="certificate"
          src={item.certificate.substring(0, item.certificate.indexOf("?"))}
          alt={item.title}
          onClick={() => handleModal(item)}
        />
      ))}
      {show && (
        <Modal
          size="xl"
          centered
          animation={false}
          show={show}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>{modalItem.title}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              style={{ width: "100%" }}
              src={modalItem.certificate.substring(
                0,
                modalItem.certificate.indexOf("?")
              )}
              alt={modalItem.title}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Certificates;
