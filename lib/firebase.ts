import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, startAfter} from "firebase/firestore";
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

let app: FirebaseApp;

if (!firebase.apps.length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);

export const db = getFirestore(app);
const storage = getStorage(app);
const postsRef = collection(db, 'posts');


//works properly
export const getPosts = async function(count, lastVisible=Date()){
  try{
    let posts = await getDocs(query(postsRef, orderBy('createdAt', "desc"), limit(count), startAfter(lastVisible)))
    console.log("got 'em")
    return posts.docs.map(doc => doc.data())
  } catch(err) {
    console.log(err)
  }
}

export const uploadPost = async function(postInput){
  try{
    let {title, body} = postInput
    let downloadUrl = "default"
    if(postInput.image){
      const imagesRef = ref(storage, `images/${postInput.image.name}`)
      let snapshot = await uploadBytes(imagesRef, postInput.image)
      console.log('get snapshot')
      downloadUrl = await getDownloadURL(snapshot.ref)
    }
    console.log('get url')
    let postData = {title, body, downloadUrl, createdAt: Date()};
    await addDoc(postsRef, postData)
    console.log("success! post uploaded")
  } catch(err) {
    console.log('Post upload failed' + err)
  }
}

export const getJobs = function() {

}

export const createJob = function() {

}

export const createResume = function() {

}
