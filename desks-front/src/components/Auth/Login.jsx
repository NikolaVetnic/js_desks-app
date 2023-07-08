import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

import generateJWT from "../../utils/generateJWT";
import getUserByUsername from "../../utils/getUserByUsername";
import OverlayModal from "../UI/OverlayModal/OverlayModal";
import PasswordInput from "../UI/PasswordInput";
import TextInput from "../UI/TextInput";
import updateTotalDownloaded from "../../utils/db/updateTotalDownloaded";

const bcrypt = require("bcryptjs");

const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        msg: "",
    });
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleLogin = async ({ username, password }) => {
        try {
            const userRecord = await getUserByUsername(username);

            if (userRecord === null) {
                console.log("user not found");
                setIsModalOpen(true);
                setModalContent({
                    title: "Error",
                    msg: "Wrong username or password.",
                });
                return;
            }

            // use this in every function that fetches data from the database
            updateTotalDownloaded(userRecord);

            // access retreived password hash value
            const keys = Object.keys(userRecord);
            const hashedPassword = userRecord[keys[0]].password.split(".")[1];

            // compare plain text password with hashed password
            const passwordMatch = await bcrypt.compare(
                password,
                hashedPassword
            );

            if (passwordMatch) {
                const payload = {
                    // we store username and role for authorization later on
                    username,
                    role: userRecord[keys[0]].role,
                };
                Cookies.set("token", generateJWT(payload));
                localStorage.setItem("totalDownloaded", 0);
                navigate("/dashboard");
            } else {
                console.log("wrong password");
                setIsModalOpen(true);
                setModalContent({
                    title: "Error",
                    msg: "Wrong username or password.",
                });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <TextInput
                        id="login-username"
                        label="Username"
                        name="username"
                    />

                    <PasswordInput
                        id="login-password"
                        label="Password"
                        name="password"
                    />

                    <div className="d-flex justify-content-center">
                        <Button type="submit" className="btn btn-primary mt-3">
                            Login
                        </Button>
                    </div>
                </Form>
            </Formik>

            <OverlayModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                content={modalContent}
            />
        </div>
    );
};

export default Login;
