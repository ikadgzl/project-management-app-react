import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCd5vECz9iFrnfjsTGJhCUW_Xv2WuOVIbM',
  authDomain: 'project-management-3d5d2.firebaseapp.com',
  projectId: 'project-management-3d5d2',
  storageBucket: 'project-management-3d5d2.appspot.com',
  messagingSenderId: '412010659365',
  appId: '1:412010659365:web:3f7d2b49488172f9b289cc'
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timeStamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timeStamp };
