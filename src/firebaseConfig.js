import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCWNhaPLc36ULhPCGfQ_ru8jjzbFDJC5zE",
    authDomain: "typing-speed-test-1a67a.firebaseapp.com",
    projectId: "typing-speed-test-1a67a",
    storageBucket: "typing-speed-test-1a67a.appspot.com",
    messagingSenderId: "562437641190",
    appId: "1:562437641190:web:1ca265911cbc4e72b63c27",
    measurementId: "G-5367SEPB4W"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db}