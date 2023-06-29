import { formatDate } from "../../../../utils/timeUtils";
import BookingsTableView from "./BookingsTableView";

// TODO: [JSSBG-26] this is just a dummy data - should be replaced with real data from the backend
const bookings = [
  {
    room: 1,
    desk: 2,
    date: "2022-05-25",
    timeFrom: "09:00",
    timeTo: "12:00",
    bookedBy: "user@example.com",
  },
  {
    room: 3,
    desk: 4,
    date: "2022-06-25",
    timeFrom: "10:00",
    timeTo: "13:00",
    bookedBy: "example@user.com",
  },
  {
    room: 3,
    desk: 4,
    date: "2022-06-25",
    timeFrom: "13:00",
    timeTo: "13:30",
    bookedBy: "example@user.com",
  },
];

const DeskBookingsDisplay = () => {
  return (
    <BookingsTableView bookings={bookings} />
  );
};

export default DeskBookingsDisplay;
