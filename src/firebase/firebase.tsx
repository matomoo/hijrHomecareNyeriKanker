import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCouX3FhvySSAFoB6RaS5xGk1GhHlXcmk4',
    authDomain: 'hijrhomecare.firebaseapp.com',
    databaseURL: 'https://hijrhomecare.firebaseio.com',
    projectId: 'hijrhomecare',
    storageBucket: 'hijrhomecare.appspot.com',
    messagingSenderId: '403755576599',

};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const authEmailProvider = firebase.auth.EmailAuthProvider;

export {
  db,
  auth,
  storage,
  authEmailProvider,
};
