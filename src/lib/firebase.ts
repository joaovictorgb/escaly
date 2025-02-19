'use client'

import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC4SsZWJmOpl5PLUrM45OwrcQ2M94Fkm7E",
  authDomain: "escallyapp.firebaseapp.com",
  projectId: "escallyapp",
  storageBucket: "escallyapp.firebasestorage.app",
  messagingSenderId: "766859444177",
  appId: "1:766859444177:web:d93ebc28aa4221ce842af0",
  measurementId: "G-YLD9450KX4"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

// Configuração do Google Provider
const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')

export { auth, db, googleProvider } 