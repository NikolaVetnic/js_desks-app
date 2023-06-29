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
