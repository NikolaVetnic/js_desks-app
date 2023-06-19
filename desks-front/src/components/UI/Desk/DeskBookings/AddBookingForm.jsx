import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const AddBookingForm = () => {
    // TODO: only display form if there are time slots available during the day

    return (
        <div>
            <h1>Add Booking</h1>
            <Formik
                initialValues={{
                    room: "",
                    desk: "",
                    date: "",
                    timeFrom: "",
                    timeTo: "",
                    bookedBy: "",
                }}
                validationSchema={validationSchema}
                onSubmit={addBookingHandleSubmit}
            >
                <Form>
                    {/* TODO: tons of label-Field-ErrMsg components with lots of props - refactoring fodder */}
                    <div className="form-group">
                        <label htmlFor="room">Room:</label>
                        <Field
                            type="number"
                            id="room"
                            name="room"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="room"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="desk">Desk:</label>
                        <Field
                            type="number"
                            id="desk"
                            name="desk"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="desk"
                            component="div"
                            className="text-danger"
                        />
                    </div>

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
