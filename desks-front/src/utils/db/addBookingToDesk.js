import firebase from "../../firebase";
import updateTotalDownloaded from "./updateTotalDownloaded";

/**
 * Calculates the sum of two numbers.
 * @param {string} deskId - desk key from Firebase
 * @param {Object} bookingData - booking data to be added to the desk
 */
const addBookingToDesk = async (deskId, bookingData) => {
    const db = firebase.database();

    try {
        // retrieve the desk entity from Firebase
        const deskRef = db.ref(`desks/${deskId}`);

        // use this in every function that fetches data from the database
        updateTotalDownloaded(deskRef);

        // add the new booking to the "bookings" array with Firebase-generated key
        const newBookingRef = deskRef.child("bookings").push();
        const newBookingKey = newBookingRef.key;
        newBookingRef.set(bookingData);

        console.log("booking added successfully with key:", newBookingKey);
    } catch (error) {
        console.error("error adding booking:", error);
    }
};

export default addBookingToDesk;
