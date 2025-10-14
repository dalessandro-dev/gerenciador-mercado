import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, getDocs, updateDoc, deleteDoc, collection, connectFirestoreEmulator, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getFunctions, connectFunctionsEmulator } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const firebaseConfig = {
  apiKey: "COLOQUE_SUA_API_KEY",
  authDomain: "COLOQUE_SEU_PROJECT_ID.firebaseapp.com",
  projectId: "COLOQUE_SEU_PROJECT_ID",
  storageBucket: "COLOQUE_SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "COLOQUE_SEU_MESSAGING_SENDER_ID",
  appId: "COLOQUE_SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app)

connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(db, "127.0.0.1", 8080);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
export { db, doc, setDoc, addDoc, updateDoc, getDocs, deleteDoc, collection, serverTimestamp }