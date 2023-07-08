import { Button, ButtonToolbar, OverlayTrigger } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";

import { AvailableTooltip } from "../../Tooltip/Tooltips";
import "./DeskContainer.css";
import BookingsTableView from "../DeskBookings/BookingsTableView";
import DropdownMenu from "../../DropdownMenu";
import getDesksByLocationFromDb from "../../../../utils/db/getDesksByLocationFromDb";
import { locations } from "../../../../config";
import SelectedDeskDisplay from "../SelectedDeskDisplay";
import getBookingsForUser from "../../../../utils/db/getBookingsForUser";
import verifyToken from "../../../../utils/verifyToken";

const DeskContainer = () => {
    const [location, setLocation] = useState("");
    const [bookings, setBookings] = useState(null);
    const [desks, setDesks] = useState([]);
    const [selectedDesk, setSelectedDesk] = useState(null);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        setSelectedDesk(null);
    };

    const handleDesks = useCallback(async () => {
        try {
            const result = await getDesksByLocationFromDb(location);
            const desksData = result || [];
            setDesks(desksData);
        } catch (error) {
            console.log(error);
        }
    }, [location]);
  

    const getUserBookings = async () => {
        return getBookingsForUser(verifyToken().username);
    };

    useEffect(() => {
        handleDesks();
    }, [ handleDesks ]);

    getUserBookings().then((result) => {
        if(result){
          setBookings(result);
        }
      }).catch((error) => {
        console.log(error);
      });


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
           <BookingsTableView bookings={bookings}/>

            <DropdownMenu
                value={location}
                options={locations}
                onChange={handleLocationChange}
            />

            <div className="flexbox-container mt-3">
                <div className="rowChild">
                    {location &&
                        desks.map((item, index) => {
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
