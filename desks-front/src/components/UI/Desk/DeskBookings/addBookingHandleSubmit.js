// this function is in a separate file so that one can work on AddBookingForm and the other on the handleSubmit function - will be merged later
const addBookingHandleSubmit = (values) => {
    console.log(values);
    // TODO: [JSSBG-20] check if timeslot is available (is the slot free at desired time AND does the user have bookings already at that time) at selected location
    // TODO: [JSSBG-21] display a message if timeslot is not available offering other desks that are - first those in the same room
    // TODO: [JSSBG-22] check if selected date is work day
    // TODO: [JSSBG-23] quantize time (e.g. make the minimum time grain 15min - 9:00, 9:15, 9:30, 9:45, 10:00, ...)
    // TODO: [JSSBG-24] add booking to database (only if timeslot is available)
    // TODO: [JSSBG-25] clear form
};

export default addBookingHandleSubmit;
