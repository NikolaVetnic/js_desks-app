import DeskContainer from "../../UI/Desk/DeskContainer/DeskContainer";

const Dashboard = ({ username }) => {
    return (
        <div className="container">
            <h1>USER Dashboard</h1>
            <p>Currently logged in as : {username}</p>
            <DeskContainer />
        </div>
    );
};

export default Dashboard;
