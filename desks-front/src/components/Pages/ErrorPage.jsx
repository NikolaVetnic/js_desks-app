import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorCode, errorMessage }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/", { replace: true });
        }, 3000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div className="container error-page">
            <h1>{errorCode}</h1>
            <p>{errorMessage}</p>
        </div>
    );
};

export default ErrorPage;
