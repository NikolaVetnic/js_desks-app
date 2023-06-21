import AddBookingForm from "./DeskBookings/AddBookingForm";
import DeskBookingsDisplay from "./DeskBookings/DeskBookingsDisplay";

const SelectedDeskDisplay = ({ location, room, desk, ...rest }) => {
    const city =
        location === "ns"
            ? "Novi Sad"
            : location === "md"
            ? "Magdeburg"
            : "Heidelberg";

    return (
        <div className="container">
            <br />
            <h2>{city}</h2>
            <h4>Room : {room}</h4>
            <h4>Desk : {desk}</h4>
            <br />
            <AddBookingForm location={location} room={room} desk={desk} />
            <br />
            <DeskBookingsDisplay />
        </div>
    );
};

export default SelectedDeskDisplay;
