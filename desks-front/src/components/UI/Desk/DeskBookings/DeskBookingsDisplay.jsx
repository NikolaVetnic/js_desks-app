import BookingsTableView from "./BookingsTableView";
import { getBookings } from "../../../../utils/db/getBookingsForDesk";

// TODO: [JSSBG-26] this is just a dummy data - should be replaced with real data from the backend
const bookings =await getBookings();

const DeskBookingsDisplay = () => {
  return (
    <BookingsTableView bookings={bookings} />
  );
};

export default DeskBookingsDisplay;
