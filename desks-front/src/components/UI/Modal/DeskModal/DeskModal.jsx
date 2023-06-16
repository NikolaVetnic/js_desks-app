import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const DeskModal = ({ room, desk, location, show, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Setting the state from parent 
  useEffect(() => {
    setIsModalOpen(show);
  }, [show]);

  const reserveDesk = () => {
    console.log(
      "Reserved desk in room: " + room + " number of desk: " + desk
    );
    handleCloseModal();
  };

  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    //calls the handleModalClose from parent to close Modal
    onClose();  
  };

  return (
    <Modal show={isModalOpen} onHide={handleCloseModal}>
      <Modal.Body>
       <h2>{location}</h2>
        Room: {room}
        <br />
        Desk: {desk}
        <br/>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={reserveDesk}>
          Reserve
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeskModal;