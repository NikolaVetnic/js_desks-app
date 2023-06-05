import React from "react";
import firebase from "../../firebase";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./UI/TextInput";
import PasswordInput from "./UI/PasswordInput";

const bcrypt = require("bcryptjs");

const Register = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .email("Invalid email address")
            .required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleRegister = async (
        { username, password },
        { setSubmitting }
    ) => {
        setSubmitting(false);

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // store registration data in firebase
            const registrationData = {
                username,
                password: `${salt}.${hashedPassword}`,
            };

            // firebase database reference
            const dbRef = firebase.database().ref("users");

            // push registration data to firebase
            const newRegistrationRef = dbRef.push();
            await newRegistrationRef.set(registrationData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <TextInput label="Username" name="username" />
                        <PasswordInput label="Password" name="password" />

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
