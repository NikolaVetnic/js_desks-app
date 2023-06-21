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
];

const DeskBooking = ({ booking }) => {
    // TODO: [JSSBG-19] this looks a bit shitty i.e. takes up too much space - should be refactored (ideally as a list, Excel list)
    return (
        <div className="booking card mb-3">
            <div className="card-body">
                <h5 className="card-title">Booking Details</h5>
                <div className="card-text">
                    <p>
                        <strong>Room:</strong> {booking.room}
                    </p>
                    <p>
                        <strong>Desk:</strong> {booking.desk}
                    </p>
                    <p>
                        <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                        <strong>Time From:</strong> {booking.timeFrom}
                    </p>
                    <p>
                        <strong>Time To:</strong> {booking.timeTo}
                    </p>
                    <p>
                        <strong>Booked By:</strong> {booking.bookedBy}
                    </p>
                </div>
            </div>
        </div>
    );
};

const DeskBookingsDisplay = () => {
    return (
        <div>
            <h2>Desk Bookings</h2>
            {bookings.map((booking, index) => (
                <DeskBooking key={index} booking={booking} />
            ))}
        </div>
    );
};

export default DeskBookingsDisplay;
