// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const fbStorage = getStorage(app);

function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const uploadToFirebase = async (uri) => {
  console.log("Inside firebase function");
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  const name = theBlob.data.name;
  const imageRef = ref(getStorage(app), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progress: ", progress.toFixed(2));
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        theBlob.close();
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      },
    );
  });
};

const db = getFirestore(app);
export { fbStorage, db, uploadToFirebase };
