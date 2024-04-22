// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApBO61JdvWw2ou2OPd2hWycOqMnruwYaw",
    authDomain: "weather-71b7a.firebaseapp.com",
    projectId: "weather-71b7a",
    storageBucket: "weather-71b7a.appspot.com",
    messagingSenderId: "258041385655",
    appId: "1:258041385655:web:8e78b5890f59114a2bb332"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
