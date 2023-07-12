import DeskContainer from "../../../UI/Desk/DeskContainer/DeskContainer";
import AddDeskBookingForm from "./Components/AddDeskBookingForm";
import DeskSelectionAndDisplay from "./Components/DeskSelectionAndDisplay";
import MyBookings from "./Components/MyBookings";

const Dashboard = ({ username }) => {
    return (
        <div className="container">
            <h1>USER Dashboard</h1>
            <p>Currently logged in as : {username}</p>
            {/* <DeskContainer /> */}
            <p>
                This component is the controller and is in charge of fetching
                and storing data. For example, `MyBookings` only displays
                current user's bookings, but it is this component that fetches
                all the user's bookings and then passes them to `MyBookings`
                component. Similarly, when a new booking is added, the data is
                returned to this component which then stores it, and forwards
                the updated data to `MyBookings` and `DeskSelectionAndDisplay`
                components, because both require certain bookings for display.
            </p>
            <MyBookings />
            <DeskSelectionAndDisplay />
            <AddDeskBookingForm />
        </div>
    );
};

export default Dashboard;
