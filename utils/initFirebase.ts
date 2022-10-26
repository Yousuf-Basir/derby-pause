// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPRJtIt5aPXqg6QnnYxTQ5WgX4HEDX4C0",
  authDomain: "tempproject-38790.firebaseapp.com",
  projectId: "tempproject-38790",
  storageBucket: "tempproject-38790.appspot.com",
  messagingSenderId: "772588133273",
  appId: "1:772588133273:web:8f63afe572b8873a96d108",
  measurementId: "G-7TC6R82JJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);