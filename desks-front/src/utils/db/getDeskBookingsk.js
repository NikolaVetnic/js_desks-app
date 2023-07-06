import firebase from "../../firebase";

const getDeskBookings = async (room, desk) => {
  const dbRef = firebase.database().ref("desks");
  const snapshot = await dbRef.once("value");
  const bookings = [];

  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    if (childData.hasOwnProperty("bookings")) {
      const childBookings = Object.values(childData.bookings).filter(
        (booking) => booking.room === room && booking.desk === desk
      );
      bookings.push(...childBookings);
    }
  });

  return bookings;
};

export { getDeskBookings };
