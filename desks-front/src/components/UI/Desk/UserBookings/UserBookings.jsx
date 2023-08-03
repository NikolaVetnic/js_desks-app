import { useCallback, useEffect, useState } from "react";
import verifyToken from "../../../../utils/verifyToken";

import getBookingsForUser from "../../../../utils/db/getBookingsForUser";
import BookingsTableView from "../DeskBookings/BookingsTableView";

export const UserBookings = () => {
    const [bookings, setBookings] = useState(null);

    const handleBookingAdded = useCallback(async () => {
        try{
            const updatedBookings = await getBookingsForUser(verifyToken().username);
            setBookings(updatedBookings);
        }catch (error) {
            console.log(error);
        }
    }, []);


     useEffect(() => {
        handleBookingAdded()
    }, [ handleBookingAdded ]);

    return (
        <BookingsTableView bookings={bookings}/>
    )
}