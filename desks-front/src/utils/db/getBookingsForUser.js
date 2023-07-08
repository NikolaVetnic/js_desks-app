import firebase from "../../firebase";
import updateTotalDownloaded from "./updateTotalDownloaded";

/**
 * Gets all reserved bookings for logged user.
 * @param {string} user - User email required
 * @returns {Object} - All bookings for specified user
 */

const getBookingsForUser = async (user) => {
    const dbRef = firebase.database().ref("desks");
    const snapshot = await dbRef.once("value");
    const matchedBookings = [];

    snapshot.forEach((childSnapshot) => {
        const bookings = childSnapshot.val().bookings;

        if (bookings) {
            // filtering bookings for specified user
            const filteredBookings = Object.values(bookings).filter(
                (booking) => booking.bookedBy === user
            );

            matchedBookings.push(...filteredBookings);
        }
    });

    matchedBookings.sort((a, b) => new Date(a.date) - new Date(b.date));

    // use this in every function that fetches data from the database
    updateTotalDownloaded(matchedBookings);

    return matchedBookings;
};

export default getBookingsForUser;
