import firebase from '../../firebase';

// Reference to the Firebase database
const dbRef = firebase.database().ref("desks");

// Function to check for available time slots
/**
 * Checks the db if there are available time slots.
 * @param {string} location - Office location taken from array ["hd", "md", "ns"]
 * @param {number} room - The room number, e.g. 1, 2, 3, ...
 * @param {number} desk - The desk number, e.g. 1, 2, 3, ...
 * @param {string} selectedDate - Selected date from the form
 * @returns {boolean} - Availability of the desk
 */
const checkDeskAvailability = async (location, room, desk, selectedDate) => {
  const freeSlots = []; // Array to store free time slots

  // Retrieve the bookings for the given date from the database
  const snapshot = await dbRef.once("value");
  const desks = snapshot.val();

  if (desks) {
    // Filter the desks based on the provided location, room, and desk number
    const filteredDesks = Object.values(desks).filter(
      (deskItem) =>
        deskItem.location === location &&
        deskItem.room === room &&
        deskItem.desk === desk
    );

    if (filteredDesks.length > 0) {
      const bookings = filteredDesks[0].bookings;

      if (bookings) {
        // Filter the bookings for the selected date
        const filteredBookings = Object.values(bookings).filter(
          (booking) => booking.date === selectedDate
        );

        // Sort the bookings based on the start time
        const sortedBookings = filteredBookings.sort(function (a, b) {
          return a.timeFrom.localeCompare(b.timeFrom);
        });

        const startTime = "08:00 AM"; // Start time of the working day

        for (let i = 0; i < sortedBookings.length; i++) {
          const booking = sortedBookings[i];
          const endTime = booking.timeFrom;

          // Check if there is an available time slot between the current booking and the next one
          if (endTime !== startTime) {
            freeSlots.push({ timeFrom: startTime, timeTo: endTime });
          }

          startTime = booking.timeTo; // Update the start time to the end time of the current booking
        }

        const endTime = "05:00 PM"; // End time of the working day

        // Check if there is an available time slot after the last booking
        if (endTime !== startTime) {
          freeSlots.push({ timeFrom: startTime, timeTo: endTime });
        }
      } else {
        // No bookings for the selected date, the whole day is available
        freeSlots.push({ timeFrom: "08:00 AM", timeTo: "05:00 PM" });
      }
    }
  }

  // Log the free time slots
  console.log(freeSlots);

  // Return true if there is an available time slot, false otherwise
  return freeSlots.length > 0;
};

export default checkDeskAvailability;