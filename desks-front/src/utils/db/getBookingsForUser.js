import firebase from "../../firebase";

/**
 * Gets all reserved bookings for logged user.
 * @param {string} user - User email required
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
  
    return matchedBookings;
}

export default getBookingsForUser;