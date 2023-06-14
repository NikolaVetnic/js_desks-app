import { useState } from "react";

import {
    Button,
    ButtonToolbar,
    Modal,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import "./DeskContainer.css";

const desks = [
    { location: "hd", room: 1, desk: 1, cretedBy: 1 },
    { location: "ns", room: 1, desk: 1, cretedBy: 1 },
    { location: "mg", room: 1, desk: 1, cretedBy: 1 },
];

const DeskContainer = ({ location }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const tooltip = (
        <Tooltip>
            <strong>Available</strong>
        </Tooltip>
    );

    const positionerInstance = (
        <ButtonToolbar>
            <OverlayTrigger placement="top" overlay={tooltip}>
                <Button
                    onClick={handleShow}
                    variant="success"
                    bsStyle="default"
                    className="flexbox-item"
                ></Button>
            </OverlayTrigger>
        </ButtonToolbar>
    );

    const deskRepresentation = (room, desk) => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Novi Sad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Room: {room}
                    <br />
                    Desk: {desk}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Reserve
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <div className="flexbox-container mt-3">
            {desks.map((item) => {
                return (
                    <div>
                        {positionerInstance}
                        {deskRepresentation(item.room, item.desk)}
                    </div>
                );
            })}
        </div>
    );
};

export default DeskContainer;
