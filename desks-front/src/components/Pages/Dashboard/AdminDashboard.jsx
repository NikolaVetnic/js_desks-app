import AddDeskForm from "../../UI/Desk/AddDesksForm/AddDesksForm";

const AdminDashboard = ({ username }) => {
    return (
        <div className="container">
            <h1>ADMIN Dashboard</h1>
            <p>Currently logged in as : {username}</p>
            <br />
            <AddDeskForm />
        </div>
    );
};

export default AdminDashboard;
