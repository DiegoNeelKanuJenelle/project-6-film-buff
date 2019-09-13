// firebase.js
import firebase from "firebase";

// Initialize Firebase
// USE YOUR CONFIG OBJECT
const config = {
  apiKey: "AIzaSyDwcCYbdPTcofVRgfAGFtnlEAjWfKEe_tc",
  authDomain: "filmbuff-a0153.firebaseapp.com",
  databaseURL: "https://filmbuff-a0153.firebaseio.com",
  projectId: "filmbuff-a0153",
  storageBucket: "",
  messagingSenderId: "366791095506",
  appId: "1:366791095506:web:f19b0b63ea70ed0f0b290b"
};
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
