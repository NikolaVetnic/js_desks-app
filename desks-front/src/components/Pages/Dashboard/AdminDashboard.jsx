const AdminDashboard = ({ username }) => {
    return (
        <div className="container">
            <h1>ADMIN Dashboard</h1>
            <p>Currently logged in as : {username}</p>
        </div>
    );
};

export default AdminDashboard;
