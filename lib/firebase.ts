import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC41lttZDvC7pntMybDhTYdEqx_s3bnEOw",
  authDomain: "healthlogix-dev.firebaseapp.com",
  projectId: "healthlogix-dev",
  storageBucket: "healthlogix-dev.appspot.com",
  messagingSenderId: "556595806419",
  appId: "1:556595806419:web:5e160b2e65d807e0471426",
  measurementId: "G-Z5QD00L4F8"
};

let app: firebase.app.App;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export const auth = getAuth(app);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
