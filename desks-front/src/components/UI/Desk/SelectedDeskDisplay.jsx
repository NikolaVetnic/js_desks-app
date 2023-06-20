import AddBookingForm from "./DeskBookings/AddBookingForm";
import DeskBookingsDisplay from "./DeskBookings/DeskBookingsDisplay";

const SelectedDeskDisplay = (prop) => {
    const city =
        prop.prop.location === "ns"
            ? "Novi Sad"
            : prop.prop.location === "md"
            ? "Magdeburg"
            : "Heidelberg";

    return (
        <div className="container">
            <br />
            <h2>{city}</h2>
            <h4>Room : {prop.prop.room}</h4>
            <h4>Desk : {prop.prop.desk}</h4>
            <br />
            <AddBookingForm location={prop.prop.location} room={prop.prop.room} desk={prop.prop.desk}/>
            <br />
            <DeskBookingsDisplay />
        </div>
    );
};

export default SelectedDeskDisplay;
