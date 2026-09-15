import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAocca0veszQBvuiKFcx40QCIBhz2gp38A',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'web-a-thon-7c2de.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'web-a-thon-7c2de',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'web-a-thon-7c2de.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1056203299915',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1056203299915:web:31170633eec586771b01ce',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-T0DFY29364',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

let analytics = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
  } catch {
    // Graceful fallback if analytics is blocked by adblockers
  }
}
export { analytics };
