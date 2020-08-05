import firebase from "firebase";

const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyCvuOukietMGG9ZUoGmPtaXoECVk1wg5-U",
    authDomain: "instagram-clone-8b271.firebaseapp.com",
    databaseURL: "https://instagram-clone-8b271.firebaseio.com",
    projectId: "instagram-clone-8b271",
    storageBucket: "instagram-clone-8b271.appspot.com",
    messagingSenderId: "345405361469",
    appId: "1:345405361469:web:21c5a50708d3d0d1d20954",
    measurementId: "G-NP12B8SR96"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}
  //export default db;