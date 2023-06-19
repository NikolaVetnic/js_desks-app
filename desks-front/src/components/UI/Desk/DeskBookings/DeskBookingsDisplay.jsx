import DeskBooking from "./DeskBooking";

// TODO: this is just a dummy data - should be replaced with real data from the backend
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
