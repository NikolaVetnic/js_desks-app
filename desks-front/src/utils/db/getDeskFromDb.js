import firebase from "../../firebase";

/**
 * Calculates the sum of two numbers.
 * @param {string} location - office location taken from array ["hd", "md", "ns"]
 * @param {number} room - the room number, e.g. 1, 2, 3, ...
 * @param {number} desk - the desk number, e.g. 1, 2, 3, ...
 * @returns {Object} the desk from the database
 */
const getDeskFromDb = async (location, room, desk) => {
    const dbRef = firebase.database().ref("desks");

    const snapshot = await dbRef
        .orderByChild("location")
        .equalTo(location)
        .once("value");
    const desks = snapshot.val();

    const requiredDesk = Object.entries(desks).find(([key, curr]) => {
        return curr.room === room && curr.desk === desk;
    });

    if (requiredDesk) {
        const [key, deskData] = requiredDesk;
        return { key, ...deskData };
    }
};

export default getDeskFromDb;
