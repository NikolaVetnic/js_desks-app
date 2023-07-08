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

            <h3>Database Usage</h3>
            <p>
                <span className="text-danger">
                    <span style={{ backgroundColor: "red", color: "white" }}>
                        Watch the data downloaded in the footer.
                    </span>
                    &nbsp;
                    <strong>If it goes haywire IMMEDIATELY LOGOUT</strong>.
                    Stopping the application in the terminal{" "}
                    <strong>DOES NOT HELP</strong>. The counter is cleared on
                    Logout and Login.
                </span>
            </p>
            <p>
                A <strong>backup database</strong> is introduced, checkout the
                Firebase config file in the frontend project root.
            </p>
            <p>
                Total data fetched is read from the local storage and displayed
                in the footer. To access the local storage in the browser go to
                the developer tools and select the Application tab. The data is
                stored in the Local Storage section.
            </p>
        </div>
    );
};

export default Home;
