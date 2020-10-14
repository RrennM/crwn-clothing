import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBG1yIjWd0RFH4v4UiOtFbXJIbgUrJqp4M",
  authDomain: "crwn-db-92e67.firebaseapp.com",
  databaseURL: "https://crwn-db-92e67.firebaseio.com",
  projectId: "crwn-db-92e67",
  storageBucket: "crwn-db-92e67.appspot.com",
  messagingSenderId: "9717324490",
  appId: "1:9717324490:web:d3ef81a234208b328b7233",
  measurementId: "G-LF602PSCJ0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;