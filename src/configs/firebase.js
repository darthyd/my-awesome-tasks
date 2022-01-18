import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBkWQ4j2l7MbyKyDWsYV7mkFaiyl6kukJE',
//   authDomain: 'my-awesome-tasks-9dfa0.firebaseapp.com',
//   databaseURL: 'https://my-awesome-tasks-9dfa0-default-rtdb.firebaseio.com',
//   projectId: 'my-awesome-tasks-9dfa0',
//   storageBucket: 'my-awesome-tasks-9dfa0.appspot.com',
//   messagingSenderId: '306480389595',
//   appId: '1:306480389595:web:cbc32efbe6acd93a7edbfe',
// };

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = firebase.firestore();
