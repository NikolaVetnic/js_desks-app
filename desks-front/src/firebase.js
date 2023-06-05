import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyABr6uIzcw0CAJ-OHHc4umdV2ZUo5YLPpk",
    authDomain: "js-desks.firebaseapp.com",
    databaseURL:
        "https://js-desks-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "js-desks",
    storageBucket: "js-desks.appspot.com",
    messagingSenderId: "738947568452",
    appId: "1:738947568452:web:882f57627067f9743dbd11",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
