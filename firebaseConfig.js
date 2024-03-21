// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGFPzKkIrNXLaP-Cw4vP7L6oKjFHQzTsY",
  authDomain: "healin-45885.firebaseapp.com",
  projectId: "healin-45885",
  storageBucket: "healin-45885.appspot.com",
  messagingSenderId: "157661679962",
  appId: "1:157661679962:web:ae3a392c182abb6bffa363",
  measurementId: "G-2V2FXPF80M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
