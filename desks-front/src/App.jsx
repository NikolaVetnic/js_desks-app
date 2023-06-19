import { Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/UI/Navbar/Navbar";
import Home from "./components/Pages/Home";
import NarrowContainer from "./components/UI/BoxContainer/BoxContainer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Footer from "./components/UI/Footer/Footer";
import ErrorPage from "./components/Pages/ErrorPage";

function App() {
    // TODO: resolve that "quick and dirty hack" below
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="" element={<Home />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <NarrowContainer>
                            <Login />
                        </NarrowContainer>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <NarrowContainer>
                            <Register />
                        </NarrowContainer>
                    }
                />
                <Route
                    path="*"
                    element={
                        <ErrorPage
                            errorCode={404}
                            errorMessage="Page Not Found"
                        />
                    }
                />
            </Routes>
            {/* quick and dirty hack to move the footer downward so that it doesn't obscure parts of app */}
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    );
}

export default App;
