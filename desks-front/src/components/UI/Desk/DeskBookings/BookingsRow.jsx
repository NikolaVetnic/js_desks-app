import { formatDate } from "../../../../utils/timeUtils";

const BookingsRow = ({ booking, index }) => {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{booking.room}</td>
      <td>{booking.desk}</td>
      <td>{formatDate(booking.date)}</td>
      <td>{booking.timeFrom}</td>
      <td>{booking.timeTo}</td>
      <td>{booking.bookedBy}</td>
    </tr>
  );
};

export default BookingsRow;
