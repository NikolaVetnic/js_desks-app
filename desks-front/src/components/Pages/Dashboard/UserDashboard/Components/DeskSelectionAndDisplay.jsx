const DeskSelectionAndDisplay = () => {
    return (
        <div>
            <h3>Desk Selection and Display</h3>
            <p>Drop down menu where the user selects the city.</p>
            <p>Here we display the desks available in the selected city.</p>
            <p>Here we display the selected desk's details.</p>
            <p>
                Here we display the selected desk's bookings (with pagination).
            </p>
            <p>
                In regards to implementation, I suppose the user should select
                the city and the desk, and then all that data should be passed
                to the `UserDashboard` component which should then query the
                database for the selected desk's bookings and forward the
                fetched data "downward" to `DeskSelectionAndDisplay`. This also
                means that we have the selected desk which we can use for
                creating a booking from the `AddDeskBookingForm` component.
            </p>
        </div>
    );
};

export default DeskSelectionAndDisplay;
