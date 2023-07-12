import verifyToken from "../../../utils/verifyToken";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";

const Dashboard = () => {
    const { username, role } = verifyToken();

    return (
        <div className="container">
            {role === "admin" ? (
                <AdminDashboard username={username} />
            ) : (
                <UserDashboard username={username} />
            )}
        </div>
    );
};

export default Dashboard;
