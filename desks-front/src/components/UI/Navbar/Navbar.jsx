import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import verifyToken from "../../../utils/verifyToken";
import Cookies from "js-cookie";

import logo from "../../../img/logo.png";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = verifyToken();

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.setItem("totalDownloaded", 0);
        navigate("/login");
    };

    const isAuthNavbar = (
        <>
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                    <div style={{ fontSize: "20px" }}>Dashboard</div>
                </Link>
            </li>

            <li className="nav-item">
                <Button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                >
                    <div style={{ fontSize: "20px" }}>Log Out</div>
                </Button>
            </li>
        </>
    );

    const isNotAuthNavbar = (
        <>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    <div style={{ fontSize: "20px" }}>Login</div>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    <div style={{ fontSize: "20px" }}>Register</div>
                </Link>
            </li>
        </>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link
                to="/"
                className="navbar-brand d-flex flex-column align-items-center"
            >
                <img src={logo} alt="Logo" className="navbar-logo" />
                <p className="mb-0">Desk Tracking App</p>
            </Link>

            <div className="d-flex justify-content-end">
                <ul className="navbar-nav">
                    {isAuthenticated ? isAuthNavbar : isNotAuthNavbar}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
