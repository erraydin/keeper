import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import database from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDi0uayCnnkGfMi8c0bbuR4aBodusy_IeI",
  authDomain: "keeper-2de7a.firebaseapp.com",
  databaseURL: "https://keeper-2de7a-default-rtdb.firebaseio.com",
  projectId: "keeper-2de7a",
  storageBucket: "keeper-2de7a.appspot.com",
  messagingSenderId: "285902265326",
  appId: "1:285902265326:web:18a53bf30d8be418eb4cff",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// database.ref().set({
//   name: "kelay",
// });

export { firebase, googleAuthProvider, database };
