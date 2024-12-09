

// firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup,sendEmailVerification } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDyeASJARAgE5QW8kpoils8rZdMnEUkmOM",
  authDomain: "to-do-list-b06ef.firebaseapp.com",
  projectId: "to-do-list-b06ef",
  storageBucket: "to-do-list-b06ef.firebasestorage.app",
  messagingSenderId: "716358644349",
  appId: "1:716358644349:web:37a58f35d554587669f714",
  measurementId: "G-7D08JCC494", // Optional if not using analytics
  databaseURL:"https://to-do-list-b06ef-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth,provider, signInWithPopup, sendEmailVerification,storage, database };
