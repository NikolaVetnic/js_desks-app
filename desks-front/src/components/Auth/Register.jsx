import firebase from "../../firebase";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import PasswordInput from "../UI/PasswordInput";
import Roles from "../../enum/Roles";
import TextInput from "../UI/TextInput";

const bcrypt = require("bcryptjs");

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .email("Invalid email address")
        .required("Username is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
        ),
});

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (
        { username, password },
        { setSubmitting, resetForm }
    ) => {
        setSubmitting(false);

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // store registration data in firebase
            const registrationData = {
                username,
                password: `${salt}.${hashedPassword}`,
                role: Roles.USER,
            };

            // firebase database reference
            const dbRef = firebase.database().ref("users");

            // push registration data to firebase
            const newRegistrationRef = dbRef.push();
            await newRegistrationRef.set(registrationData);

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <TextInput
                            id="reg-username"
                            label="Username"
                            name="username"
                        />
                        <PasswordInput
                            id="reg-password"
                            label="Password"
                            name="password"
                        />

                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-primary mt-3"
                                disabled={isSubmitting}
                            >
                                Register
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
