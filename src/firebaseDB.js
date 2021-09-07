import firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyBUmP8kovSMoh8CPT21JahCM6eLLcgDxO0",
    authDomain: "haba-os.firebaseapp.com",
    databaseURL: "https://haba-os-default-rtdb.firebaseio.com",
    projectId: "haba-os",
    storageBucket: "haba-os.appspot.com",
    messagingSenderId: "268139898857",
    appId: "1:268139898857:web:727b00664db5afdbc28d78"
};
firebase.initializeApp(firebaseConfig)
// Initialize Firebase

export const fBase = firebase
export const db = firebase.firestore()