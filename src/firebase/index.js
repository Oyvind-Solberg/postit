import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCBi6Drpb30GAVxeaUUPqoUvFewdaE6DsA',
	authDomain: 'postit-2fb46.firebaseapp.com',
	databaseURL: 'https://postit-2fb46.firebaseio.com',
	projectId: 'postit-2fb46',
	storageBucket: 'postit-2fb46.appspot.com',
	messagingSenderId: '606327351737',
	appId: '1:606327351737:web:6d38292bc3899b4dda6e68',
	measurementId: 'G-T4T2P0V6PC',
};

const firebaseApp = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export async function createUser(email, password) {
	await auth.createUserWithEmailAndPassword(email, password);
}

export async function signInUser(email, password) {
	await auth.signInWithEmailAndPassword(email, password);
}

export function checkAuth(callback) {
	return auth.onAuthStateChanged(callback);
}

export async function signOut() {
	await auth.signOut();
}
