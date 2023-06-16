const DeskReservations = (prop) =>{

    const city = 
                prop.prop.location === "ns" 
                ? "Novi Sad" 
                : prop.prop.location === "md" 
                ? "Magdeburg" 
                : "Heidelberg";

    return (
        <div className="container">
            <br/>
            <h2>{city}</h2>
            <h4>Room : {prop.prop.room}</h4>
            <h4>Desk : {prop.prop.desk}</h4>
        </div>
    );
};

export default DeskReservations;