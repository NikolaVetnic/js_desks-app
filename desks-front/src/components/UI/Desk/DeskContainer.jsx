import { useEffect, useState } from "react";

import {
    Button,
    ButtonToolbar,
    OverlayTrigger
} from "react-bootstrap";
import "./DeskContainer.css";
import { AvailableTooltip } from "../Tooltip/Tooltips";
import DeskReservations from "./DeskReservations/DeskReservations";

const desks = [
    { location: "hd", room: 1, desk: 1, addedBy: "admin@admin.com" },
    { location: "ns", room: 1, desk: 1, addedBy: "admin@admin.com" },
    { location: "ns", room: 2, desk: 3, addedBy: "admin@admin.com" },
    { location: "ns", room: 3, desk: 2, addedBy: "admin@admin.com" },
    { location: "md", room: 1, desk: 1, addedBy: "admin@admin.com" },
    { location: "md", room: 2, desk: 2, addedBy: "admin@admin.com" },
];

//{ addedBy: "admin@admin.com", desk: 123, location: "ns", room: 1234 }
const DeskContainer = ({ location }) => {

    //selected desk variable to change on button clicked
    const [selectedDesk, setSelectedDesk] = useState(null);

    useEffect(() => {
        if (selectedDesk !== null) {
          console.log(selectedDesk);
        }
      }, [selectedDesk]);

    const handleModalOpen = (item) => {
        setSelectedDesk(item);
    };

    const positionerInstance = (item) => {
        return (<ButtonToolbar>
            <OverlayTrigger placement="top" overlay={AvailableTooltip}>
                <Button
                    onClick={() => handleModalOpen(item)}
                    variant="success"
                    className="flexbox-item"
                ></Button>
            </OverlayTrigger>
        </ButtonToolbar>);
    };

    return (
        <>
            <div className="flexbox-container mt-3">
            <div className="rowChild">
                {desks.map((item,index) => {
                    if(location === item.location){
                        return (
                            <div key={index}>
                                {positionerInstance(item)}
                                
                            </div>
                        );
                    }
                })}
            </div>
            </div>
            <div>
                {!!selectedDesk && <DeskReservations prop={selectedDesk} />}
            </div>
        </>
    );
};

export default DeskContainer;
