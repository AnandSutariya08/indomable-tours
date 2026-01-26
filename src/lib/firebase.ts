import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDIYMfn51U_e2uU6sbVfjRc44qb66KKY98",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN||"supergames-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID||"supergames-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET||"supergames-ai.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID||"254966835658",
  appId: import.meta.env.VITE_FIREBASE_APP_ID||"1:254966835658:web:095c44a0c6c83bb2198733",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
