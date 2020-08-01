import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)

firebase.initializeApp(config);
export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();