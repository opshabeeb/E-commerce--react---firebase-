// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWvPNVNNqp5zeiJyXIpTXDqFxurQSx6aE",
  authDomain: "e-commerce-7dfc7.firebaseapp.com",
  projectId: "e-commerce-7dfc7",
  storageBucket: "e-commerce-7dfc7.appspot.com",
  messagingSenderId: "737023511724",
  appId: "1:737023511724:web:4cd5028d523b28ff21a309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }