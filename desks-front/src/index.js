import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import ReactModal from "react-modal";

const root = ReactDOM.createRoot(document.getElementById("root"));
ReactModal.setAppElement("#root"); // Set the app element to the root of your application

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
