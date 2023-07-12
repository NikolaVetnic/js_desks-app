import { useState, useEffect } from "react";
import BookingsTableView from "./BookingsTableView";
import { getDeskBookings } from "../../../../utils/db/getDeskBookingsk";

const DeskBookingsDisplay = ({ room, desk }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsData = await getDeskBookings(room, desk);
      setBookings(bookingsData);
    };

    fetchBookings();
  }, [room, desk, bookings]);

  return <BookingsTableView bookings={bookings} />;
};

export default DeskBookingsDisplay;
