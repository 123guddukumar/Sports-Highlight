import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAy2cgq56UEnNH3dDQiCjy0plbcI6tw2pk",
    authDomain: "ipl-video.firebaseapp.com",
    projectId: "ipl-video",
    storageBucket: "ipl-video.firebasestorage.app",
    messagingSenderId: "694254862774",
    appId: "1:694254862774:web:e90bbfd66809900926c117",
    measurementId: "G-SKX00MKCLM"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);