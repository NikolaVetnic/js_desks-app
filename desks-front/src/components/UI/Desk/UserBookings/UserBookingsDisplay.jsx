import DeskBookingsDisplay from "../DeskBookings/DeskBookingsDisplay";

const UserBookingsDisplay = ({ bookings }) => {
    if (!Array.isArray(bookings) || bookings.length === 0) {
        return <div>No bookings found.</div>;
    }

    return (
        <div>
            {bookings.map((booking, index) => (
                <DeskBookingsDisplay key={index} booking={booking} />
            ))}
        </div>
    );
};

export default UserBookingsDisplay;
