import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAocca0veszQBvuiKFcx40QCIBhz2gp38A",
  authDomain: "web-a-thon-7c2de.firebaseapp.com",
  projectId: "web-a-thon-7c2de",
  storageBucket: "web-a-thon-7c2de.firebasestorage.app",
  messagingSenderId: "1056203299915",
  appId: "1:1056203299915:web:31170633eec586771b01ce",
  measurementId: "G-T0DFY29364",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
