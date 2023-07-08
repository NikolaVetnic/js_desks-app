import firebase from "../../firebase";
import updateTotalDownloaded from "./updateTotalDownloaded";

const getDesksByLocationFromDb = async (location) => {
    const dbRef = firebase.database().ref("desks");

    const snapshot = await dbRef
        .orderByChild("location")
        .equalTo(location)
        .once("value");
    const data = snapshot.val();

    if (data) {
        const desks = Object.values(data);

        // use this in every function that fetches data from the database
        updateTotalDownloaded(desks);

        return desks;
    }

    return [];
};

export default getDesksByLocationFromDb;
