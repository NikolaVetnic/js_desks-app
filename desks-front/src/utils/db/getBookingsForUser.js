import firebase from "../../firebase";

/**
 * Gets all reserved bookings for logged user.
 * @param {string} user - User email required
 */

const getBookingsForUser = async (user) => {
    // retrieve all desks
    const dbRef = firebase.database().ref("desks");
    const matchedBookings = [];

    const snapshot = await dbRef.once("value");
    // iterate through all desks document
    snapshot.forEach((childSnapshot) => {
        const bookings = childSnapshot.val().bookings;

        if(bookings){
            // iterate through all bookings document
            Object.keys(bookings).forEach((bookingKey) => {
                const booking = bookings[bookingKey];
                if(user === booking.bookedBy){
                    const bookedDesk = {room: booking.room,
                                        desk: booking.desk,
                                        location: booking.location,
                                        date: booking.date,
                                        timeFrom: booking.timeFrom,
                                        timeTo: booking.timeTo,
                                        bookedBy: booking.bookedBy };
                    matchedBookings.push(bookedDesk);
                }
        });
        }
    });

    return matchedBookings;
}

export default getBookingsForUser;