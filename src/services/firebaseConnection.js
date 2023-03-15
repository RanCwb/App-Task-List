

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAaw6SgA4_Y8zp9_7-LcY0NuJQCPqztxBc",
  authDomain: "apptask-241ac.firebaseapp.com",
  projectId: "apptask-241ac",
  storageBucket: "apptask-241ac.appspot.com",
  messagingSenderId: "193184276001",
  appId: "1:193184276001:web:2634ba412b2f54a9040d60"
};


firebase.initializeApp(firebaseConfig);

export default firebase;