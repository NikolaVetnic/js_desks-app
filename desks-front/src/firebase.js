import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";
import "firebase/firestore";

// FLIP THIS to change the database used
const useOriginal = false;

const firebaseConfig0 = {
    apiKey: "AIzaSyABr6uIzcw0CAJ-OHHc4umdV2ZUo5YLPpk",
    authDomain: "js-desks.firebaseapp.com",
    databaseURL:
        "https://js-desks-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "js-desks",
    storageBucket: "js-desks.appspot.com",
    messagingSenderId: "738947568452",
    appId: "1:738947568452:web:882f57627067f9743dbd11",
};

const firebaseConfig1 = {
    apiKey: "AIzaSyDgouOn47qxm_f4UUczNTmP3VYWgNmOoEg",
    authDomain: "js-desks-4b7aa.firebaseapp.com",
    databaseURL: "https://js-desks-4b7aa-default-rtdb.firebaseio.com",
    projectId: "js-desks-4b7aa",
    storageBucket: "js-desks-4b7aa.appspot.com",
    messagingSenderId: "451039070934",
    appId: "1:451039070934:web:83a4a208dac9a3e1401777",
    measurementId: "G-8QPQ7GXQZD",
};

// Initialize Firebase
firebase.initializeApp(useOriginal ? firebaseConfig0 : firebaseConfig1);

export default firebase;
