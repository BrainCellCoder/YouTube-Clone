import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBw9WzjnmrQi9YdfDEko5NKXMM8qeoRt8w",
  authDomain: "clone-99066.firebaseapp.com",
  projectId: "clone-99066",
  storageBucket: "clone-99066.appspot.com",
  messagingSenderId: "540266168662",
  appId: "1:540266168662:web:4ac5ac1c0b5e61f6fd16f7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
