import React, { useEffect, useState } from "react";
import "./Footer.css";
import DataDownloaded from "./DataDownloaded";

const Footer = () => {
    const [totalDownloaded, setTotalDownloaded] = useState(
        localStorage.getItem("totalDownloaded") || 0
    );
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedTotalDownloaded =
                localStorage.getItem("totalDownloaded") || 0;
            setTotalDownloaded(updatedTotalDownloaded);
            setRefreshData(true);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (refreshData) {
            setRefreshData(false);
        }
    }, [refreshData]);

    return (
        <footer className="footer pt-3">
            <div className="container">
                <div className="footer-content">
                    {process.env.REACT_APP_USE_DEBUG && (
                        <p>
                            Total data fetched:{" "}
                            <DataDownloaded
                                key={refreshData}
                                totalDownloaded={totalDownloaded}
                            />
                            &nbsp;(cleared on Logout and Login)
                        </p>
                    )}
                    {!process.env.REACT_APP_USE_DEBUG && (
                        <p>
                            &copy; 2023 j&s-soft Desk Tracking App. Initial
                            version by j&s-soft Novi Sad.
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
