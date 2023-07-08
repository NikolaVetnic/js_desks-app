import firebase from '../../firebase';

import { transformTime } from '../timeUtils';

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
  const snapshot = await dbRef.once("value");
  const desks = snapshot.val();

  //from 8:00am till 17:00pm
  var arrayOfTimeIndexes = [];

  for(let i = 0; i < 36; i++){
    arrayOfTimeIndexes[i] = false;
  }

  if (desks) {
    const filteredDesks = Object.values(desks).filter(
      (deskItem) =>
        deskItem.location === location &&
        deskItem.room === room &&
        deskItem.desk === desk
    );

    const bookings = filteredDesks?.[0]?.bookings;

    if (bookings) {
      const filteredBookings = Object.values(bookings).filter(
        (booking) => 
          booking.date === selectedDate   
      );

      for (const booking of filteredBookings) {

        const [idx0,idx1] = transformTime(booking.timeFrom,booking.timeTo);

        for(let i = idx0; i <= idx1; i++){
          arrayOfTimeIndexes[i] = true;
        }
      }
      

      for(let i=0; i<arrayOfTimeIndexes.length; i++){
        if(arrayOfTimeIndexes[i] === false){
          return true;
        }
      }
    }
  }

  return false; 
};

export default checkDeskAvailability;