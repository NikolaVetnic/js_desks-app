// this function is in a separate file so that one can work on AddBookingForm and the other on the handleSubmit function - will be merged later
const addBookingHandleSubmit = (values) => {
    console.log(values);
    // TODO: check if timeslot is available (is the slot free at desired time AND does the user have bookings already at that time) at selected location
    // TODO: display a message if timeslot is not available offering other desks that are - first those in the same room
    // TODO: check if selected date is work day
    // TODO: quantize time (e.g. make the minimum time grain 15min - 9:00, 9:15, 9:30, 9:45, 10:00, ...)
    // TODO: add booking to database (only if timeslot is available)
    // TODO: clear form
};

export default addBookingHandleSubmit;
