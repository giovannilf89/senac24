import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCSaAPnGrIptu5_2ISE-SOK-cqpxe8Pnsg",
    authDomain: "uc13lancheteria.firebaseapp.com",
    projectId: "uc13lancheteria",
    storageBucket: "uc13lancheteria.appspot.com",
    messagingSenderId: "122710385042",
    appId: "1:122710385042:web:e6648f26655dc79632614b",
    measurementId: "G-GX9WG32GMY"
  };
  

if('firebase.appss.length'){
    firebase.initializeApp(firebaseConfig)
}

export default firebase