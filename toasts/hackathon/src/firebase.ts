const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

console.log(process.env.REACT_APP_PROJECT_ID);

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_DATABASE_NAME}.firebaseio.com`,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_BUCKET}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_SENDER_ID
};

firebase.initializeApp(config);

const db = firebase.firestore();
export default db;
