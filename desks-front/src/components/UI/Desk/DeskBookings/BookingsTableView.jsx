import BookingsRow from "./BookingsRow";

const BookingsTableView = ({ bookings }) => {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p>No bookings</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Room</th>
          <th>Desk</th>
          <th>Date</th>
          <th>Time From</th>
          <th>Time To</th>
          <th>Booked By</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <BookingsRow key={index} booking={booking} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default BookingsTableView;
