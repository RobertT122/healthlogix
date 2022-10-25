import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, startAfter, setDoc, doc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { properToCamel } from "./helper";

const firebaseConfig = {
  apiKey: "AIzaSyC41lttZDvC7pntMybDhTYdEqx_s3bnEOw",
  authDomain: "healthlogix-dev.firebaseapp.com",
  projectId: "healthlogix-dev",
  storageBucket: "healthlogix-dev.appspot.com",
  messagingSenderId: "556595806419",
  appId: "1:556595806419:web:5e160b2e65d807e0471426",
  measurementId: "G-Z5QD00L4F8"
};

let app: FirebaseApp;

if (!firebase.apps.length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

const storage = getStorage(app);
const postsRef = collection(db, 'posts');
const jobsRef = collection(db, "jobs");
const resumesRef = collection(db, "resumes");
const adminsRef = collection(db, "admins")

const formatDate = post => Object.assign(post, {createdAt: post.createdAt.toDate()})

export const getPosts = async function(count, lastVisibleDate=new Date()){
  try{
    let posts = await getDocs(query(postsRef, orderBy('createdAt', "desc"), limit(count), startAfter(lastVisibleDate)))
    console.log("got 'em")
    return posts.docs.map(doc => formatDate(doc.data()))
  } catch(err) {
    console.log(err)
  }
}

export const uploadPost = async function(postInput){
  try{
    let {title, body} = postInput
    let imageURL = "images/default-post-image.jpg"
    if(postInput.image){
      const imagesRef = ref(storage, `images/${postInput.image.name}`)
      let snapshot = await uploadBytes(imagesRef, postInput.image)
      console.log('get snapshot')
      imageURL = await getDownloadURL(snapshot.ref)
    }
    console.log('get url')
    let postData = {title, body, imageURL, createdAt: new Date()};
    await addDoc(postsRef, postData)
    console.log("success! post uploaded")
  } catch(err) {
    console.log('Post upload failed' + err)
  }
}

export const getJobs = async function(){
  try{
    let jobs = await getDocs(jobsRef);
    return jobs.docs.map(doc => doc.data())
  } catch (err) {
    console.log(err)
  }
}


export const uploadJob = async function(job){
  let slug = properToCamel(job.title)
  try{
    await setDoc(doc(db, "jobs", slug), job)
    console.log("success!")
  } catch( err ) {
    console.log(err);
  }
}


export const getResumes = async function(){
  try{
    let resumes = await getDocs(resumesRef);
    return resumes.docs.map(doc => doc.data())
  } catch(err) {
    console.log(err)
  }
}

