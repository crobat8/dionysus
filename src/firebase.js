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
  apiKey: "AIzaSyBqW8VtrLhh_FJjKeo1ucwIT-Klc-fwvWI",
  authDomain: "partyup-76d1a.firebaseapp.com",
  databaseURL: "https://partyup-76d1a-default-rtdb.firebaseio.com",
  projectId: "partyup-76d1a",
  storageBucket: "partyup-76d1a.appspot.com",
  messagingSenderId: "980119841517",
  appId: "1:980119841517:web:b578a91a0dae6f1953bae4",
  measurementId: "G-GS1PZT591L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
