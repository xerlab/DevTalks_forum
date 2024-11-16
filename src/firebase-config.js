// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTqBstPCjkk9WyPceDXu2JH5HDbC8eYCE",
  authDomain: "forum-ef2eb.firebaseapp.com",
  projectId: "forum-ef2eb",
  storageBucket: "forum-ef2eb.firebasestorage.app",
  messagingSenderId: "577119767421",
  appId: "1:577119767421:web:201000fca39587d5cf5a14",
  measurementId: "G-L3FXFZ6NEP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
