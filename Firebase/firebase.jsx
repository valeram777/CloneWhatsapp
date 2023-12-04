//import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getStorage } from "firebase/storage";
import { getStorage,   } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMuzC8CS0JPrgI8yx9Yh6QhUQoAOBUSLI",
  authDomain: "clonewhatsapp-88218.firebaseapp.com",
  projectId: "clonewhatsapp-88218",
  storageBucket: "clonewhatsapp-88218.appspot.com",
  messagingSenderId: "65056409746",
  appId: "1:65056409746:web:ae43e34818db68d9217e4b"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

export const db = app.firestore();
export const auth = firebase.auth();
//export const storage = getStorage(app);
export const storage = getStorage(app, "gs://clonewhatsapp-88218.appspot.com");
//export const imagesRef = ref(storage, '/images');
//const sg = getStorage();
//const storage =  getStorage(db)//gs://clonewhatsapp-88218.appspot.com
//export { db, auth,storage};
