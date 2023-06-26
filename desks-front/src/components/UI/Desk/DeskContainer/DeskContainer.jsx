import { useEffect, useState } from "react";

import { Button, ButtonToolbar, OverlayTrigger } from "react-bootstrap";
import "./DeskContainer.css";
import { AvailableTooltip } from "../../Tooltip/Tooltips";
import DropdownMenu from "../../DropdownMenu";
import SelectedDeskDisplay from "../SelectedDeskDisplay";
import getBookingsForUser from "../../../../utils/db/getBookingsForUser";
import verifyToken from "../../../../utils/verifyToken";
import UserBookingsDisplay from "../UserBookings/UserBookingsDisplay";

// temporary data, should be fetched from firebase
const desks = [
    { location: "hd", room: 1, desk: 1, addedBy: "admin@admin.com" },
    { location: "ns", room: 1, desk: 1, addedBy: "admin@admin.com" },
    { location: "ns", room: 1, desk: 5, addedBy: "admin@admin.com" },
    { location: "ns", room: 1, desk: 2, addedBy: "admin@admin.com" },
    { location: "md", room: 1, desk: 5, addedBy: "admin@admin.com" },
    { location: "md", room: 2, desk: 2, addedBy: "admin@admin.com" },
];

const menuOptions = [
    { value: "", label: "- choose option -" },
    { value: "hd", label: "Heidelberg" },
    { value: "md", label: "Magdeburg" },
    { value: "ns", label: "Novi Sad" },
];

const DeskContainer = () => {
    const [location, setLocation] = useState("");
    const [bookings, setBookings] = useState(null);


    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        setSelectedDesk(null);
        console.log(`location changed to ${event.target.value}`);
    };

    //selected desk variable to change on button clicked
    const [selectedDesk, setSelectedDesk] = useState(null);

    useEffect(() => {
        getUserBookings().then((result) => {
            if(result){
              setBookings(result);
            }
          }).catch((error) => {
            console.log(error);
          });
      }, [bookings]);
      
    const getUserBookings = async () => {
        return getBookingsForUser(verifyToken().username);
    };

    const handleModalOpen = (item) => {
        setSelectedDesk(item);
    };

    const positionerInstance = (item) => {
        return (
            <ButtonToolbar>
                <OverlayTrigger placement="top" overlay={AvailableTooltip}>
                    <Button
                        onClick={() => handleModalOpen(item)}
                        variant="success"
                        className="flexbox-item"
                    ></Button>
                </OverlayTrigger>
            </ButtonToolbar>
        );
    };
    
    // TODO: [JSSBG-27] display all booked desks of current logged use

    return (
        <>   
            <strong>Booked by me:</strong>   
           <UserBookingsDisplay bookings={bookings}/>

            <DropdownMenu
                value={location}
                options={menuOptions}
                onChange={handleLocationChange}
            />

            <div className="flexbox-container mt-3">
                <div className="rowChild">
                    {desks.map((item, index) => {
                        if (location === item.location) {
                            return (
                                <div key={index}>
                                    {positionerInstance(item)}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>

            {!!selectedDesk && <SelectedDeskDisplay {...selectedDesk} />}
        </>
    );
};

export default DeskContainer;
