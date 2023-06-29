import React from "react";
import firebase from "../../../firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import verifyToken from "../../../utils/verifyToken";

const validationSchema = Yup.object().shape({
    location: Yup.string().required("Please select location"),
    room: Yup.number().required("Room number is required"),
    desk: Yup.number().required("Desk number is required"),
});

const AddDeskForm = () => {
    const handleSubmit = async (values) => {
        const deskData = {
            ...values,
            addedBy: verifyToken().username,
        };

        console.log(deskData);

        // firebase database reference
        const dbRef = firebase.database().ref("desks");

        // push desk data to firebase
        const newDeskRef = dbRef.push();
        await newDeskRef.set(deskData);
    };

    // TODO: [JSSBG-30] use config.js for location values
    return (
        <div className="container">
            <h1>Add Desk Form</h1>
            <Formik
                initialValues={{
                    location: "",
                    room: 0,
                    desk: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="location">Choose location:</label>
                        <Field
                            as="select"
                            id="location"
                            name="location"
                            className="form-control"
                        >
                            <option value="">- location -</option>
                            <option value="hd">Heidelberg</option>
                            <option value="md">Magdeburg</option>
                            <option value="ns">Novi Sad</option>
                        </Field>
                        <ErrorMessage
                            name="location"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="room">Room no:</label>
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
                        <label htmlFor="desk">Desk no:</label>
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

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddDeskForm;
