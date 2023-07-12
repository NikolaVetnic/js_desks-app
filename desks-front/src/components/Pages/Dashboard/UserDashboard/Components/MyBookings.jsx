const MyBookings = () => {
    return (
        <div>
            <h3>My Bookings</h3>
            <p>
                Table display of all bookings made by the current user (with
                pagination). This component receives the data from the parent,
                which happens on first load and once a new booking is added.
            </p>
        </div>
    );
};

export default MyBookings;
