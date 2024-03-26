import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDYkra2VtD1xNQAjXknyajb5XSOlOef9Ko",
  authDomain: "lancheterianovo.firebaseapp.com",
  projectId: "lancheterianovo",
  storageBucket: "lancheterianovo.appspot.com",
  messagingSenderId: "292056728413",
  appId: "1:292056728413:web:f19feaea2003e938115eb4",
  measurementId: "G-YLN6NHTPL4"
};

  

if('firebase.appss.length'){
    firebase.initializeApp(firebaseConfig)
}

export default firebase