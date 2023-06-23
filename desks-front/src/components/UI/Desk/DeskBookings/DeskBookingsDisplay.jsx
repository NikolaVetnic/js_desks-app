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

const DeskBookingsDisplay = ({ booking }) => {
  return (
    <table className="table">
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
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{booking.room}</td>
            <td>{booking.desk}</td>
            <td>{booking.date}</td>
            <td>{booking.timeFrom}</td>
            <td>{booking.timeTo}</td>
            <td>{booking.bookedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeskBookingsDisplay;
