import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCu4IUuOI0w7Aa_1a2pkkxbQU7xHpCobxU",
  authDomain: "todo-app-30c18.firebaseapp.com",
  projectId: "todo-app-30c18",
  storageBucket: "todo-app-30c18.appspot.com",
  messagingSenderId: "1009445801610",
  appId: "1:1009445801610:web:0c06bc13127296687e6773",
});

const db = firebase.firestore();

export default db ;
