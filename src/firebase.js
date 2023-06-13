// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ugkgC_K2u6OwYfsMzHwMX_uLbWZPlyo",
  authDomain: "mjolnirathletics-e59de.firebaseapp.com",
  databaseURL: "https://mjolnirathletics-e59de-default-rtdb.firebaseio.com",
  projectId: "mjolnirathletics-e59de",
  storageBucket: "mjolnirathletics-e59de.appspot.com",
  messagingSenderId: "106135014466",
  appId: "1:106135014466:web:dbffc964b8fa4ab360f1db",
  measurementId: "G-RMZ1F55NM2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
