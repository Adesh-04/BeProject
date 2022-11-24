// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBN6rTRj-V7-nOMGOp97ZurlWJbsxp5FMk",
  authDomain: "healthmonitorapp-78c16.firebaseapp.com",
  projectId: "healthmonitorapp-78c16",
  storageBucket: "healthmonitorapp-78c16.appspot.com",
  messagingSenderId: "733757429666",
  appId: "1:733757429666:web:266403c3441358eaffc4fb"
};
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);


// const collRef = collection(db, 'patient_data');

// const loginRef = collection(db, 'login');




// getDocs(loginRef).then((snapshot) =>{
//     var login = []
//     snapshot.docs.forEach((doc) => {
//         login.push({ ...doc.data(), id: doc.id})
//     })
//     // console.log(login)
// }).catch(err => {
//     console.log(err.message);
// })

// const data2 = getDocs(collRef).then((snapshot) => {
//     var patient = []
//     snapshot.docs.forEach((doc) => {
//         patient.push({ ...doc.data(), id: doc.id })
//     })
//     // console.log(patient)
// }).catch(err => {
//     console.log(err.message);
// })






