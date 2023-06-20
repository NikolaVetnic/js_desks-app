import firebase from "../../../../firebase";

// this function is in a separate file so that one can work on AddBookingForm and the other on the handleSubmit function - will be merged later
const addBookingHandleSubmit = (values) => {
    console.log(values);
    
    const dbData = {
      date: values.date,
      timeFrom: values.timeFrom,
      timeTo: values.timeTo,
      bookedBy: values.bookedBy
    };

    const date = new Date(values.date);

    const dbRef = firebase.database().ref("desks");

    // TODO: [JSSBG-23] quantize time (e.g. make the minimum time grain 15min - 9:00, 9:15, 9:30, 9:45, 10:00, ...)
    const timeToDecimal = (time) => {
      const [hours, minutes] = time.split(":");
      const arrayOfMinutes = [0,15,30,45];

      if(arrayOfMinutes.includes(parseInt(minutes,10))){
        if((parseInt(hours) >= 8 && parseInt(hours) <= 17)){
          const decimal = (parseInt(hours,10)+parseInt(minutes,10)/60).toFixed(2);
          return +decimal;
        }
      }
    }

        //treba odraditi drugacije
        const valuesTimeFrom = timeToDecimal(values.timeFrom);
        let valuesTimeTo = timeToDecimal(values.timeTo);
    

    // TODO: [JSSBG-20] check if timeslot is available 
    //(is the slot free at desired time AND does the user have bookings already at that time) at selected location.

    const checkAvailability = async () => {
      try {
        const snapshot = await dbRef
          .orderByChild('location')
          .equalTo(values.location)
          .once('value');
    
        let isAvailable = true;
    
        snapshot.forEach((childSnapshot) => {
          const bookings = childSnapshot.val().bookings;
          const room = childSnapshot.val().room;
          const desk = childSnapshot.val().desk;
    
          if (bookings !== undefined) {
            let hasOverlap = false; // Flag variable to track overlap
    
            Object.keys(bookings).forEach((bookingKey) => {
              const booking = bookings[bookingKey];
              const bookingTimeFrom = timeToDecimal(booking.timeFrom);
              const bookingTimeTo = timeToDecimal(booking.timeTo);
    
              if (
                dbData.bookedBy !== booking.bookedBy &&
                booking.date === values.date &&
                room === values.room &&
                desk === values.desk
              ) {

                if (
                  valuesTimeFrom < bookingTimeFrom &&
                  valuesTimeTo > bookingTimeFrom 
                ) {
                  hasOverlap = true; // Set the flag if overlap is found
                  return; // Exit the current iteration
                } else if (
                  valuesTimeFrom < bookingTimeTo &&
                  valuesTimeTo > bookingTimeTo
                ) {
                  hasOverlap = true; // Set the flag if overlap is found
                  return; // Exit the current iteration
                }
              }

            });
            
            console.log(hasOverlap);
            if (hasOverlap) {
              isAvailable = false; // Set isAvailable to false if overlap is found
              return; // Exit the forEach loop
            }
          }
        });
    
        return isAvailable; // Return the final result outside the forEach loop
      } catch (error) {
        console.error('Error checking availability:', error);
        throw error;
      }
    };
      
    // TODO: Testiranje todo

    // TODO: [JSSBG-21] display a message if timeslot is not available offering other desks that are - first those in the same room

    // TODO: [JSSBG-24] add booking to database (only if timeslot is available)
    checkAvailability().then(
      (isAvailable) => {
        console.log(isAvailable);
        if (isAvailable) {
          console.log('The timeslot is available for booking.');

            dbRef
              .orderByChild('location')
              .equalTo(values.location) 
              .once('value')
              .then((snapshot) => {
                console.log(snapshot.val());
                if(dbData.timeFrom < dbData.timeTo){

                  // TODO: [JSSBG-22] check if selected date is work day
                  if(date.getDay() !== 6 && date.getDay() !== 0){
                      if (snapshot.exists()) {
                        const matchingDesks = [];
                
                        snapshot.forEach((childSnapshot) => {
                          const deskChild = childSnapshot.val();
                          // Check if the remaining properties match
                          if (
                            deskChild.desk === values.desk && 
                            deskChild.room === values.room
                          ) {
                              matchingDesks.push(childSnapshot.key);
                          }
                      });
              
                      if (matchingDesks.length > 0) {
                          const deskId = matchingDesks[0];
                          const deskRef = dbRef.child(deskId);
              
                          const bookingRef = deskRef.child('bookings').push();
              
                          bookingRef.set(dbData)
                            .then(() => {
                              console.log('Booking document added successfully!');
                            })
                            .catch((error) => {
                              console.error('Error adding booking document:', error);
                            });
                        } else {
                          console.log(1);
                          console.log('No matching document found.');
                        }
              
                    } else {
                      console.log(2);
                      console.log('No matching document found.');
                    }
          
                  }else{
                    console.log('The date is not week day.');
                  }
                }else{
                  console.log('Selected date is invalid.');
                }

            })
            .catch((error) => {
              console.error('Error querying desks collection:', error);
            });
          
        } else {
          console.log('The timeslot is not available for booking.');
          // Handle the case when the timeslot is not available
        }
      }
    ).catch((error) => {
      console.error('Error checking availability:', error);
    });

    // TODO: [JSSBG-25] clear form
    document.getElementById("formik-form").reset();


};

export default addBookingHandleSubmit;
