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

export default DeskBooking;
