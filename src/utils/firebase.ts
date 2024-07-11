// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB8Uau6HNHakZjVeWa7hapZkJYW7pS64s",
  authDomain: "nextjs-test-5cc2c.firebaseapp.com",
  projectId: "nextjs-test-5cc2c",
  storageBucket: "nextjs-test-5cc2c.appspot.com",
  messagingSenderId: "121465487272",
  appId: "1:121465487272:web:aab8fc62973d968388a79d",
  measurementId: "G-DPBNBSYV69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);