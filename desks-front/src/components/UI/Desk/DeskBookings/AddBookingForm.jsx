import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import addBookingToDesk from "../../../../utils/db/addBookingToDesk";
import {
    generateTimeOptions,
    isNotOverlappingWithExistingInterval,
    isTimeToAfterTimeFrom,
} from "../../../../utils/timeUtils";
import getDeskFromDb from "../../../../utils/db/getDeskFromDb";
import verifyToken from "../../../../utils/verifyToken";
import checkDeskAvailability from "../../../../utils/db/checkDeskAvailability";


const validationSchema = Yup.object().shape({
    date: Yup.date()
        .required("Date is required")
        .test("is-weekend", "Weekend days are not allowed", (value) => {
            const dayOfWeek = new Date(value).getDay();
            return dayOfWeek !== 0 && dayOfWeek !== 6;
        }),
    timeFrom: Yup.string().required("Time From is required"),
    timeTo: Yup.string()
        .required("Time To is required")
        .test("is-after", "Time To must be after Time From", function (value) {
            const { timeFrom } = this.parent;
            return isTimeToAfterTimeFrom(timeFrom, value);
        }),
});

const AddBookingForm = ({ location, room, desk }) => {
    const navigate = useNavigate();

    const username = verifyToken().username;
    const [isAvailable, setIsAvailable] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const initialValues = {
        location,
        room,
        desk,
        date: "",
        timeFrom: "",
        timeTo: "",
        bookedBy: verifyToken().username,
    };

    // TODO: [JSSBG-18] only display form if there are time slots available during the day
    const checkAvailability = useCallback(async () => {
        if(selectedDate !== "") {
            const availability = await checkDeskAvailability(
                location,
                room,
                desk,
                selectedDate
              );
              setIsAvailable(availability);
        }
    }, [setIsAvailable, location, room, desk,selectedDate]);
      
      const handleDateChange = useCallback((date) => {
        setSelectedDate(date);
      },[]);
      
      useEffect(() => {
        handleDateChange(initialValues.date);
        checkAvailability();
      }, [checkAvailability, handleDateChange, initialValues.date]);
      
      const displayTimeListbox = () => {
        if (isAvailable) {
          return (
            <div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label htmlFor="timeFrom">Time From:</label>
                    <Field
                      as="select"
                      id="timeFrom"
                      name="timeFrom"
                      className="form-control"
                    >
                      <option value="">- Select Time From -</option>
                      {generateTimeOptions(true)}
                    </Field>
                    <ErrorMessage
                      name="timeFrom"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="timeTo">Time To:</label>
                    <Field
                      as="select"
                      id="timeTo"
                      name="timeTo"
                      className="form-control"
                    >
                      <option value="">- Select Time To -</option>
                      {generateTimeOptions(false)}
                    </Field>
                    <ErrorMessage
                      name="timeTo"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
      
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          );
        } else {
          return (
            <strong>
              There are no available time slots for the selected date. Please choose another date.
            </strong>
          );
        }
      };

  //---------------------------------------------

    // if user is not logged in the username will be undefined, redirect to login page
    if (!username) {
        navigate("/login");
        return;
    }

    const handleSubmit = async ({ date, timeFrom, timeTo }) => {
        const dataToSave = { ...initialValues, date, timeFrom, timeTo };

        const filteredDesks = await getDeskFromDb(location, room, desk);

        const isOverlapping = filteredDesks.bookings
            ? Object.values(filteredDesks.bookings).some((booking) => {
                  return !isNotOverlappingWithExistingInterval(
                      timeFrom,
                      timeTo,
                      booking.timeFrom,
                      booking.timeTo
                  );
              })
            : false;

        if (!isOverlapping) {
            console.log(
                "one of the user's bookings is overlapping with the new booking"
            );
            return;
        }

        addBookingToDesk(filteredDesks.key, dataToSave);
    };



    return (
        <div>
            <h1>Add Booking Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <Field
                                type="date"
                                id="date"
                                name="date"
                                className="form-control"
                                onChange={(e) => {
                                    setFieldValue("date", e.target.value);
                                    handleDateChange(e.target.value);
                                }}
                            />
                            <ErrorMessage
                                name="date"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        {displayTimeListbox()}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddBookingForm;
