import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
})

const firestore = app.firestore();
export const database = {
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    formatDoc: doc => {
        return{
            id: doc.id,
            ...doc.data()
        }
    },
    getCurrentsTimestamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = app.storage()
export const auth = firebase.auth();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();

export default app;