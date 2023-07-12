const AddDeskBookingForm = () => {
    return (
        <div>
            <h3>Add Desk Booking Form</h3>
            <p>
                Here we display the form where the user can add a booking for
                the selected desk.
            </p>
            <p>
                This component should receive some kind of boolean or something
                that lets it know if it is possible to add a booking (only
                possible if the desk is selected) which is the data it receives
                from the parent. The data it sends to the parent are the booking
                details.
            </p>
        </div>
    );
};

export default AddDeskBookingForm;
