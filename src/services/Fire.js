import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCFRRmN1iCsnmxBnthVgXVAtPJkqVpmjAI",
  authDomain: "react-website-music.firebaseapp.com",
  databaseURL: "https://react-website-music.firebaseio.com",
  projectId: "react-website-music",
  storageBucket: "react-website-music.appspot.com",
  messagingSenderId: "197680336998",
  appId: "1:197680336998:web:ff9f8351388ac4bcfb1da7",
  measurementId: "G-N72TTXD8QD",
};
const fire = firebase.initializeApp(config);
export default fire;
