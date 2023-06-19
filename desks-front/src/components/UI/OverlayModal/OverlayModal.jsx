import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./OverlayModal.css"; // Import your custom CSS styles for the modal

const OverlayModal = ({ isOpen, onClose, content }) => {
    const { title, msg } = content;
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                overlayClassName="modal-overlay"
                className="modal-box"
            >
                <h2>{title}</h2>
                <p>{msg}</p>
                <Button className="btn btn-primary" onClick={onClose}>
                    Close
                </Button>
            </Modal>
        </div>
    );
};

export default OverlayModal;
