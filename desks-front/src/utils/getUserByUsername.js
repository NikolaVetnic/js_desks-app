import firebase from "firebase/compat/app";
import "firebase/compat/database";

const getUserByUsername = async (username) => {
    try {
        const snapshot = await firebase
            .database()
            .ref("users")
            .orderByChild("username")
            .equalTo(username)
            .once("value");
        const user = snapshot.val();
        return user;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
};

export default getUserByUsername;
