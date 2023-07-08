import firebase from "../../firebase";
import updateTotalDownloaded from "./updateTotalDownloaded";

/**
 * Calculates the sum of two numbers.
 * @param {string} location - Office location taken from array ["hd", "md", "ns"]
 * @param {number} room - The room number, e.g. 1, 2, 3, ...
 * @param {number} desk - The desk number, e.g. 1, 2, 3, ...
 * @returns {Object} - The desk from the database
 */
const getDeskFromDb = async (location, room, desk) => {
    const dbRef = firebase.database().ref("desks");

    const snapshot = await dbRef
        .orderByChild("location")
        .equalTo(location)
        .once("value");

    const desks = snapshot.val();

    // use this in every function that fetches data from the database
    updateTotalDownloaded(desks);

    const requiredDesk = Object.entries(desks).find(([key, curr]) => {
        return curr.room === room && curr.desk === desk;
    });

    if (requiredDesk) {
        const [key, deskData] = requiredDesk;
        return { key, ...deskData };
    }
};

export default getDeskFromDb;
