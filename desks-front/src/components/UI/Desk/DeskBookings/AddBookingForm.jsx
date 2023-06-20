import React from "react";
import { Formik, Form, Field, ErrorMessage, TimePicker } from "formik";
import * as Yup from "yup";
import addBookingHandleSubmit from "./addBookingHandleSubmit";

const validationSchema = Yup.object().shape({
    room: Yup.number().required("Room is required"),
    desk: Yup.number().required("Desk is required"),
    date: Yup.date().required("Date is required"),
    timeFrom: Yup.string().required("Start time is required"),
    timeTo: Yup.string().required("End time is required"),
    bookedBy: Yup.string().email("Invalid email").required("Email is required"),
});

const AddBookingForm = (prop) => {
    // TODO: [JSSBG-18] only display form if there are time slots available during the day

    return (
        <div>
            <h1>Add Booking</h1>
            <Formik
                initialValues={{
                    room: prop.room,
                    desk: prop.desk,
                    date: "",
                    timeFrom: "",
                    timeTo: "",
                    bookedBy: "",
                    location: prop.location
                }}
                validationSchema={validationSchema}
                onSubmit={addBookingHandleSubmit}
            >
                <Form id="formik-form">

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <Field
                            type="date"
                            id="date"
                            name="date"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="date"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="timeFrom">Start Time:</label>
                        <Field
                            type="time"
                            id="timeFrom"
                            name="timeFrom"
                            className="form-control"    
                            
                        />
                        <ErrorMessage
                            name="timeFrom"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="timeTo">End Time:</label>
                        <Field
                            type="time"
                            id="timeTo"
                            name="timeTo"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="timeTo"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bookedBy">Booked By:</label>
                        <Field
                            type="email"
                            id="bookedBy"
                            name="bookedBy"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="bookedBy"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddBookingForm;
