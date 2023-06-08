import React from "react";

const Home = () => {
    return (
        <div className="container">
            <h1>Development Home Page</h1>
            <p>
                Welcome to the j&s-soft Desk Tracking App.{" "}
                <span className="text-danger">
                    Token expires after {process.env.REACT_APP_JWT_EXPIRES_IN}{" "}
                    seconds.
                </span>
            </p>
            <div>
                Test users:
                <ul>
                    <li>admin@admin.com &emsp; :: &emsp; admIN1234!</li>
                    <li>user@user.com &emsp; :: &emsp; usER1234!</li>
                </ul>
            </div>
            <p>
                Newly registered users' role is automatically set to USER. To
                set the ADMIN role manually set the role field in the Firebase
                or use the provided credentials.
            </p>
        </div>
    );
};

export default Home;
