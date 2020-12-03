import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAxU4lJOly42R7aFzGBmC9oenWTy27YvxE",
  authDomain: "dynobook-11d8e.firebaseapp.com",
  databaseURL: "https://dynobook-11d8e.firebaseio.com",
  projectId: "dynobook-11d8e",
  storageBucket: "dynobook-11d8e.appspot.com",
  messagingSenderId: "456753298435",
  appId: "1:456753298435:web:1443494a475b37b00da236",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();

export const storage = firebase.storage();

export default db;
