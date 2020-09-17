import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyCCXL0nbo6N26vuKWr_CDF6mKweRmhBEE0',
    authDomain: 'planit-1c161.firebaseapp.com',
    databaseURL: 'https://planit-1c161.firebaseio.com',
    projectId: 'planit-1c161',
    storageBucket: 'planit-1c161.appspot.com',
    messagingSenderId: '296745197735',
    appId: '1:296745197735:web:2b122f1e5bd8bb734a7b82',
    measurementId: 'G-TDX1EDKP15'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
