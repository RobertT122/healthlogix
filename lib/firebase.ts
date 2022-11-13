import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
  limit,
  where,
  startAfter,
} from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { properToCamel } from "./helper";

const firebaseConfig = {
  apiKey: "AIzaSyB6QmZBtRHZDR_0rk9KHYRjjLiE5cKJfzU",
  authDomain: "health-logix-website.firebaseapp.com",
  projectId: "health-logix-website",
  storageBucket: "health-logix-website.appspot.com",
  messagingSenderId: "208854210118",
  appId: "1:208854210118:web:5d71ade19d142dd9f61c47",
  measurementId: "G-7JX945JRTZ"
};

let app: FirebaseApp;

if (!firebase.apps.length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);


const storage = getStorage(app);
const postsRef = collection(db, "posts");
const jobsRef = collection(db, "jobs");
const resumesRef = collection(db, "resumes");
const adminsRef = collection(db, "admins");

const formatDate = (post) =>
  Object.assign(post, { createdAt: post.createdAt.toDate() });

export const getPosts = async function (count, lastVisibleDate = new Date()) {
  try {
    let lastPage = true;
    let postsResults = await getDocs(
      query(
        postsRef,
        orderBy("createdAt", "desc"),
        limit(count+1),
        startAfter(lastVisibleDate)
      )
    );
    console.log("got 'em");
    if(postsResults.docs[count]){lastPage = false};
    let posts = postsResults.docs.slice(0, count).map((doc) => formatDate(doc.data()));
    return {posts, lastPage}
  } catch (err) {
    console.log(err);
  }
};

export const uploadPost = async function (postInput) {
  try {
    let { title, body } = postInput;
    let imageURL = "images/default-post-image.jpg";
    if (postInput.image) {
      const imagesRef = ref(storage, `images/${postInput.image.name}`);
      let snapshot = await uploadBytes(imagesRef, postInput.image);
      console.log("get snapshot");
      imageURL = await getDownloadURL(snapshot.ref);
    }
    console.log("get url");
    let postData = { title, body, imageURL, createdAt: new Date() };
    await addDoc(postsRef, postData);
    console.log("success! post uploaded");
  } catch (err) {
    console.log("Post upload failed" + err);
  }
};

// export const getJobs = async function () {
//   try {
//     let jobs = await getDocs(jobsRef);
//     return jobs.docs.map((doc) => doc.data());
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const uploadJob = async function (job) {
//   let slug = properToCamel(job.title);
//   try {
//     await setDoc(doc(db, "jobs", slug), job);
//     console.log("success!");
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getApplications = async function(jid) {
  try {
    let q = query(resumesRef, where('jid', '==', jid))
    let resumes = await getDocs(q);
    return resumes.docs.map((doc) => doc.data());
  } catch (err) {
    console.log(err);
  }
};

export const uploadApplication = async function (application) {
  try {
    await addDoc(resumesRef, application)
    console.log("success!")
  } catch(err) {
    console.log(err)
  }
}

export const getIsAdmin = async function (uid) {
  try {
    let q = query(adminsRef, where("uid", "==", uid));
    let admin = await getDocs(q);
    if (admin) {
      return admin.docs[0].data().isAdmin;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
