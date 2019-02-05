import firebase from 'firebase/app';
import login from 'actions/login';
import live from 'actions/live';
require("firebase/auth");
require("firebase/firestore");

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_DATABASE_NAME}.firebaseio.com`,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_BUCKET}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_SENDER_ID
};

firebase.initializeApp(config);

export default firebase;

export const googleSignin = (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    dispatch(login.gSigninSuccess(result));
  }).catch((error) => {
    dispatch(login.gSigninFailure(error));
  });
};

const db = firebase.firestore();

export const createOrUpdate = async (collection, id, attributes) => (
  db.collection(collection).doc(id).set(attributes)
);

export const findById = async (collection, id) => (
  db.collection(collection).doc(id).get()
);

export const liveIndex = async (dispatch, collection) => (
  db.collection(collection).onSnapshot((doc) => {
    dispatch(live.snapshot(doc));
  })
);