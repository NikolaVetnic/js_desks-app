import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import firebase from "../../firebase";

const bcrypt = require("bcryptjs");

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Store registration data in Firebase
            const registrationData = {
                username,
                password: `${salt}.${hashedPassword}`,
            };

            // Firebase database reference
            const dbRef = firebase.database().ref("users");

            // Push registration data to Firebase
            const newRegistrationRef = dbRef.push();
            await newRegistrationRef.set(registrationData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleRegister}
                >
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;
