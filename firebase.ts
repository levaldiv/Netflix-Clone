// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'netflix-clone-78e3f.firebaseapp.com',
  projectId: 'netflix-clone-78e3f',
  storageBucket: 'netflix-clone-78e3f.appspot.com',
  messagingSenderId: '455937653621',
  appId: '1:455937653621:web:25df859295482a8445b13c',
}

// Initialize Firebase
/* Checking if app is initialized or not
 * If it not, then initialize it
 * If it is, then get the app
 */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { db, auth }
