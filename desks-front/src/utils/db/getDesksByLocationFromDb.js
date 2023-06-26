import firebase from "../../firebase";

const getDesksByLocationFromDb = async (location) => {
  const dbRef = firebase.database().ref("desks");

  const snapshot = await dbRef
    .orderByChild("location")
    .equalTo(location)
    .once("value");
  const data = snapshot.val();

  if (data) {
    const desks = Object.values(data);
    return desks;
  }

  return [];
};

export default getDesksByLocationFromDb;