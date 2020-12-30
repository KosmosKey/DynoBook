import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAzQE6TW3gMgQkh5GVe-lZpu6fiVJinNJI",
  authDomain: "dynobook-d7510.firebaseapp.com",
  projectId: "dynobook-d7510",
  storageBucket: "dynobook-d7510.appspot.com",
  messagingSenderId: "1069107457432",
  appId: "1:1069107457432:web:a860f8ef18693fde4d4fed",
  measurementId: "G-GDLW9QJK4C",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();

export const storage = firebase.storage();

export const database = firebase.database();

export default db;
