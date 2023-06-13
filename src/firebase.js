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
  apiKey: "AIzaSyDz_mzcPbbG84HBxCa7iTe6UcBcn2zqFKw",
  authDomain: "firechat-6c168.firebaseapp.com",
  projectId: "firechat-6c168",
  storageBucket: "firechat-6c168.appspot.com",
  messagingSenderId: "673694045971",
  appId: "1:673694045971:web:1a530bde083b155436ece6",
  measurementId: "G-N2S7VYZLS9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
