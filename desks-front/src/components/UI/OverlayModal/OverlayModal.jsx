import React from "react";
import Modal from "react-modal";
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
                <button className="btn btn-primary" onClick={onClose}>
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default OverlayModal;
