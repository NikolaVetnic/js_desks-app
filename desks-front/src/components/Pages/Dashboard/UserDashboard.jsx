import { useState } from "react";
import DeskContainer from "../../UI/Desk/DeskContainer";

const Dashboard = ({ username }) => {
    const [location, setLocation] = useState("");

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        console.log(`location changed to ${event.target.value}`);
    };

    return (
        <div className="container">
            <h1>USER Dashboard</h1>
            <p>Currently logged in as : {username}</p>

            <div>
                Chosen location : &nbsp;
                <select value={location} onChange={handleLocationChange}>
                    <option value="">- choose location -</option>
                    <option value="hd">Heidelberg</option>
                    <option value="md">Magdeburg</option>
                    <option value="ns">Novi Sad</option>
                </select>
            </div>

            <div>
                {
                location !== "" ? (
                    <DeskContainer location={location}/>
                ):""
                }
            </div>
        </div>
    );
};

export default Dashboard;
