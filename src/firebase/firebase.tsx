import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCMJbo1YBZistnfPdjMO7r0R7vRi2jPu-M',
  authDomain: 'hijrhomecareuh.firebaseapp.com',
  databaseURL: 'https://hijrhomecareuh.firebaseio.com',
  projectId: 'hijrhomecareuh',
  storageBucket: 'hijrhomecareuh.appspot.com',
  messagingSenderId: '328157133517',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
