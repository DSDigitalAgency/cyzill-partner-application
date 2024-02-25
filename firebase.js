import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBTxiLRQIuRSVoP9ysah-Cb4Go2v5U0vfI',
  authDomain: 'gauth-estate.firebaseapp.com',
  projectId: 'gauth-estate',
  storageBucket: 'gauth-estate.appspot.com',
  messagingSenderId: '440523352223',
  appId: '1:440523352223:web:648610b03ed758aaf39aaa',
  measurementId: 'G-7S3R3GV0QE',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();  // No argument here

export { app, analytics, storage };
